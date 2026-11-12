
import api from "@/lib/api";

import type {
  CreateMeetingPayload,
  Filters,
  MeetingsResponse,
  ApiResponse,
  MeetingDetails,
  MeetingSummary,
  GenerateSummaryPayload,
  UpdateSummaryPayload,
  CreateTasksFromSummaryResponse,
  MeetingNote,
  CreateNotePayload,
  UpdateNotePayload,
  MeetingComment,
  CreateCommentPayload,
  UpdateCommentPayload,
  MeetingCommentsResponse,
} from "../types/meetings.types";

// Get Meetings
export const getMeetings = async (
  filters: Filters
): Promise<MeetingsResponse> => {
  const { data } = await api.get<MeetingsResponse>("/api/v1/meetings", {
    params: filters,
  });
  console.log(data)
  return data;
};

// Create Meeting
export const createMeeting = async (
  data: CreateMeetingPayload
) => {
  const response = await api.post("/api/v1/meetings", data);

  return response.data;
};

// Update Meeting
export interface UpdateMeetingPayload {
  title: string;
  meeting_date: string;
  start_time: string;
  end_time: string;
  meeting_link: string;
}

export const updateMeeting = async ({
  id,
  ...payload
}: UpdateMeetingPayload & { id: number }) => {
  const { data } = await api.put(`/api/v1/meetings/${id}`, payload);

  return data;
};

// Delete Meeting
export const deleteMeeting = async (id: number) => {
  const { data } = await api.delete(`/api/v1/meetings/${id}`);

  return data;
};

// Get Meeting Details
export const getMeetingDetails = async (
  id: number
): Promise<ApiResponse<MeetingDetails>> => {
  const { data } = await api.get<ApiResponse<MeetingDetails>>(
    `/api/v1/meetings/${id}`
  );

  return data;
};

// Get Meeting Summary
export const getMeetingSummary = async (
  id: number
): Promise<ApiResponse<MeetingSummary>> => {
  const { data } = await api.get<ApiResponse<MeetingSummary>>(
    `/api/v1/meetings/${id}/summary`
  );

  return data;
};

// Generate AI Summary
export const generateMeetingSummary = async (
  id: number,
  payload: GenerateSummaryPayload
): Promise<ApiResponse<MeetingSummary>> => {
  const { data } = await api.post<ApiResponse<MeetingSummary>>(
    `/api/v1/meetings/${id}/summary/generate`,
    payload
  );

  return data;
};

// Update Meeting Summary Manually
export const updateMeetingSummary = async (
  id: number,
  payload: UpdateSummaryPayload
): Promise<ApiResponse<MeetingSummary>> => {
  const { data } = await api.put<ApiResponse<MeetingSummary>>(
    `/api/v1/meetings/${id}/summary`,
    payload
  );

  return data;
};

// Convert Summary Action Items to Kanban Tasks
export const createTasksFromSummary = async (
  id: number
): Promise<ApiResponse<CreateTasksFromSummaryResponse>> => {
  const { data } = await api.post<ApiResponse<CreateTasksFromSummaryResponse>>(
    `/api/v1/meetings/${id}/summary/create-tasks`,
    {}
  );
  console.log(data)
  return data;
};



// Meeting Notes

export const getMeetingNotes = async (
  meetingId: number
): Promise<ApiResponse<MeetingNote[]>> => {
  const { data } = await api.get<ApiResponse<MeetingNote[]>>(`/api/v1/meetings/${meetingId}/notes`);
  return data;
};

export const createMeetingNote = async (
  meetingId: number,
  payload: CreateNotePayload
): Promise<ApiResponse<MeetingNote>> => {
  const { data } = await api.post<ApiResponse<MeetingNote>>(`/api/v1/meetings/${meetingId}/notes`,
    payload
  );
  return data;
};

export const updateMeetingNote = async (
  meetingId: number,
  noteId: number,
  payload: UpdateNotePayload
): Promise<ApiResponse<MeetingNote>> => {
  const { data } = await api.put<ApiResponse<MeetingNote>>(`/api/v1/meetings/${meetingId}/notes/${noteId}`,
    payload
  );
  return data;
};

export const deleteMeetingNote = async (
  meetingId: number,
  noteId: number
): Promise<ApiResponse<null>> => {
  const { data } = await api.delete<ApiResponse<null>>( `/api/v1/meetings/${meetingId}/notes/${noteId}`);
  return data;
};

// Meeting Comments (Transcripts)

export const getMeetingComments = async (
  meetingId: number
): Promise<MeetingCommentsResponse> => {
  const { data } = await api.get<MeetingCommentsResponse>(
    `/api/v1/meetings/${meetingId}/comments`
  );

  return data;
};


export const createMeetingComment = async (
  meetingId: number,
  payload: CreateCommentPayload
): Promise<ApiResponse<MeetingComment>> => {
  const { data } = await api.post<ApiResponse<MeetingComment>>(`/api/v1/meetings/${meetingId}/comments`,
    payload
  );
  return data;
};

export const updateMeetingComment = async (
  meetingId: number,
  commentId: number,
  payload: UpdateCommentPayload
): Promise<ApiResponse<MeetingComment>> => {
  const { data } = await api.put<ApiResponse<MeetingComment>>(`/api/v1/meetings/${meetingId}/comments/${commentId}`,
    payload
  );
  return data;
};

export const deleteMeetingComment = async ( meetingId: number, commentId: number): Promise<ApiResponse<null>> => {
  const { data } = await api.delete<ApiResponse<null>>(`/api/v1/meetings/${meetingId}/comments/${commentId}`);
  return data;
};
