from dataclasses import asdict
from typing import Annotated

from database import get_db
from fastapi import APIRouter, Depends, HTTPException, Header
from models.models import Reservation
from models.models import Session as DBSession
from models.models import Review as DBReview
from schemas import (ReservationId, ReservationList, ReservationListResponse,
                     ReservationSchema, Review)
from sqlalchemy.orm import Session

router = APIRouter()


@router.post("/create_reservation/")
async def create_reservation(
    request: ReservationSchema,
    Authorization: Annotated[str, Header()],
    db: Session = Depends(get_db)
):
    # Look up the session using the session_key
    session = db.query(DBSession).filter_by(session_key=Authorization).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    db_reservation = Reservation(**asdict(request), session_id=session.id)
    db.add(db_reservation)
    db.commit()
    db.refresh(db_reservation)
    return {"message": "Reservation created successfully"}


@router.delete("/")
async def delete_reservation(request: ReservationId, db: Session = Depends(get_db)):
    reservation = db.query(Reservation).get(request.id)

    if reservation:
        for review in reservation.reviews:
            db.delete(review)
        db.delete(reservation)
        db.commit()
        return None
    else:
        return HTTPException(status_code=404, detail={"message": "Reservation not found"})


@router.get("/list_reservations/", response_model=ReservationListResponse)
async def list_reservations(Authorization: Annotated[str, Header()], db: Session = Depends(get_db)):
    session = db.query(DBSession).filter_by(session_key=Authorization).first()
    reservations = db.query(Reservation).filter_by(session_id=session.id).all()

    reservation_list = []
    for res in reservations:
        reviews = db.query(DBReview).filter_by(reservation_id=res.id).all()
        review_list = [
            Review(id=review.id, reservation_id=res.id, stars=review.stars, comment=review.comment)
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
