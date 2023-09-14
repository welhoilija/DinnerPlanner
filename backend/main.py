
from fastapi import FastAPI
from models.models import Base
from database import connect_database
from endpoints import reservations
from endpoints import reviews
from endpoints import sessions

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "https://dinner.tuomaskangas.com/",
    "https://dinner.tuomaskangas.com",
    "http://0.0.0.0:3000",
    "http://0.0.0.0:3000/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Need to check before prod

app.include_router(reservations.router,
                   prefix="/reservation", tags=["reservation"])
app.include_router(reviews.router, prefix="/review", tags=["review"])
app.include_router(sessions.router, prefix="/session", tags=["session"])

Base.metadata.create_all(bind=connect_database())
