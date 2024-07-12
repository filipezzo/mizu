import { useMutation } from "@tanstack/react-query";
import { ITrip } from "../models/trip";
import { tripServices } from "../services/trip";

export function useCreateTrip() {
  return useMutation({
    mutationFn: (data: ITrip) => tripServices.createTrip(data),
  });
}
