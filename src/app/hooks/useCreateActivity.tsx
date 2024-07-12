import { useMutation } from "@tanstack/react-query";
import { ICreateTripActivity } from "../models/trip";
import { activityServices } from "../services/activities";

export function useCreateActivity(tripId: string) {
  return useMutation({
    mutationFn: (activity: ICreateTripActivity) =>
      activityServices.createActivity(tripId, activity),
  });
}
