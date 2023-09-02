from sqlalchemy import create_engine
from sqlalchemy.orm import Session
import os
import logging


DB_USER = os.environ.get("POSTGRES_USER")
DB_PASSWORD = os.environ.get("POSTGRES_PASSWORD")
DB_HOST = os.environ.get("POSTGRES_HOST", "db")
DB_PORT = os.environ.get("POSTGRES_PORT", "5432")
DB_NAME = os.environ.get("POSTGRES_DB")

logging.warning(f"DB_USER: {DB_USER}")
logging.warning(f"DB_PASSWORD: {DB_PASSWORD}")
logging.warning(f"DB_HOST: {DB_HOST}")
logging.warning(f"DB_PORT: {DB_PORT}")
logging.warning(f"DB_NAME: {DB_NAME}")
DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL)


def get_db():
    db = Session(bind=engine)
    try:
        yield db
    finally:
        db.close()
