from datetime import date, timedelta

from fastapi import Depends,HTTPException, Query,status,APIRouter
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models,oauth,schemas
from typing import List, Optional


router = APIRouter(
    tags=["Reminders"],
    prefix="/reminder"
)


def get_owned_reminder(reminder_id: int, db: Session, current_user: models.Users) -> models.Reminders:
    """Fetch a reminder only if it belongs to the logged-in user, otherwise 404."""
    reminder = db.query(models.Reminders).filter(
        models.Reminders.id == reminder_id,
        models.Reminders.user_id == current_user.id,
    ).first()
    if not reminder:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reminder not found",
        )
    return reminder

@router.post("",status_code=status.HTTP_201_CREATED,response_model=schemas.CreateReminder)
def create_reminder(remind:schemas.PostReminder,db:Session=Depends(get_db),current_user:models.Users=Depends(oauth.get_current_user)):
    new_reminder=models.Reminders(**remind.model_dump(),user_id=current_user.id)
    db.add(new_reminder)
    db.commit()
    db.refresh(new_reminder)
    return new_reminder

@router.get("",response_model=List[schemas.GetReminders])
def get_reminders(
    active:Optional[bool] = None,
    reminder_type: Optional[models.ReminderType] = Query(None, alias="type"),
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
    current_user: models.Users = Depends(oauth.get_current_user)
):
    query= db.query(models.Reminders).filter(models.Reminders.user_id == current_user.id)
    if active is not None:
        query = query.filter(models.Reminders.active == active)
    if reminder_type is not None:
        query = query.filter(models.Reminders.type == reminder_type)
    return query.order_by(models.Reminders.next_due_date).offset(offset).limit(limit).all()



@router.get("/{reminder_id}",response_model=schemas.GetReminders)
def get_reminder(
    reminder_id: int,
    db: Session = Depends(get_db),
    current_user: models.Users = Depends(oauth.get_current_user)
):
    return get_owned_reminder(reminder_id,db,current_user)

@router.delete("/{reminder_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_reminders(
    reminder_id: int,
    db: Session = Depends(get_db),
    current_user: models.Users = Depends(oauth.get_current_user)
):
    reminder = get_owned_reminder(reminder_id,db,current_user)
    db.delete(reminder)
    db.commit()


@router.post("/{reminder_id}/complete", response_model=schemas.GetReminders)
def complete_reminder(
    reminder_id: int,
    db: Session = Depends(get_db),
    current_user: models.Users = Depends(oauth.get_current_user),
):
    reminder = get_owned_reminder(reminder_id, db, current_user)
    if not reminder.active:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Reminder is already inactive",
        )
    if reminder.repeat_interval_days:
        reminder.next_due_date= date.today() + timedelta(days=reminder.repeat_interval_days)
    else:
        reminder.active = False
 
    db.commit()
    db.refresh(reminder)
    return reminder

@router.patch("/{reminder_id}", response_model=schemas.GetReminders)
def update_reminder(
    reminder_id: int,
    update: schemas.UpdateReminder,
    db: Session = Depends(get_db),
    current_user: models.Users = Depends(oauth.get_current_user),
):
    reminder = get_owned_reminder(reminder_id, db, current_user)
    for field, value in update.model_dump(exclude_unset=True).items():
        setattr(reminder, field, value)
 
    db.commit()
    db.refresh(reminder)
    return reminder        


@router.get("/upcoming", response_model=List[schemas.GetReminders])
def get_upcoming_reminders(
    days: int = Query(30, ge=1, le=365),
    db: Session = Depends(get_db),
    current_user: models.Users = Depends(oauth.get_current_user),
):
    # Includes overdue reminders too, since they are still "due".
    cutoff = date.today() + timedelta(days=days)
    return (
        db.query(models.Reminders)
        .filter(
            models.Reminders.user_id == current_user.id,
            models.Reminders.active.is_(True),
            models.Reminders.next_due_date <= cutoff,
        )
        .order_by(models.Reminders.next_due_date)
        .all()
    )