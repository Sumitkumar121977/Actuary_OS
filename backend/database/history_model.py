from sqlalchemy import Column, Integer, String
from database.database import Base

class Activity(Base):

    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String)

    activity_type = Column(String)

    description = Column(String)

    timestamp = Column(String)