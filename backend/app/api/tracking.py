from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.package import Package
from app.models.tracking_history import TrackingHistory
from app.schemas.tracking import TrackingResponse, TrackingHistoryResponse

from app.database.dependencies import get_db

# ------------------------------------------------------------------------------
# This defines a FastAPI endpoint that retrives package tracking information 
# from the database using SQLAlchemy
# -------------------------------------------------------------------------------

router = APIRouter(
    prefix='/track',
    tags=["Tracking"]
)

@router.get("/{tracking_id}", response_model=TrackingResponse)
def get_tracking_info(
    tracking_id: str,
    db: Session=Depends(get_db)
):
    
    # Step1: Query the package by tracking_id
    package = db.query(Package).filter(
        Package.tracking_id==tracking_id
    ).first()

    # Step2: If not found, return 404
    if not package:
        raise HTTPException(status_code=404, detail="Tracking ID not found")
    else:
        print(f"Tracking ID {tracking_id} found")

    # Step 3: Build the tracking history list from related TrackingHistory records
    history = [
        TrackingHistoryResponse(
            status=h.status,
            location=h.location,
            remarks=h.remarks
        )
        for h in package.tracking_histories
    ]

    # Step 4: return the full response matching the TrackingResponse schema
    return TrackingResponse(
        sender_name = package.customer.full_name,
        sender_phone_no = package.customer.phone,
        sender_email = package.customer.email,

        tracking_id = package.tracking_id,
        receiver_name = package.receiver_name,
        receiver_phone = package.receiver_phone,
        source_city = package.source_city,
        destination_city = package.destination_city,
        weight_kg = package.weight_kg,
        current_status = package.current_status,
        history = history
    )

    
