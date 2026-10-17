import enum as Enum
from sqlalchemy.orm import relationship
from .database import Base
from sqlalchemy import Column, Integer, String, Text, Boolean, Date, DateTime, ForeignKey, Enu
from sqlalchemy.sql import func
 
 
class ReminderType(str, enum.Enum):
    SELF_EXAM = "self_exam"
    MAMMOGRAM = "mammogram"

class Users(Base):
    __tablename__ = "users"
 
    id = Column(Integer, primary_key=True)
    username = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
 
    profiles = relationship(
        "Profiles", back_populates="user", uselist=False,
        cascade="all, delete-orphan", passive_deletes=True,
    )
    reminders = relationship(
        "Reminders", back_populates="user",
        cascade="all, delete-orphan", passive_deletes=True,
    )
    journal_entries = relationship(
        "JournalEntries", back_populates="user",
        cascade="all, delete-orphan", passive_deletes=True,
    )


     
class Profiles(Base):
    __tablename__ = "profiles"
 
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True, index=True)
    age = Column(Integer, nullable=False)
    country = Column(String, nullable=False)
    optional_risks = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
 
    user = relationship("Users", back_populates="profiles")


class Reminders(Base):
    __tablename__ = "reminders"
 
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    type = Column(Enum(ReminderType), nullable=False)
    next_due_date = Column(Date, nullable=False)
    repeat_interval_days = Column(Integer, nullable=True)  # None = one-time reminder
    active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
 
    user = relationship("Users", back_populates="reminders")


class JournalEntries(Base):
    __tablename__ = "journal_entries"
 
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    entry_date = Column(Date, nullable=False)
    notes = Column(Text, nullable=False)
    body_location = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
 
    user = relationship("Users", back_populates="journal_entries")
 
 
class GuidelineRules(Base):
    __tablename__ = "guideline_rules"
 
    id = Column(Integer, primary_key=True)
    country = Column(String, nullable=False, index=True)
    organization = Column(String, nullable=False)  # e.g. the guideline body
    screening_type = Column(Enum(ReminderType), nullable=False)
    min_age = Column(Integer, nullable=False)
    max_age = Column(Integer, nullable=True)
    interval_months = Column(Integer, nullable=True)
    notes = Column(Text, nullable=True)
    source_url = Column(String, nullable=False)
    last_reviewed = Column(Date, nullable=False)