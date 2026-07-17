from sqlalchemy import Column, Integer, String, JSON, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from core.database import Base

class Dataset(Base):
    __tablename__ = "datasets"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True) # None if guest
    guest_id = Column(String, ForeignKey("guest_sessions.id"), nullable=True)
    
    filename = Column(String)
    file_path = Column(String)
    schema_info = Column(JSON, default={}) # Automatically detected columns, types
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(Integer, primary_key=True, index=True)
    dataset_id = Column(Integer, ForeignKey("datasets.id"))
    
    ui_schema = Column(JSON) # AI generated dashboard layout
    forecast_results = Column(JSON)
    insights = Column(JSON) # AI generated insights and coach recommendations
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
