from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.models import Reservation
from schemas import ReservationCreate, ReservationListResponse

router = APIRouter()


@router.post("/create_reservation/")
async def create_reservation(request: ReservationCreate, db: Session = Depends(get_db)):
    db_reservation = Reservation(**request.dict())
    db.add(db_reservation)
    db.commit()
    db.refresh(db_reservation)
    return {"message": "Reservation created successfully"}


@router.get("/list_reservations/", response_model=ReservationListResponse)
async def list_reservations(db: Session = Depends(get_db)):
    reservations = db.query(Reservation).all()
    return ReservationListResponse(reservations=reservations)
