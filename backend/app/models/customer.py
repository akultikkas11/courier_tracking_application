from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import relationship
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
        default=datetime.utcnow,        # This is for SQLAlchemy ORM inserts
        server_default = func.now()     # This is for database-level inserts (during testing)
    )

    # One customer can have many packages
    packages = relationship(
        "Package",
        back_populates="customer",
        cascade="all, delete-orphan"
    )