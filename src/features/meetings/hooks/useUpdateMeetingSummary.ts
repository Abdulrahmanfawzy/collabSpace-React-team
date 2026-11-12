import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMeetingSummary } from "../api/meetings-api";
import type { UpdateSummaryPayload } from "../types/meetings.types";
import { toast } from "sonner";

export const useUpdateMeetingSummary = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateSummaryPayload) =>
      updateMeetingSummary(meetingId, payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["meeting", meetingId] });
      queryClient.invalidateQueries({ queryKey: ["meeting-summary", meetingId] });
      toast.success(response.message || "Updating Meeting Summary Successfully")
    },
    onError : (response) => {
      toast.error(response.message || "Failed to update meeting summary ")
    }
  });
};