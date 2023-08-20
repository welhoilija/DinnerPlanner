from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.models import Reservation, Review as DBReview
from schemas import ReservationSchema, ReservationListResponse, ReservationList, Review
from dataclasses import asdict

router = APIRouter()


@router.post("/create_reservation/")
async def create_reservation(request: ReservationSchema, db: Session = Depends(get_db)):
    db_reservation = Reservation(**asdict(request))
    db.add(db_reservation)
    db.commit()
    db.refresh(db_reservation)
    return {"message": "Reservation created successfully"}


@router.get("/list_reservations/", response_model=ReservationListResponse)
async def list_reservations(db: Session = Depends(get_db)):
    reservations = db.query(Reservation).all()

    reservation_list = []
    for res in reservations:
        reviews = db.query(DBReview).filter_by(reservation_id=res.id).all()
        review_list = [
            Review(id=review.id, stars=review.stars, comment=review.comment)
            for review in reviews
        ]

        reservation_list.append(
            ReservationList(
                id=res.id,
                restaurant_name=res.restaurant_name,
                datetime=res.datetime.strftime('%Y-%m-%d %H:%M:%S'),
                description=res.description,
                reviews=review_list
            )
        )

    response_data = ReservationListResponse(reservations=reservation_list)
    return response_data
