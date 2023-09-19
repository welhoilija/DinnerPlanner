import React from "react";
import { Card, CloseButton } from "react-bootstrap";
import { Review } from "./api";

interface ReviewCardProps {
  review: Review;
  handleRemoveReview: (id: number) => void;
}

function StarRating(stars: number) {
  const starIcons = "⭐".repeat(stars);

  return <span>{starIcons}</span>;
}
export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  handleRemoveReview,
}: ReviewCardProps) => {
  return (
    <Card className="m-2 bg-dark text-white">
      <Card.Body>
        <CloseButton onClick={() => handleRemoveReview(review.id)} />
        <Card.Text>{StarRating(review.stars)}</Card.Text>
        <Card.Text>{review.comment}</Card.Text>
      </Card.Body>
    </Card>
  );
};
