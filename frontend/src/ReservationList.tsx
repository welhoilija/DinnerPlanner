import React, { useEffect, useState } from "react";
import {
  fetchReservations,
  removeReservation,
  removeReview,
  Review,
} from "./api";
import ReservationForm from "./ReservationForm";
import "./ReservationList.scss";
import { Button, Modal } from "react-bootstrap";
import { ReservationCard } from "./ReservationCard";
import { ReviewModal } from "./ReviewModal";
import ErrorMessage from "./Errors";

export type Reservation = {
  id: number;
  restaurant_name: string;
  datetime: string;
  description: string;
  user_id: number;
  reviews: Review[];
};

const ReservationList: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const data = await fetchReservations();
      setReservations(data);
    } catch (error) {
      console.error("Failed to fetch reservations:", error);
      setErrorMessage("Failed to fetch reservations");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReservationCreated = () => {
    fetchData();
    closeModal();
  };

  const handleRemoveReservation = async (reservationId: number) => {
    try {
      await removeReservation(reservationId);
      fetchData();
    } catch (error) {
      console.error("Error removing reservation:", error);
      setErrorMessage("Failed to remove reservation");
    }
  };

  const handleRemoveReview = async (reviewId: number | null) => {
    if (reviewId == null) {
      return;
    }
    try {
      await removeReview(reviewId);
      fetchData();
    } catch (error) {
      console.error("Error removing review:", error);
      setErrorMessage("Failed to remove review")
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const currentDate = new Date();

  const futureReservations = reservations.filter(
    (reservation) => new Date(reservation.datetime) >= currentDate
  );

  const pastReservations = reservations.filter(
    (reservation) => new Date(reservation.datetime) < currentDate
  );

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reservationId, setIsreservationId] = useState<number | null>(null);

  const openReviewModal = (reservationId: number) => {
    setIsreservationId(reservationId);
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  const handleReviewCreated = () => {
    fetchData();
    closeReviewModal();
  };

  return (
    <div>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}
      <div className="session-info">
        <span>Session Key: {localStorage.getItem("sessionKey")}</span>
        <Button
          variant="danger"
          onClick={() => {
            localStorage.removeItem("sessionKey");
            window.location.reload();
          }}
        >
          Stop Session
        </Button>
      </div>
      <div className="CreateReservation">
        <Button variant="primary" onClick={openModal}>
          Create Reservation
        </Button>
      </div>
      <Modal show={isModalOpen} onHide={closeModal} className="modal">
        <Modal.Header closeButton>
          <Modal.Title>Create Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReservationForm onReservationCreated={handleReservationCreated} />
        </Modal.Body>
      </Modal>
      <h2>Future Reservations</h2>
      <ul className="list-unstyled">
        {futureReservations.map((reservation) => (
          <li key={reservation.id}>
            <ReservationCard
              reservation={reservation}
              handleRemoveReservation={handleRemoveReservation}
              openReviewModal={openReviewModal}
              handleRemoveReview={handleRemoveReview}
            />
          </li>
        ))}
      </ul>
      <hr />
      <h2>Past Reservations</h2>
      <ul className="list-unstyled">
        {pastReservations.map((reservation) => (
          <li key={reservation.id}>
            <ReservationCard
              reservation={reservation}
              handleRemoveReservation={handleRemoveReservation}
              openReviewModal={openReviewModal}
              handleRemoveReview={handleRemoveReview}
            />
          </li>
        ))}
      </ul>
      <ReviewModal
        isReviewModalOpen={isReviewModalOpen}
        closeReviewModal={closeReviewModal}
        reservationId={reservationId}
        onReviewCreated={handleReviewCreated}
      />
    </div>
  );
};

export default ReservationList;
