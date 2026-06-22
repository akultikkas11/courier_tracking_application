# schemas/tracking.py
from pydantic import BaseModel


class TrackingHistoryResponse(BaseModel):
    status: str
    location: str
    remarks: str | None


class TrackingResponse(BaseModel):
    sender_name: str
    sender_phone_no: str
    sender_email: str

    tracking_id: str
    receiver_name: str
    receiver_phone: str
    source_city: str
    destination_city: str
    weight_kg: float
    current_status: str

    history: list[TrackingHistoryResponse]

# FastAPI will validate that the response matches this strucuture