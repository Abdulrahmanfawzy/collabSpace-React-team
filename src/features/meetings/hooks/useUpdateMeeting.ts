import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMeeting } from "../api/meetings-api";

export const useUpdateMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMeeting,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["meetings"],
      });

      queryClient.invalidateQueries({
        queryKey: ["meeting", variables.id],
      });
    },
  });
};