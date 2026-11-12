import type { Member, Priority } from "@/types/common"

export type ProjectColor = "purple" | "teal";



export const PROJECT_STATUSES = [
  "Planning",
  "In Progress",
  "On Hold",
  "Completed",
  "Cancelled",
] as const
export type ProjectStatus = (typeof PROJECT_STATUSES)[number]
export interface ProjectTeamSummary {
  id: number
  name: string
}

export interface Project {
  id: number
  name: string
  color: ProjectColor
   description: string     
  startDate: string
  deadline: string
  status: ProjectStatus
  priority: Priority
  filesCount: number
  teams: ProjectTeamSummary[]
}


export interface ProjectDetails extends Project {
  progress: number
  totalTasks: number
}

export interface TeamMember extends Member {
  role?: string
  isLeader?: boolean
}



export interface ChartPoint {
  month: string
  value: number
}

export interface ProjectProgress {
  percent: number
  pending: number
  inProgress: number
  completed: number
  total: number
}

export interface ProjectOverview {
  project: ProjectDetails
  progress: ProjectProgress
  members: TeamMember[]
}