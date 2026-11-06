import type { Member, Priority } from "@/types/common";

export type TaskStatus = "todo" | "in-progress" | "in-review" | "completed";

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
}