import type { Member, Priority } from "@/types/common";


export interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
  progress?: number; 
  reviewer?: Member; 
  members: Member[];
  comments: number;
  date: string;
  projectId?:number;
}
export const TASK_STATUSES = ["todo", "in-progress", "in-review", "completed"] as const
export type TaskStatus = (typeof TASK_STATUSES)[number]

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "To-do",
  "in-progress": "In Progress",
  "in-review": "In Review",
  completed: "Completed",
}