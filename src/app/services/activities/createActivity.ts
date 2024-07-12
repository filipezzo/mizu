import { api } from "../../api/api";
import { ICreateTripActivity } from "../../models/trip";

export async function createActivity(tripId: string, activity:ICreateTripActivity){
  const {data} = await api.post(`trips/${tripId}/activities`, activity)
  return data.activityId ?? data
}