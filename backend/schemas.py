from pydantic.dataclasses import dataclass


@dataclass
class ReservationCreate:
    restaurant_name: str
    description: str
    datetime: str


@dataclass
class ReservationList:
    id: int
    restaurant_name: str
    datetime: str
    description: str


@dataclass
class ReservationListResponse:
    reservations: list[ReservationList]


@dataclass
class ReviewCreate:
    reservation_id: int
    stars: int
    comment: str
