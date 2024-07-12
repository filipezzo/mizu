import { api } from "../../api/api";

export async function getTrip(id: string){
  const {data} = await api.get(`/trips/${id}`)
  return data.trip ?? data
}