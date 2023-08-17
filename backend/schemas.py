from pydantic import BaseModel


class ReservationCreate(BaseModel):
    restaurant_name: str
    description: str
    datetime: str


class ReservationList(BaseModel):
    id: int
    restaurant_name: str
    datetime: str
    description: str


class ReservationListResponse(BaseModel):
    reservations: list[ReservationList]
