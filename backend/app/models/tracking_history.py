from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, func
from sqlalchemy.orm import relationship

from datetime import datetime

from app.database.base import Base


class TrackingHistory(Base):
    __tablename__ = "tracking_history"

    id = Column(Integer, primary_key=True)

    package_id = Column(
        Integer,
        ForeignKey("packages.id", ondelete="CASCADE")
    )

    status = Column(
        String(50),
        nullable=False
    )

    location = Column(
        String(100),
        nullable=False
    )

    remarks = Column(Text)

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        server_default=func.now()
    )

    package = relationship(
        "Package",
        back_populates="tracking_histories"
    )