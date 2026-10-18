"""Pydantic request and response models used by the API routes.

Keeping these separate from SQLAlchemy models makes the public API explicit:
clients can only send fields we accept, and responses expose only fields we
intend to return.
"""

from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator, model_validator

from .models import ReminderType


class ORMModel(BaseModel):
    """Allow response models to be built from SQLAlchemy ORM objects."""

    model_config = ConfigDict(from_attributes=True)


class TokenData(BaseModel):
    id: Optional[int] = None


class MessageResponse(BaseModel):
    message: str


class UserPost(BaseModel):
    username: str = Field(min_length=2, max_length=80)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class UserCreated(ORMModel):
    id: int
    username: str
    email: EmailStr
    created_at: Optional[datetime] = None


class UserMe(UserCreated):
    updated_at: Optional[datetime] = None


class PostProfile(BaseModel):
    age: int = Field(ge=0, le=130)
    country: str = Field(min_length=2, max_length=100)
    optional_risks: Optional[str] = Field(default=None, max_length=500)

    @field_validator("country")
    @classmethod
    def normalise_country(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("country cannot be blank")
        return value


class GetProfile(PostProfile, ORMModel):
    id: int
    user_id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


class CreateProfile(GetProfile):
    pass


class PutProfile(GetProfile):
    pass


class PostReminder(BaseModel):
    type: ReminderType
    next_due_date: date
    repeat_interval_days: Optional[int] = Field(default=None, ge=1, le=3650)


class UpdateReminder(BaseModel):
    type: Optional[ReminderType] = None
    next_due_date: Optional[date] = None
    repeat_interval_days: Optional[int] = Field(default=None, ge=1, le=3650)
    active: Optional[bool] = None

    @model_validator(mode="after")
    def requires_a_field_to_update(self):
        if not self.model_fields_set:
            raise ValueError("send at least one field to update")
        return self


class GetReminders(PostReminder, ORMModel):
    id: int
    user_id: int
    active: bool
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


class CreateReminder(GetReminders):
    pass


class PostJournal(BaseModel):
    entry_date: date
    notes: str = Field(min_length=1, max_length=10000)
    body_location: Optional[str] = Field(default=None, max_length=255)

    @field_validator("notes")
    @classmethod
    def notes_cannot_be_blank(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("notes cannot be blank")
        return value


class PatchJournal(BaseModel):
    entry_date: Optional[date] = None
    notes: Optional[str] = Field(default=None, min_length=1, max_length=10000)
    body_location: Optional[str] = Field(default=None, max_length=255)

    @field_validator("notes")
    @classmethod
    def patched_notes_cannot_be_blank(cls, value: Optional[str]) -> Optional[str]:
        if value is not None and not value.strip():
            raise ValueError("notes cannot be blank")
        return value

    @model_validator(mode="after")
    def requires_a_field_to_update(self):
        if not self.model_fields_set:
            raise ValueError("send at least one field to update")
        return self


class GetJournal(PostJournal, ORMModel):
    id: int
    user_id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


class CreateJournal(GetJournal):
    pass


class GetGuides(ORMModel):
    id: int
    country: str
    organization: str
    screening_type: ReminderType
    min_age: int
    max_age: Optional[int] = None
    interval_months: Optional[int] = None
    notes: Optional[str] = None
    source_url: str
    last_reviewed: date


class AppointmentPrep(ORMModel):
    profile: Optional[GetProfile] = None
    reminders: list[GetReminders]
    journal_entries: list[GetJournal]
