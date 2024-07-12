import { api } from "../../api/api";

export async function updateActivity(id: string, isCompleted:boolean){
  const {data} = await api.patch(`/activities/${id}`, {id, is_completed: isCompleted})
  return data
}