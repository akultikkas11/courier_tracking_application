# schemas/tracking.py
from pydantic import BaseModel


class TrackingHistoryResponse(BaseModel):
    status: str
    location: str
    remarks: str | None


class TrackingResponse(BaseModel):
    tracking_id: str
    receiver_name: str
    receiver_phone: str
    source_city: str
    destination_city: str
    weight_kg: float
    current_status: str

    history: list[TrackingHistoryResponse]

# FastAPI will validate that the response matches this strucuture