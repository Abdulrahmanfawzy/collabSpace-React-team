import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMeeting } from "../api/meetings-api";

export const useCreateMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMeeting,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["meetings"],
      });
    },
  });
};