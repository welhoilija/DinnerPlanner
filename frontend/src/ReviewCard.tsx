import React from "react";
import { Card, CloseButton } from "react-bootstrap";
import { Review } from "./api";
import "./ReviewCard.css";

interface ReviewCardProps {
  review: Review;
  handleRemoveReview: (id: number) => void;
}

function StarRating(stars: number) {
  const starIcons = "⭐".repeat(stars);

  return <span className="star-rating">{starIcons}</span>;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  handleRemoveReview,
}: ReviewCardProps) => {
  return (
    <Card className="m-2 bg-dark text-white review-card">
      <CloseButton className="close-button" onClick={() => handleRemoveReview(review.id)} />
      <Card.Body>
        <Card.Text>{StarRating(review.stars)}</Card.Text>
        <Card.Text>{review.comment}</Card.Text>
      </Card.Body>
    </Card>
  );
};