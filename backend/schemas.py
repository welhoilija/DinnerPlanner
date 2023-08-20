from pydantic.dataclasses import dataclass


@dataclass
class ReservationSchema:
    restaurant_name: str
    description: str
    datetime: str


@dataclass
class Review:
    reservation_id: int
    stars: int
    comment: str


@dataclass
class ReservationList:
    id: int
    restaurant_name: str
    datetime: str
    description: str
    reviews: list[Review]


@dataclass
class ReservationListResponse:
    reservations: list[ReservationList]
