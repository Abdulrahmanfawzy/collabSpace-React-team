import type { ApiResponse } from "@/types/api"
import type { Priority } from "@/types/common"

/* ---------- Query Params ---------- */

export interface GetTasksParams {
  project_id?: number
  status?: TaskApiStatus
  priority?: Priority
  assigned_to?: number
  due_date?: string
  overdue?: 0 | 1
  page?: number
  per_page?: number
}

/* ---------- API Status ---------- */

export type TaskApiStatus =
  | "Pending"
  | "In Progress"
  | "In Review"
  | "Completed"

/* ---------- Nested Objects ---------- */

export interface TaskProjectResponse {
  id: number
  name: string
}

export interface TaskTeamResponse {
  id: number
  name: string
}

export interface TaskAssigneeResponse {
  id: number
  name: string
  email: string
  avatar_url: string | null
  job_title: string | null
}

export interface TaskCreatorResponse {
  id: number
  name: string
  email: string
}

/* ---------- Task Item ---------- */

export interface TaskListItemResponse {
  id: number
  name: string
  description: string | null
  priority: Priority
  status: TaskApiStatus
  due_date: string | null
  completed_at: string | null
  hours_spent: number
  project_id: number
  team_id: number | null
  assigned_to: number | null
  created_by: number

  project: TaskProjectResponse
  team: TaskTeamResponse | null
  assignee: TaskAssigneeResponse | null
  creator: TaskCreatorResponse

  attachments_count: number
  created_at: string
  updated_at: string
}

/* ---------- List Tasks Response ---------- */

export interface TasksListData {
   data: TaskListItemResponse[]
  links: TasksPaginationLinks
  meta: TasksPaginationMeta
}





export interface PaginationLink {
  url: string | null
  label: string
  page?: number | null
  active: boolean
}

export interface TasksPaginationLinks {
  first: string
  last: string
  prev: string | null
  next: string | null
}

export interface TasksPaginationMeta {
  current_page: number
  from: number | null
  last_page: number
  links: PaginationLink[]
  path: string
  per_page: number
  to: number | null
  total: number
}

export type TasksListResponse = ApiResponse<TasksListData>

export type CreateTaskRequest = {
  project_id: number
  name: string
  description?: string
  priority: "Low" | "Medium" | "High" | "Critical"
  status?: "Pending" | "In Progress" | "In Review" | "Completed"
  assigned_to?: number
  due_date?: string
}


export interface TaskDetailsItem {
  id: number
  name: string
  description: string | null
  priority: "Low" | "Medium" | "High" | "Critical"
  status: "Pending" | "In Progress" | "In Review" | "Completed"
  due_date: string | null
  completed_at: string | null
  hours_spent: number
  project_id: number
  team_id: number | null
  assigned_to: number | null
  created_by: number

  project: {
    id: number
    name: string
  }

  team: {
    id: number
    name: string
  } | null

  assignee: {
    id: number
    name: string
    email: string
    avatar_url: string | null
    job_title: string | null
  } | null

  creator: {
    id: number
    name: string
    email: string
  }

  attachments_count: number
  created_at: string
  updated_at: string
}

export interface TaskDetailsResponse {
  success: boolean
  message: string
  data: TaskDetailsItem
}


export interface UpdateTaskRequest {
  name?: string
  description?: string
  priority?: "Low" | "Medium" | "High" | "Critical"
  status?: "Pending" | "In Progress" | "In Review" | "Completed"
  due_date?: string | null
  assigned_to?: number | null
  team_id?: number | null
}


export interface UpdateTaskStatusRequest {
  status: "Pending" | "In Progress" | "In Review" | "Completed"
}


export interface AssignTaskRequest {
  assigned_to: number
  team_id: number
}



export interface TeamMember {
  id: number
  name: string
  email: string
  job_title: string | null
  avatar_url: string | null
  role_in_team: string
  is_leader: boolean
  joined_at: string
}

export interface Team {
  id: number
  name: string
  description: string
  created_by: number
  creator: {
    id: number
    name: string
    email: string
  }
  members_count: number
  active_projects_count: number
  members: TeamMember[]
  created_at: string
  updated_at: string
}

export interface GetTeamsResponse {
  success: boolean
  message: string
  data: {
    data: Team[]
    meta: {
      current_page: number
      last_page: number
      per_page: number
      total: number
    }
  }
}

export interface GetTeamsParams {
  page?: number
  per_page?: number
}


