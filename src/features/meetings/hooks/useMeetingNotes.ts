import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMeetingNotes,
  createMeetingNote,
  updateMeetingNote,
  deleteMeetingNote,
} from "../api/meetings-api";
import type { CreateNotePayload, UpdateNotePayload } from "../types/meetings.types";

export const useGetMeetingNotes = (meetingId: number) => {
  return useQuery({
    queryKey: ["meeting-notes", meetingId],
    queryFn: () => getMeetingNotes(meetingId),
    staleTime:1000 * 60 * 5 ,
    enabled: !!meetingId,
  });
};

export const useCreateMeetingNote = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateNotePayload) =>
      createMeetingNote(meetingId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meeting-notes", meetingId] });
    },
  });
};

export const useUpdateMeetingNote = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      noteId,
      payload,
    }: {
      noteId: number;
      payload: UpdateNotePayload;
    }) => updateMeetingNote(meetingId, noteId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meeting-notes", meetingId] });
    },
  });
};

export const useDeleteMeetingNote = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noteId: number) => deleteMeetingNote(meetingId, noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meeting-notes", meetingId] });
    },
  });
};