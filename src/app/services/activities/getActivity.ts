import { api } from "../../api/api";
import { IActivity } from "../../models/activity";

export async function getActivity(tripId: string) {
  const {data} = await api.get<{activities: IActivity[]}>(`/trips/${tripId}/activities`)
  return data.activities
}