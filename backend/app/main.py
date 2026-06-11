from fastapi import FastAPI

from app.database.database import engine
from app.database.base import Base

from app.models.customer import Customer
from app.models.package import Package
from app.models.tracking_history import TrackingHistory
from contextlib import asynccontextmanager
from app.api.tracking import router as tracking_router

try:
    @asynccontextmanager
    async def lifespan(app: FastAPI):
        # Startup phase
        try:
            Base.metadata.create_all(bind=engine)
        except Exception as e:
            print(f"ERROR: {e}")

        yield

        # exit phase


    app = FastAPI(
        title="QuickShip Courier Tracking System",
        lifespan=lifespan
    )

    @app.get("/")
    def root():
        return {
            "message": "QuickShip API Running"
        }

    app.include_router(
        tracking_router
    )
    
except Exception as e:
    print(f"ERROR : {e}")