from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.database.base import Base

class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=False)
    phone = Column(String(15), nullable=False)
    email = Column(String(100), nullable=False, unique=True)
    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )