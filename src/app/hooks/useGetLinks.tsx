import { useQuery } from "@tanstack/react-query";
import { LinksItem } from "../models/links";
import { linkService } from "../services/links";

export function useGetLinks(tripId: string) {
  return useQuery<LinksItem[]>({
    queryKey: ["links", tripId],
    queryFn: () => linkService.getLinks(tripId),
  });
}
