
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface TasksReport {
  summary: {
    total_tasks: number;
    completed_tasks: number;
    in_progress_tasks: number;
    in_review_tasks: number;
    pending_tasks: number;
    overdue_tasks: number;
    completion_rate: number;
    on_time_completion_rate: number;
  };
  by_priority: {
    Low: number;
    Medium: number;
    High: number;
    Critical: number;
  };
  by_status: {
    Pending: number;
    "In Progress": number;
    "In Review": number;
    Completed: number;
  };
}

export interface Project {
  id: number;
  name: string;
  status: string;
  priority: string;
  progress_percentage: number;
  start_date: string;
  deadline: string;
  is_delayed: boolean;
  teams_count: number;
  tasks_count: number;
  completed_tasks_count: number;
}

export interface ProjectsReport {
  summary: {
    total_projects: number;
    active_projects: number;
    delayed_projects: number;
    completed_projects: number;
    on_hold_projects: number;
    average_completion_rate: number;
  };
  projects: Project[];
}

export interface Team {
  team_id: number;
  team_name: string;
  description: string;
  members_count: number;
  active_projects_count: number;
  total_tasks: number;
  completed_tasks: number;
  pending_tasks: number;
  completion_rate: number;
  workload_share_percentage: number;
}

export interface TeamsReport {
  summary: {
    total_teams: number;
    total_members: number;
    total_assigned_tasks: number;
  };
  teams: Team[];
}

export interface UserReport {
  user: {
    id: number;
    name: string;
    email: string;
    job_title: string;
    years_of_experience: number;
    roles: string[];
  };
  tasks: {
    total_assigned: number;
    completed: number;
    in_progress: number;
    pending: number;
    overdue: number;
    completion_rate: number;
    on_time_rate: number;
  };
  meetings: {
    total_invited: number;
    attended: number;
    attendance_rate: number;
  };
  files: {
    uploaded_count: number;
    total_size_bytes: number;
    formatted_size: string;
  };
  productivity: {
    score: number;
    performance_level: string;
  };
}
