from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class GuestSession(Base):
    __tablename__ = "guest_sessions"
    
    id = Column(String, primary_key=True, index=True) # UUID
    sessions_used = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
