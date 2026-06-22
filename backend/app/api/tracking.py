from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.package import Package
from app.models.tracking_history import TrackingHistory

from app.database.dependencies import get_db

# ------------------------------------------------------------------------------
# This defines a FastAPI endpoint that retrives package tracking information 
# from the database using SQLAlchemy
# -------------------------------------------------------------------------------

router = APIRouter(
    prefix='/track',
    tags=["Tracking"]
)

@router.get("/{tracking_id}")
def get_tracking_info(
    tracking_id: str,
    db: Session=Depends(get_db)
):
    
    package = db.query(Package).filter(
        Package.tracking_id==tracking_id
    ).first()

    history = db.query(TrackingHistory).filter(
        TrackingHistory.package_id==package.id
    ).all()

    if package is None:
        raise HTTPException(
            status_code=404,
            detail="Package not found"
        )
    
    return {
        # "tracking_id": package.tracking_id,
        # "receiver_name": package.receiver_name,
        # "current_status": package.current_status
    
            "package_id": package.id,
            "history_count": len(history)
    }
