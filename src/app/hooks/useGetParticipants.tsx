import { useQuery } from "@tanstack/react-query";
import { participantsServices } from "../services/participants";

export function useGetParticipants(tripId: string) {
  return useQuery({
    queryKey: ["participants", tripId],
    queryFn: () => participantsServices.getParticipants(tripId),
  });
}
