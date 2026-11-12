import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTasksFromSummary } from "../api/meetings-api";

export const useCreateTasksFromSummary = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createTasksFromSummary(meetingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meeting", meetingId] });
      queryClient.invalidateQueries({ queryKey: ["meeting-summary", meetingId] });
    },
  });
};