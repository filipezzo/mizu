import { api } from "../../api/api";

export async function getParticipants(tripId: string) {
  const {data} = await api.get(`/trips/${tripId}/participants`)
  return data.participants
}