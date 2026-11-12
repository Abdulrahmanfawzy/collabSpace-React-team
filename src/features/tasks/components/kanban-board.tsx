
import { DndContext, closestCenter } from "@dnd-kit/core"
import type { DragEndEvent } from "@dnd-kit/core"
import { toast } from "sonner"
import { TaskColumn } from "./task-column"
import type { Task, TaskStatus } from "../types/task.types"
import { useUpdateTaskStatus } from "../hooks/use-update-task-status"

const columns: { status: TaskStatus; title: string }[] = [
  { status: "todo", title: "To-do" },
  { status: "in-progress", title: "In Progress" },
  { status: "in-review", title: "In Review" },
  { status: "completed", title: "Completed Tasks" },
]

const apiStatusMap: Record<
  TaskStatus,
  "Pending" | "In Progress" | "In Review" | "Completed"
> = {
  todo: "Pending",
  "in-progress": "In Progress",
  "in-review": "In Review",
  completed: "Completed",
}

interface KanbanBoardProps {
  tasks: Task[]
}

export function KanbanBoard({ tasks }: KanbanBoardProps) {
  const updateTaskStatus = useUpdateTaskStatus()

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over) return

    const taskId = Number(active.id)
    const newStatus = over.id as TaskStatus

    const task = tasks.find((item) => item.id === taskId)

    if (!task || task.status === newStatus) return

    const isValidStatus = columns.some(
      (column) => column.status === newStatus
    )

    if (!isValidStatus) return

    updateTaskStatus.mutate(
      {
        taskId,
        status: apiStatusMap[newStatus],
      },
      {
        onSuccess: function () {
          toast.success("Task status updated successfully")
        },
        onError: function () {
          toast.error("Failed to update task status")
        },
      }
    )
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="block items-start gap-4 overflow-x-auto pb-4 lg:flex">
        {columns.map(({ status, title }) => (
          <TaskColumn
            key={status}
            title={title}
            status={status}
            tasks={tasks.filter((task) => task.status === status)}
          />
        ))}
      </div>
    </DndContext>
  )
}
