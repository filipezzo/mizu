import { useQuery } from "@tanstack/react-query";
import { activityServices } from "../services/activities";

export function useGetActivity(tripId: string) {
  return useQuery({
    queryKey: ["activities", tripId],
    queryFn: () => activityServices.getActivity(tripId),
  });
}
