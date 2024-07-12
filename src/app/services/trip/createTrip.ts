import { api } from "../../api/api"
import { ITrip } from "../../models/trip"



export async function createTrip(input: ITrip) {
  const {data} = await api.post('/trips', input)
  return data.tripId
}