import { api } from "../../api/api";

export async function getLinks(tripId:string){
  const {data} = await api.get(`/trips/${tripId}/links`)
  return data.links ?? data
}