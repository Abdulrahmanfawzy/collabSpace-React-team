import { cn } from "@/lib/utils"
import type { Priority } from "@/types/common"
import type { ProjectStatus } from "../types/project.types"

const statusStyles: Record<ProjectStatus, string> = {
  Pending: "text-secondary-gray-300",
  "In Progress": "text-primary-blue-500",
  "On Hold": "text-support-warning",
  Completed: "text-support-success",
  Cancelled: "text-support-danger",
}

const priorityStyles: Record<Priority, string> = {
  Low: "text-support-success",
  Medium: "text-support-warning",
  High: "text-support-danger",
  Critical: "text-support-danger font-semibold",
}

export function StatusText({ status }: { status: ProjectStatus }) {
  return <span className={cn("text-small", statusStyles[status])}>{status}</span>
}

export function PriorityText({ priority }: { priority: Priority }) {
  return <span className={cn("text-small", priorityStyles[priority])}>{priority}</span>
}