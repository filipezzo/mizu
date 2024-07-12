import { api } from "../../api/api";
import { LinksItem } from "../../models/links";

export async function createLinks(tripId: string, link:LinksItem){
  const {data} = await api.post(`/trips/${tripId}/links`, link)
  return data;
}