import { KanbanBoard } from "@/features/tasks/components/kanban-board"
import { tasksMock } from "@/features/tasks/data/tasks.mock"

export default function TasksPage() {
  return (
    <div className="p-6">
      <KanbanBoard tasks={tasksMock} />
    </div>
  )
}