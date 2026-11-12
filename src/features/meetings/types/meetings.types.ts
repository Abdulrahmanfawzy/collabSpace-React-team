export type MeetingParticipant = {
  id: number;
  name: string;
  email: string;
  avatar_url: string;
  job_title: string;
  attended: boolean;
};

export type MeetingProject = {
  id: number;
  name: string;
};

export type MeetingCreator = {
  id: number;
  name: string;
  email: string;
};

export type Meeting = {
  id: number;
  title: string;
  description: string;
  meeting_date: string;
  start_time: string;
  end_time: string;
  meeting_link: string;
  status: string;
  project_id: number;
  created_by: number;
  project: MeetingProject;
  creator: MeetingCreator;
  participants_count: number;
  participants: MeetingParticipant[];
  summary: null;
  created_at: string;
  updated_at: string;
};

export type PaginationLink = {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
};

export type PaginationMeta = {
  current_page: number;
  from: number | null;
  last_page: number;
  links: PaginationLink[];
  path: string;
  per_page: number;
  to: number | null;
  total: number;
};

export type MeetingsPagination = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};

export type MeetingsResponse = {
  success: boolean;
  message: string;
  data: {
    data: Meeting[];
    links: MeetingsPagination;
    meta: PaginationMeta;
  };
};


export type Filters = {
  project_id?: number;
  time_filter?: TimeFilter;
  per_page?: number
}

export type TimeFilter = "upcoming" | "past" | "today"


export interface CreateMeetingPayload {
  title: string;
  description?: string;
  meeting_date: string;
  start_time: string;
  end_time: string;
  meeting_link: string;
  project_id?: number;
  participants?: number[];
}


export interface ActionItem {
  title: string;
  suggested_assignee: string;
  priority: string;
}

export interface MeetingSummary {
  id: number;
  meeting_id: number;
  summary: string;
  decisions_made: string[];
  action_items: ActionItem[] | string[];
  assigned_tasks: Record<string, string> | string[];
  risks: string[];
  next_steps: string[];
  generated_by_ai: boolean;
  created_at: string;
  updated_at: string;
}

export interface MeetingDetails {
  id: number;
  title: string;
  description: string;
  meeting_date: string;
  start_time: string;
  end_time: string;
  meeting_link: string;
  status: string;
  project_id: number;
  created_by: number;
  project: MeetingProject;
  creator: MeetingCreator;
  participants_count: number;
  participants: MeetingParticipant[];
  summary: MeetingSummary | null;
  created_at: string;
  updated_at: string;
}

export interface GenerateSummaryPayload {
  transcript: string;
}

export interface UpdateSummaryPayload {
  summary?: string;
  decisions_made?: string[];
  action_items?: ActionItem[] | string[];
  assigned_tasks?: Record<string, string> | string[];
  risks?: string[];
  next_steps?: string[];
}

export interface CreatedTask {
  id: number;
  name: string;
  description: string;
  priority: string;
  status: string;
  due_date: string;
  completed_at: string | null;
  hours_spent: number;
  project_id: number;
  team_id: number | null;
  assigned_to: number | null;
  created_by: number;
  project: null;
  team: null;
  assignee: null;
  creator: null;
  attachments_count: number;
  created_at: string;
  updated_at: string;
}

export interface CreateTasksFromSummaryResponse {
  tasks_count: number;
  tasks: CreatedTask[];
}


export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}



// Meeting Notes
export interface MeetingNote {
  id: number;
  content: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateNotePayload {
  content: string;
}

export interface UpdateNotePayload {
  content: string;
}

// Meeting Comments (Transcripts)

export type MeetingComment = {
  id: number;
  meeting_id: number;
  parent_id: number | null;
  body: string;
  is_edited: boolean;

  author: {
    id: number;
    name: string;
    avatar_url: string;
    job_title: string;
  };

  can_edit: boolean;
  can_delete: boolean;
  replies_count: number;
  replies: MeetingComment[];
  created_at: string;
  updated_at: string;
};

export type MeetingCommentsResponse = {
  success: boolean;
  message: string;
  data: {
    data: MeetingComment[];
    links: {
      first: string | null;
      last: string | null;
      prev: string | null;
      next: string | null;
    };
    meta: {
      current_page: number;
      last_page: number;
      total: number;
      per_page: number;
    };
  };
};


export interface CreateCommentPayload {
  body: string;
  parent_id?: number;
}

export interface UpdateCommentPayload {
  body: string;
}