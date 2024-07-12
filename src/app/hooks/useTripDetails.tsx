import { useQuery } from "@tanstack/react-query";
import { ITripDetails } from "../models/trip";
import { tripServices } from "../services/trip";

export function useTripDetails(id: string) {
  return useQuery<ITripDetails>({
    queryKey: ["details", id],
    queryFn: () => tripServices.getTrip(id),
  });
}
