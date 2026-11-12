
import { EllipsisVertical, Plus } from "lucide-react"
import { useDroppable } from "@dnd-kit/core"
import { Button } from "@/components/ui/button"
import { TaskCard } from "./task-card"
import type { Task, TaskStatus } from "../types/task.types"

const headerStyles: Record<TaskStatus, string> = {
  todo: "bg-secondary-gray-50/50",
  "in-progress": "bg-primary-blue-50",
  "in-review": "bg-support-pink/10",
  completed: "bg-support-success/10",
}

interface TaskColumnProps {
  title: string
  status: TaskStatus
  tasks: Task[]
}

export function TaskColumn({ title, status, tasks }: TaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  })

  return (
    <section
      ref={setNodeRef}
      className={`mb-4 flex min-w-65 flex-1 flex-col overflow-hidden rounded-base border bg-white transition-colors lg:mb-0 ${
        isOver
          ? "border-primary-blue-500 bg-primary-blue-50/20"
          : "border-secondary-gray-50"
      }`}
    >
      <header
        className={`flex items-center justify-between px-3 py-5 ${headerStyles[status]}`}
      >
        <h2 className="text-caption font-medium">{title}</h2>

        <button type="button" aria-label="Column options">
          <EllipsisVertical size={16} />
        </button>
      </header>

      <div className="flex min-h-40 flex-col gap-3 p-3">
        <Button
          variant="outline"
          className="w-full rounded-full border-dashed border-primary-blue-500 text-primary-blue-500"
        >
          Add Task <Plus size={14} />
        </Button>

        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  )
}
