from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.models import Reservation
from schemas import ReservationCreate, ReservationListResponse, ReservationList


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

    reservation_list = [
        ReservationList(
            id=res.id,
            restaurant_name=res.restaurant_name,
            datetime=res.datetime.strftime(
                '%Y-%m-%d %H:%M:%S'),
            description=res.description,
        )
        for res in reservations
    ]

    return ReservationListResponse(reservations=reservation_list)
