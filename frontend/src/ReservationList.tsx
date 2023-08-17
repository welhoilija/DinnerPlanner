import React, { useEffect, useState } from 'react'
import { fetchReservations } from './api'
import ReservationForm from './ReservationForm'

interface Reservation {
  id: number
  restaurant_name: string
  datetime: string
  description: string
  user_id: number
}

const ReservationList: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
  
    const fetchData = async () => {
      try {
        const data = await fetchReservations();
        setReservations(data);
      } catch (error) {
        // Handle
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const handleReservationCreated = () => {
      fetchData();
    };
  

  const currentDate = new Date()

  const futureReservations = reservations.filter(
    reservation => new Date(reservation.datetime) >= currentDate
  )

  const pastReservations = reservations.filter(
    reservation => new Date(reservation.datetime) < currentDate
  )

  return (
    <div>
      <h2>Future Reservations</h2>
      <ul>
        {futureReservations.map(reservation => (
          <li key={reservation.id}>
            <p>Restaurant: {reservation.restaurant_name}</p>
            <p>Date and Time: {reservation.datetime}</p>
            <p>Description: {reservation.description}</p>
            {/* Add more reservation information */}
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
            {/* Add more reservation information */}
          </li>
        ))}
      </ul>
      <ReservationForm onReservationCreated={handleReservationCreated} />
    </div>
  )
}

export default ReservationList