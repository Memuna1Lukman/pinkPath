from datetime import date, timedelta
from typing import Optional

from fastapi import Depends, HTTPException, status, APIRouter, Query
from sqlalchemy.orm import Session

from ..database import get_db
from .. import models, oauth, schemas


router = APIRouter(
    tags=["Appointment"],
    prefix="/appointment-prep"
)


@router.get("", response_model=schemas.AppointmentPrep)
def get_appointment_prep(
    date_from: Optional[date] = None,
    date_to: Optional[date] = None,
    days: int = Query(30, ge=1, le=365),
    db: Session = Depends(get_db),
    current_user: models.Users = Depends(oauth.get_current_user),
):
    """Bundle everything the user may want to show a clinician:
    their profile basics, upcoming reminders, and journal entries in a date range."""
    today = date.today()

    # Defaults: the last 90 days of journal entries, ending today
    if date_to is None:
        date_to = today
    if date_from is None:
        date_from = date_to - timedelta(days=90)

    if date_from > date_to:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="date_from must be on or before date_to",
        )

    # The profile may not exist yet, so this is optional rather than a 404
    profile = (
        db.query(models.Profiles)
        .filter(models.Profiles.user_id == current_user.id)
        .first()
    )

    reminders = (
        db.query(models.Reminders)
        .filter(
            models.Reminders.user_id == current_user.id,
            models.Reminders.active.is_(True),
            models.Reminders.next_due_date <= today + timedelta(days=days),
        )
        .order_by(models.Reminders.next_due_date)
        .all()
    )

    # Oldest first, because a clinician reads a timeline from the start
    entries = (
        db.query(models.JournalEntries)
        .filter(
            models.JournalEntries.user_id == current_user.id,
            models.JournalEntries.entry_date >= date_from,
            models.JournalEntries.entry_date <= date_to,
        )
        .order_by(models.JournalEntries.entry_date, models.JournalEntries.id)
        .all()
    )

    return {
        "profile": profile,
        "reminders": reminders,
        "journal_entries": entries,
    }