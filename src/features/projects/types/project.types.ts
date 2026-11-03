import type { Member, Priority } from "@/types/common"

export type ProjectColor = "purple" | "teal";

export type ProjectStatus =
  | "Pending"
  | "In Progress"
  | "On Hold"
  | "Completed"
  | "Cancelled"

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