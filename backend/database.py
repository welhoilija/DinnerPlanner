from sqlalchemy import create_engine
from sqlalchemy.orm import Session

DATABASE_URL = "postgresql://dinner_user:secret_password@db:5432/dinner_db"

engine = create_engine(DATABASE_URL)


def get_db():
    db = Session(bind=engine)
    try:
        yield db
    finally:
        db.close()
