import React, { useState } from 'react'
import { createReview, Review } from './api'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

interface ReviewFormProps {
  reservationId: number
  onReviewCreated: () => void
  onClose: () => void
}

const ReviewForm: React.FC<ReviewFormProps> = ({ reservationId, onReviewCreated, onClose }) => {
  const [stars, setStars] = useState<number | undefined>(undefined)
  const [comment, setComment] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (stars === undefined) {
      return
    }

    try {
      const review: Review = {
        reservation_id: reservationId,
        stars: stars,
        comment: comment,
      }
      await createReview(review)
      onReviewCreated()
      onClose()
    } catch (error) {
      console.error('Error creating review:', error)
    }
  }

  return (

    <Form onSubmit={handleSubmit}>
        <Form.Group controlId="stars">
        <Form.Label>Stars</Form.Label>
        <Form.Control
            as="select"
            value={stars || ''}
            onChange={(event) => setStars(Number(event.target.value))}
            required
        >
            <option value="">Select Stars</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </Form.Control>
        </Form.Group>
        <Form.Group controlId="comment">
        <Form.Label>Comment</Form.Label>
        <Form.Control
            as="textarea"
            rows={3}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
        />
        </Form.Group>
        <Button variant="primary" type="submit">
        Submit
        </Button>
    </Form>

  )
}

export default ReviewForm