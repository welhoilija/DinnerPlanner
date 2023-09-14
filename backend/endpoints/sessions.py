from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.models import Session as DBSession
from schemas import SessionCreate

router = APIRouter()


@router.post("/", response_model=SessionCreate)
def create_or_get_session(session: SessionCreate, db: Session = Depends(get_db)):

    existing_session = db.query(DBSession).filter_by(session_key=session.session_key).first()
    if existing_session:
        # Create a SessionCreate instance from the existing_session
        response_session = SessionCreate(session_key=existing_session.session_key)
        return response_session

    new_session = DBSession(session_key=session.session_key)
    db.add(new_session)
    db.commit()
    db.refresh(new_session)

    # Create a SessionCreate instance from the new_session
    response_session = SessionCreate(session_key=new_session.session_key)
    return response_session
