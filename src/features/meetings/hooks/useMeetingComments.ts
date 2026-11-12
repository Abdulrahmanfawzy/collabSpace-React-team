import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMeetingComments,
  createMeetingComment,
  updateMeetingComment,
  deleteMeetingComment,
} from "../api/meetings-api";
import type {
  CreateCommentPayload,
  UpdateCommentPayload,
} from "../types/meetings.types";

export const useGetMeetingComments = (meetingId: number) => {
  return useQuery({
    queryKey: ["meeting-comments", meetingId],
    queryFn: () => getMeetingComments(meetingId),
    staleTime:1000 * 60 * 5 ,
    enabled: !!meetingId,
  });
};

export const useCreateMeetingComment = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCommentPayload) =>
      createMeetingComment(meetingId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["meeting-comments", meetingId],
      });
    },
  });
};

export const useUpdateMeetingComment = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      payload,
    }: {
      commentId: number;
      payload: UpdateCommentPayload;
    }) => updateMeetingComment(meetingId, commentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["meeting-comments", meetingId],
      });
    },
  });
};

export const useDeleteMeetingComment = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) =>
      deleteMeetingComment(meetingId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["meeting-comments", meetingId],
      });
    },
  });
}