import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IActivityUpdateStatus, ISingleActivity } from "../models/activity";
import { activityServices } from "../services/activities";

export default function useUpdateActivity() {
  const queryClient = useQueryClient();
  return useMutation<
    IActivityUpdateStatus,
    Error,
    { id: string; isCompleted: boolean }
  >({
    mutationFn: ({ id, isCompleted }) =>
      activityServices.updateActivity(id, isCompleted),
    onMutate: async ({ id, isCompleted }) => {
      queryClient.cancelQueries({ queryKey: ["activities"] });
      const previousStatus = queryClient.getQueryData(["activities"]);

      queryClient.setQueryData(["activities"], (state: ISingleActivity[]) => {
        return state?.map((item) => ({
          ...item,
          activities: item.activities.map((act) =>
            act.id === id ? { ...act, is_completed: isCompleted } : act,
          ),
        }));
      });

      return { previousStatus };
    },
    onError: (err, variables, context) => {
      //@ts-expect-error ignore
      queryClient.setQueryData(["activities"], context.previousStatus);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });
}
