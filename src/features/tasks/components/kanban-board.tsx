import { TaskColumn } from "./task-column"
import type { Task, TaskStatus } from "../types/task.types"

const columns: { status: TaskStatus; title: string }[] = [
  { status: "todo", title: "To-do" },
  { status: "in-progress", title: "In Progress" },
  { status: "in-review", title: "In Review" },
  { status: "completed", title: "Completed Tasks" },
]

interface KanbanBoardProps {
  tasks: Task[]
}

export function KanbanBoard({ tasks }: KanbanBoardProps) {
  return (
    <div className=" block lg:flex items-start gap-4 overflow-x-auto pb-4 ">
      {columns.map(({ status, title }) => (
        <TaskColumn
          key={status}
          title={title}
          status={status}
          tasks={tasks.filter((task) => task.status === status)}
        />
      ))}
    </div>
  )
}