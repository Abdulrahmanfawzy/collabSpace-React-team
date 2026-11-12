
import type { Task } from "../types/task.types"
import type { TaskListItemResponse } from "../types/tasks.types.api"

const statusMap = {
  Pending: "todo",
  "In Progress": "in-progress",
  "In Review": "in-review",
  Completed: "completed",
} as const

export function mapTaskListItem(t: TaskListItemResponse): Task {
  return {
    id: t.id,
    title: t.name,
    description: t.description ?? "",
    priority: t.priority,
    status: statusMap[t.status],
    members: t.assignee
      ? [
          {
            id: t.assignee.id,
            name: t.assignee.name,
            avatar: t.assignee.avatar_url ?? "",
          },
        ]
      : [],
    comments: 0,
    date: t.due_date ?? "",
    projectId: t.project_id,
  }
}
