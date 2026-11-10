import type { ApiResponse, PaginationMeta } from "@/types/api"
import type { Priority } from "@/types/common"
import type { ProjectStatus } from "./project.types"

/* ---------- Query params ---------- */
export interface GetProjectsParams {
  page?: number
  per_page?: number
  status?: ProjectStatus
  priority?: Priority
  search?: string
  sort?: string
}

/* ---------- List Projects ---------- */
export interface ProjectTeamSummaryResponse {
  id: number
  name: string
}

export interface ProjectListItemResponse {
  id: number
  name: string
  description: string | null
  start_date: string | null
  deadline: string | null
  status: ProjectStatus
  priority: Priority
  progress_percentage: number
  files_count: number
  teams: ProjectTeamSummaryResponse[]
  created_at: string
}

// meta 
export type ProjectsListResponse = ApiResponse<ProjectListItemResponse[]> & {
  meta?: PaginationMeta
}

/* ---------- Project Overview ---------- */
export interface ProjectOverviewData {
  id: number
  name: string
  description: string | null
  status: ProjectStatus
  priority: Priority
  progress_percentage: number
  due_date_indicator: {
    start_date: string | null
    deadline: string | null
    total_days: number
    days_remaining: number
    is_overdue: boolean
  }
  tasks_statistics: {
    total: number
    pending: number
    in_progress: number
    in_review: number
    completed: number
    completion_rate: number
  }
  counts: {
    files: number
    meetings: number
    messages: number
    teams: number
    direct_members: number
  }
  teams: {
    id: number
    name: string
    description: string | null
    members_count: number
    active_projects_count: number
  }[]
  direct_members: {
    id: number
    name: string
    email: string
    avatar_url: string | null
    job_title: string | null
    role: string
  }[]
  created_by: number
  creator: { id: number; name: string; email: string }
  created_at: string
  updated_at: string
}

export type ProjectOverviewResponse = ApiResponse<ProjectOverviewData>

/* ---------- Project Teams ---------- */
export interface ProjectTeamMemberResponse {
  id: number
  name: string
  avatar_url: string | null
  role_in_team: string
  is_leader: boolean
  tasks_completed: number
  tasks_total: number
  tasks_ratio: string
  progress_percentage: number
}

export interface ProjectTeamResponse {
  id: number
  name: string
  completion_percentage: number
  total_tasks: number
  completed_tasks: number
  members: ProjectTeamMemberResponse[]
}

export type ProjectTeamsResponse = ApiResponse<ProjectTeamResponse[]>

/* ---------- Payloads ---------- */
export interface CreateProjectPayload {
  name: string
  description?: string
  start_date?: string
  deadline?: string
  priority: Priority
  status?: ProjectStatus
  teams?: number[]
  members?: { user_id: number; role: string }[]
}

export type UpdateProjectPayload = Partial<CreateProjectPayload>

export interface AssignTeamsPayload {
  team_ids: number[]
}