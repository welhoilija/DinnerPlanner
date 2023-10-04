import React, { useState } from "react";
import { createReservation } from "./api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "./datetimepicker.scss";
interface ReservationFormProps {
  onReservationCreated: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  onReservationCreated,
}) => {
  const date = new Date();
  date.setMinutes(0);
  date.setSeconds(0);
  date.setHours(date.getHours() + 1);

  const [dateTime, setDateTime] = useState<Date | null>(date);
  const [restaurantName, setRestaurantName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createReservation({
        restaurant_name: restaurantName,
        description: description,
        datetime: dateTime ? dateTime.toISOString() : "",
      });

      onReservationCreated();

      setRestaurantName("");
      setDescription("");
      setDateTime(null);
    } catch (error) {
      // Handle
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="restaurantName">
          <Form.Label>Restaurant Name:</Form.Label>
          <Form.Control
            type="text"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            required
            style={{ backgroundColor: "#333", color: "#fff" }}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ backgroundColor: "#333", color: "#fff" }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Date and Time</Form.Label>
          <DateTimePicker
            onChange={(value) => setDateTime(value)}
            value={dateTime}
            format="y-MM-dd HH:mm:ss"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Reservation
        </Button>
      </Form>
    </div>
  );
};

export default ReservationForm;
