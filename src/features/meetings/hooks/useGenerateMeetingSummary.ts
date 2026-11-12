import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateMeetingSummary } from "../api/meetings-api";
import type { GenerateSummaryPayload } from "../types/meetings.types";

export const useGenerateMeetingSummary = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: GenerateSummaryPayload) =>
      generateMeetingSummary(meetingId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meeting", meetingId] });
      queryClient.invalidateQueries({ queryKey: ["meeting-summary", meetingId] });
    },
  });
};