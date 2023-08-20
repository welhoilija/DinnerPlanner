from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.models import Review, Reservation
from schemas import Review as ReviewSchema

router = APIRouter()


@router.post("/", response_model=ReviewSchema)
def create_review(review: ReviewSchema, db: Session = Depends(get_db)):
    reservation = db.query(Reservation).filter(Reservation.id == review.reservation_id).first()
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")

    db_review = Review(**review.dict())
    reservation.reviews.append(db_review)
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review
