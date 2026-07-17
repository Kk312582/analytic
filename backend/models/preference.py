from sqlalchemy import Column, Integer, String, Boolean, JSON, ForeignKey
from sqlalchemy.orm import relationship
from core.database import Base

class Preference(Base):
    __tablename__ = "preferences"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    # Store dynamic preferences as a JSON object (e.g. favorite_color, dark_mode, preferred_export)
    settings = Column(JSON, default={})
    
    user = relationship("User")
