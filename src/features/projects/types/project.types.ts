import type { Member, Priority } from "@/types/common"

export type ProjectColor = "purple" | "teal";

// export type ProjectStatus =
//   | "Pending"
//   | "In Progress"
//   | "On Hold"
//   | "Completed"
//   | "Cancelled"

export const PROJECT_STATUSES = [
  "Pending",
  "In Progress",
  "On Hold",
  "Completed",
  "Cancelled",
] as const
export type ProjectStatus = (typeof PROJECT_STATUSES)[number]
export interface Project {
  id: number
  name: string
  color: ProjectColor
  startDate: string
  deadline: string
  status: ProjectStatus
  priority: Priority
  filesCount: number
  teams: Member[]
}

export interface ProjectDetails extends Project {
  description: string
  progress: number
  projectType: string
  totalTasks: number
}

export interface TeamMember extends Member {
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