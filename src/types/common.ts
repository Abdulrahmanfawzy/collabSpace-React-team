export type Priorityy = "Low" | "Medium" | "High" | "Critical";

export interface Member {
  id: number;
  name: string;
  avatar: string;
}


export const PRIORITIES = ["Low", "Medium", "High", "Critical"] as const
export type Priority = (typeof PRIORITIES)[number]