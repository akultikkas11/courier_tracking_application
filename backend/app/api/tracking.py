from fastapi import APIRouter

router = APIRouter(
    prefix='/track',
    tags=["Tracking"]
)

@router.get("/{tracking_id}")
def get_tracking_info(tracking_id: str):
    return {
        "tracking_id": tracking_id+"HELLO"
    }
