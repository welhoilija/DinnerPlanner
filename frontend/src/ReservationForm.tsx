// ReservationForm.tsx
import React, { useState } from 'react'
import { createReservation } from './api'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

interface ReservationFormProps {
  onReservationCreated: () => void
}

const ReservationForm: React.FC<ReservationFormProps> = ({ onReservationCreated }) => {
  const [restaurantName, setRestaurantName] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      await createReservation({
        restaurant_name: restaurantName,
        description: description,
        datetime: new Date().toDateString(),
      })

      // Call the callback function to inform the parent component that a reservation has been created
      onReservationCreated()

      // Clear the form fields
      setRestaurantName('')
      setDescription('')
    } catch (error) {
      // Handle error
    }
  }

  return (
    <div>
      <h2>Create Reservation</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="restaurantName">
          <Form.Label>Restaurant Name:</Form.Label>
          <Form.Control
            type="text"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Reservation
        </Button>
      </Form>
    </div>
  )
}

export default ReservationForm
