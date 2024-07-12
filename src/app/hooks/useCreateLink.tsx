import { useMutation } from "@tanstack/react-query";
import { LinksItem } from "../models/links";
import { linkService } from "../services/links";

export function useCreateLink(tripId: string) {
  return useMutation({
    mutationFn: (data: LinksItem) => linkService.createLinks(tripId, data),
  });
}
