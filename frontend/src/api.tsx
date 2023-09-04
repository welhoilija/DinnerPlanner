import axios from 'axios'

interface Reservation {
  id: number
  restaurant_name: string
  datetime: string
  description: string
  user_id: number
  reviews: Review[]
}

interface ReservationsResponse {
  reservations: Reservation[]
}

export interface Review {
  reservation_id: number
  stars: number
  comment: string
}

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://backend-ogfqdmlfoa-lz.a.run.app",
  timeout: 10000,
})
console.log(process.env.REACT_APP_API_URL)

export async function fetchReservations(): Promise<Reservation[]> {
  try {
    const response = await instance.get<ReservationsResponse>('/reservation/list_reservations/')
    return response.data.reservations
  } catch (error) {
    console.error('Error fetching reservations:', error)
    throw error
  }
}

export async function createReservation(reservationData: {
    restaurant_name: string
    description: string
    datetime: string
  }): Promise<{ message: string }> {
    try {
      const response = await instance.post('/reservation/create_reservation/', reservationData)
      return response.data
    } catch (error) {
      console.error('Error creating reservation:', error)
      throw error
    }
}

export async function removeReservation(reservationId: number): Promise<{ message: string }> {
  try {
    const response = await instance.delete('/reservation/', { data: { id: reservationId } })
    return response.data
  } catch (error) {
    console.error('Error removing reservation:', error)
    throw error
  }
}

export async function createReview(review: Review): Promise<{ message: string }> {
  try {
    const response = await instance.post('/review/', review)
    return response.data
  } catch (error) {
    console.error('Error creating review:', error)
    throw error
  }
}

export default instance