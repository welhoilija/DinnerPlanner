from pydantic.dataclasses import dataclass


@dataclass
class ReservationSchema:
    restaurant_name: str
    description: str
    datetime: str


@dataclass
class Review:
    id: int
    reservation_id: int
    stars: int
    comment: str


@dataclass
class ReviewCreate:  # figure a way to exclude fields in the schema so only 1 is needed
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
class ReservationId:
    id: int


@dataclass
class ReviewId:
    id: int


@dataclass
class ReservationListResponse:
    reservations: list[ReservationList]
