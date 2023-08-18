import React, { useEffect, useState } from 'react'
import { fetchReservations } from './api'
import ReservationForm from './ReservationForm'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

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
      <ul>
        {futureReservations.map(reservation => (
          <li key={reservation.id}>
            <p>Restaurant: {reservation.restaurant_name}</p>
            <p>Date and Time: {reservation.datetime}</p>
            <p>Description: {reservation.description}</p>
          </li>
        ))}
      </ul>
      <hr />
      <h2>Past Reservations</h2>
      <ul>
        {pastReservations.map(reservation => (
          <li key={reservation.id}>
            <p>Restaurant: {reservation.restaurant_name}</p>
            <p>Date and Time: {reservation.datetime}</p>
            <p>Description: {reservation.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ReservationList