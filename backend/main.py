
from fastapi import FastAPI
from models.models import Base
from database import engine
from endpoints import reservations

app = FastAPI()

app.include_router(reservations.router, prefix="/reservation", tags=["reservation"])

Base.metadata.create_all(bind=engine)


@app.get("/")
def read_root():
    return {"message": "Very cool backend!"}

