
from fastapi import FastAPI
from models.models import Base
from database import connect_tcp_socket
from endpoints import reservations
from endpoints import reviews

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://0.0.0.0:3000",  # or the FQDN in prod
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

Base.metadata.create_all(bind=connect_tcp_socket())
