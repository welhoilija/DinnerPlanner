import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { createOrGetSession } from "./api";
import "./SessionComponent.scss";

type SessionComponentProps = {
  onSessionCreated: (sessionKey: string) => void;
};

function SessionComponent({ onSessionCreated }: SessionComponentProps) {
  const [sessionState, setSessionState] = useState({
    sessionKey: "",
    isLoading: false,
    error: "",
    successMessage: "",
  });

  const handleCreateSession = async () => {
    setSessionState((prevState) => ({ ...prevState, isLoading: true }));

    try {
      await createOrGetSession(sessionState.sessionKey);
      setSessionState({
        sessionKey: "",
        isLoading: false,
        error: "",
        successMessage: "Session created successfully.",
      });
      localStorage.setItem("sessionKey", sessionState.sessionKey);
      onSessionCreated(sessionState.sessionKey);
    } catch (error) {
      setSessionState({
        ...sessionState,
        isLoading: false,
        error: "Error creating or getting session. Please try again.",
        successMessage: "",
      });
    }
  };

  return (
    <div className="session-container">
      <h2>Create or Get Session</h2>
      <h3> Use a secret session key and share it with your friends!</h3>
      <Form onSubmit={handleCreateSession} className="session-form">
        <Form.Group controlId="sessionKey">
          <Form.Label>Session Key:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter session key"
            value={sessionState.sessionKey}
            onChange={(e) =>
              setSessionState({ ...sessionState, sessionKey: e.target.value })
            }
            className="session-input"
            required
          />
        </Form.Group>
        <Button
          variant="primary"
          type="button"
          onClick={handleCreateSession}
          disabled={sessionState.isLoading}
          className="session-button"
        >
          {sessionState.isLoading ? (
            <Spinner animation="border" size="sm" role="status"></Spinner>
          ) : (
            "Create Session"
          )}
        </Button>
        {sessionState.isLoading && <p>Loading...</p>}
        {sessionState.error && (
          <p className="text-danger">{sessionState.error}</p>
        )}
        {sessionState.successMessage && (
          <p className="text-success">{sessionState.successMessage}</p>
        )}
      </Form>
    </div>
  );
}

export default SessionComponent;
