import React from "react";
import { Button, Card, CloseButton } from "react-bootstrap";
import { Review } from "./api";
import { Reservation } from "./ReservationList";
import { ReviewCard } from "./ReviewCard";

interface ReservationCardProps {
  reservation: Reservation;
  handleRemoveReservation: (id: number) => void;
  openReviewModal: (id: number) => void;
  handleRemoveReview: (id: number) => void;
}

export const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation,
  handleRemoveReservation,
  openReviewModal,
  handleRemoveReview,
}) => {
  return (
    <Card bg="dark" text="white">
      <Card.Body>
        <Card.Title className="mb-2 p-2">{reservation.restaurant_name}</Card.Title>
        <Card.Subtitle className="mb-2">
          Date and Time: {reservation.datetime}
        </Card.Subtitle>
        <Card.Text>{reservation.description}</Card.Text>
        <CloseButton className="close-button" onClick={() => handleRemoveReservation(reservation.id)} />
        {reservation.reviews.length > 0 &&
          <Card.Subtitle className="p-2">Reviews</Card.Subtitle>
        }
        <div className="d-flex flex-row flex-wrap justify-content-center">
          {reservation.reviews.map((review: Review) => (
            <ReviewCard
              key={review.id}
              review={review}
              handleRemoveReview={handleRemoveReview}
            />
          ))}
        </div>
        <div className="CreateReservation">
          <Button
            variant="primary"
            onClick={() => openReviewModal(reservation.id)}
          >
            Write a Review
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
