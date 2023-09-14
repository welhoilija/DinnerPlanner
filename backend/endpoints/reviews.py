from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session as DB_SESSION
from database import get_db
from models.models import Review, Reservation, Session
from schemas import ReviewId, ReviewCreate
from dataclasses import asdict
from fastapi.responses import JSONResponse

router = APIRouter()


@router.post("/", response_model=ReviewCreate)
def create_review(
    review: ReviewCreate,
    Authorization: Annotated[str, Header()],
    db: DB_SESSION = Depends(get_db)
):

    session = db.query(Session).filter_by(session_key=Authorization).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    reservation = db.query(Reservation).filter(
        Reservation.id == review.reservation_id).first()
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")

    db_review = Review(**asdict(review), session_id=session.id)
    reservation.reviews.append(db_review)
    db.add(db_review)
    db.commit()
    db.refresh(db_review)

    return JSONResponse(content=asdict(review))


@router.delete("/")
def delete_review(request: ReviewId, db: DB_SESSION = Depends(get_db)):
    review = db.query(Review).get(request.id)
    if review:
        db.delete(review)
        db.commit()
        return None
    else:
        return HTTPException(status_code=404, detail={"message": "review not found"})
