import React, { useEffect, useState } from 'react'
import { fetchReservations, removeReservation } from './api'
import ReservationForm from './ReservationForm'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import './ReservationList.scss'
import ReviewForm from './ReviewForm'

interface Reservation {
  id: number
  restaurant_name: string
  datetime: string
  description: string
  user_id: number
}

const ReservationList: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchData = async () => {
    try {
      const data = await fetchReservations()
      setReservations(data)
    } catch (error) {
      // Handle
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleReservationCreated = () => {
    fetchData()
    closeModal()
  }

  const handleRemoveReservation = async (reservationId: number) => {
    try {
      await removeReservation(reservationId)
      fetchData()
    } catch (error) {
      console.error('Error removing reservation:', error);
    }
  }
  

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const currentDate = new Date()

  const futureReservations = reservations.filter(
    reservation => new Date(reservation.datetime) >= currentDate
  )

  const pastReservations = reservations.filter(
    reservation => new Date(reservation.datetime) < currentDate
  )

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState<number | null>(null);

  const openReviewModal = (reservationId: number) => {
    setSelectedReservationId(reservationId);
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setSelectedReservationId(null);
    setIsReviewModalOpen(false);
  };

  const handleReviewCreated = () => {
    fetchData()
    closeReviewModal()
  }

  return (
    <div>
      <div className='CreateReservation'>
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
        {futureReservations.map(reservation => (
          <li key={reservation.id}>
            <Card bg="dark" text="white">
              <Card.Body>
                <Card.Title>{reservation.restaurant_name}</Card.Title>
                <Card.Subtitle className="mb-2">
                  Date and Time: {reservation.datetime}
                </Card.Subtitle>
                <Card.Text>{reservation.description}</Card.Text>
                <Button variant="danger" onClick={() => handleRemoveReservation(reservation.id)}>
                  Remove
                </Button>
              </Card.Body>
            </Card>
          </li>
        ))}
      </ul>

      <hr />

      <h2>Past Reservations</h2>
      <ul className="list-unstyled">
        {pastReservations.map(reservation => (
          <li key={reservation.id}>
            <Card bg="dark" text="white">
              <Card.Body>
                <Card.Title>{reservation.restaurant_name}</Card.Title>
                <Card.Subtitle className="mb-2">
                  Date and Time: {reservation.datetime}
                </Card.Subtitle>
                <Card.Text>{reservation.description}</Card.Text>
                <Button variant="danger" onClick={() => handleRemoveReservation(reservation.id)}>
                  Remove
                </Button>
                <div className='CreateReservation'>
                  <Button variant="primary" onClick={() => openReviewModal(reservation.id)}>
                  Write Review
                  </Button>
                </div>

                <Modal show={isReviewModalOpen} onHide={closeReviewModal} className="modal">
                  <Modal.Header closeButton>
                    <Modal.Title>Write a review</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ReviewForm
                      reservationId={reservation.id}
                      onReviewCreated={handleReviewCreated}
                      onClose={closeReviewModal}
                    />
                  </Modal.Body>
                </Modal>
              </Card.Body>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ReservationList