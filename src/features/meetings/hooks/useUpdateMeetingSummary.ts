import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMeetingSummary } from "../api/meetings-api";
import type { UpdateSummaryPayload } from "../types/meetings.types";

export const useUpdateMeetingSummary = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateSummaryPayload) =>
      updateMeetingSummary(meetingId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meeting", meetingId] });
      queryClient.invalidateQueries({ queryKey: ["meeting-summary", meetingId] });
    },
  });
};