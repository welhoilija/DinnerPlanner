import React, { useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'
import { createOrGetSession } from './api'

import './SessionComponent.scss' // Import the SCSS file

export default function SessionComponent() {
    const [sessionKey, setSessionKey] = useState('')
  const [isCreatingSession, setIsCreatingSession] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleCreateSession = async () => {
    setIsCreatingSession(true)
    setIsLoading(true)

    try {
      await createOrGetSession(sessionKey)
      setSessionKey('')
      setIsCreatingSession(false)
      setIsLoading(false)
      setSuccessMessage('Session created successfully.')
      setError('')
    } catch (error) {
      setIsCreatingSession(false)
      setIsLoading(false)
      setError('Error creating or getting session. Please try again.')
      setSuccessMessage('')
    }
  }

  return (
    <div className="session-container">
      <h2>Create or Get Session</h2>
      <Form onSubmit={handleCreateSession} className="session-form">
        <Form.Group controlId="sessionKey">
          <Form.Label>Session Key:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter session key"
            value={sessionKey}
            onChange={(e) => setSessionKey(e.target.value)}
            className="session-input"
            required
          />
        </Form.Group>
        <Button
          variant="primary"
          type="button"
          onClick={handleCreateSession}
          disabled={isCreatingSession || isLoading}
          className="session-button"
        >
          {isCreatingSession ? (
            <Spinner animation="border" size="sm" role="status">
            </Spinner>
          ) : (
            'Create Session'
          )}
        </Button>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}
        {successMessage && <p className="text-success">{successMessage}</p>}
      </Form>
    </div>
  )
}
