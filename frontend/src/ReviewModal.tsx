import React from "react";
import Modal from "react-bootstrap/Modal";
import ReviewForm from "./ReviewForm";

interface ReviewModalProps {
  isReviewModalOpen: boolean;
  closeReviewModal: () => void;
  reservationId: number | null;
  onReviewCreated: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isReviewModalOpen,
  closeReviewModal,
  reservationId,
  onReviewCreated,
}) => {
  return (
    <Modal show={isReviewModalOpen} onHide={closeReviewModal} className="modal">
      <Modal.Header closeButton>
        <Modal.Title>Write a review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ReviewForm
          reservationId={reservationId}
          onReviewCreated={onReviewCreated}
        />
      </Modal.Body>
    </Modal>
  );
};
