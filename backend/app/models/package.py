from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.base import Base

class Package(Base):
    __tablename__ = "packages"

    id = Column(Integer, primary_key=True, index=True)

    tracking_id = Column(
        String(20),
        unique=True,
        nullable=False
    )

    customer_id = Column(
        Integer,
        ForeignKey("customers.id", ondelete="CASCADE")
    )

    receiver_name = Column(
        String(100),
        nullable=False
    )

    receiver_phone = Column(
        String(15),
        nullable=False
    )

    source_city = Column(
        String(50),
        nullable=False
    )

    destination_city = Column(
        String(50),
        nullable=False
    )

    weight_kg = Column(Float)

    current_status = Column(
        String(50),
        default="Created"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        server_default=func.now()
    )

    customer = relationship(
        "Customer",
        back_populates="packages",
    )

    tracking_histories = relationship(
        "TrackingHistory",
        back_populates = "package",
        cascade="all, delete-orphan"
    )