from datetime import date

from fastapi import Depends,HTTPException, Query,status,APIRouter
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models,oauth,schemas
from typing import List, Optional

router=APIRouter(
    tags=["Journal"],
    prefix="/journal"
)

@router.get("/{id}",response_model=schemas.GetJournal)
def get_journal(db:Session=Depends(get_db),current_user:models.Users=Depends(oauth.get_current_user)):
    # is the id present
    existing = db.query(models.JournalEntries).filter(models.JournalEntries.id == id).first()
    if not existing:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Not found")
    return existing

@router.patch("/{id}",response_model=schemas.PatchJournal)
def patch_journal(
    id:int,
    update:schemas.PostJournal,
    db: Session = Depends(get_db),
    current_user:models.Users=Depends(oauth.get_current_user)
):
    existing = db.query(models.JournalEntries).filter(models.JournalEntries.id == id).first()
    if not existing:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Not found")
    for field, value in update.model_dump(exclude_unset=True).items():
        setattr(existing, field, value)
    db.commit()
    db.refresh(existing)
    return existing

@router.delete("/{id}",status_code=status.HTTP_204_NO_CONTENT)
def delete_journal(
    id:int,
    db: Session = Depends(get_db),
    current_user: models.Users = Depends(oauth.get_current_user)
):
    existing = db.query(models.JournalEntries).filter(models.JournalEntries.id == id).first()
    if not existing:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Not found")
    db.delete(existing)
    db.commit()


@router.post("/",response_model=schemas.CreateJournal)
def post_journal(
    journal:schemas.PostJournal,
    db: Session = Depends(get_db),
    current_user: models.Users = Depends(oauth.get_current_user)
):
    new_journal=models.JournalEntries(**journal.model_dump(),user_id=current_user.id)
    db.add(new_journal)
    db.commit()
    db.refresh(new_journal)
    return new_journal
    
@router.get("",response_model=List[schemas.GetJournal])
def list_journal(
    date_from: Optional[date] = None,
    date_to: Optional[date] = None,
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
    current_user: models.Users = Depends(oauth.get_current_user),
):
    query= db.query(models.JournalEntries).filter(
        models.JournalEntries.user_id == current_user.id
    )
    if date_from:
        query = query.filter(models.JournalEntries.entry_date >= date_from)
    if date_to:
        query = query.filter(models.JournalEntries.entry_date <= date_to)
 
    return (
        query.order_by(models.JournalEntries.entry_date.desc(), models.JournalEntries.id.desc())
        .limit(limit)
        .offset(offset)
        .all()
    )
