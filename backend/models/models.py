from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

Base = declarative_base()


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    reservations = relationship("Reservation", back_populates="user")


class Restaurant(Base):
    __tablename__ = 'restaurants'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)


class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(Integer, primary_key=True, index=True)
    restaurant_name = Column(String, index=True)
    datetime = Column(DateTime, default=datetime.utcnow)
    description = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="reservations")
    reviews = relationship("Review", back_populates="reservation")


class Review(Base):
    __tablename__ = 'reviews'

    id = Column(Integer, primary_key=True)
    reservation_id = Column(Integer, ForeignKey('reservations.id'), nullable=False)
    stars = Column(Integer, nullable=False)
    comment = Column(String)

    reservation = relationship("Reservation", back_populates="reviews")
