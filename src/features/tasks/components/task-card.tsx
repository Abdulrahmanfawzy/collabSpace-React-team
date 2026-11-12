
import { Calendar, MessageSquare, GripVertical } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useDraggable } from "@dnd-kit/core"
import { Progress } from "@/components/ui/progress"
import { AvatarGroup } from "@/components/common/avatar-group"
import { PriorityBadge } from "@/components/common/priority-badge"
import type { Task } from "../types/task.types"
import { DeleteTaskDialog } from "./delete-task-dialog"


interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  const navigate = useNavigate()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: task.id,
  })

  const {
    title,
    description,
    priority,
    progress,
    reviewer,
    members,
    comments,
    date,
  } = task

  function handleClick() {
    navigate(`/tasks/${task.id}`)
  }

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <article
      ref={setNodeRef}
      style={style}
      onClick={handleClick}
      onKeyDown={(event) => {
        if (event.key === "Enter") handleClick()
      }}
      role="button"
      tabIndex={0}
      className={`flex cursor-pointer flex-col gap-3 rounded-base border border-secondary-gray-50 bg-white p-3 transition hover:border-primary-blue-500 ${
        isDragging ? "z-10 opacity-40 shadow-lg" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-small font-semibold">{title}</h3>

        <div className="flex items-center gap-2">
          <button
            type="button"
            {...attributes}
            {...listeners}
            onClick={(event) => event.stopPropagation()}
            aria-label="Drag task"
            className="cursor-grab touch-none text-secondary-gray-300 active:cursor-grabbing"
          >
            <GripVertical size={16} />
          </button>

          <PriorityBadge priority={priority} />


  <DeleteTaskDialog
    taskId={task.id}
    taskName={task.title}
  />
        </div>
      </div>

      <p className="text-caption text-secondary-gray-300">
        {description}
      </p>

      {progress !== undefined && (
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-caption text-secondary-gray-300">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>

          <Progress value={progress} className="h-1.5" />
        </div>
      )}

      {reviewer && (
        <div className="flex items-center justify-between text-caption">
          <span className="flex items-center gap-2">
            <img
              src={reviewer.avatar}
              alt=""
              className="h-5 w-5 rounded-full object-cover"
            />
            {reviewer.name}
          </span>

          <span className="text-secondary-gray-300">Reviewer</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <AvatarGroup members={members} />

        <div className="flex items-center gap-3 text-caption text-secondary-gray-300">
          <span className="flex items-center gap-1">
            {comments} <MessageSquare size={14} />
          </span>

          <span className="flex items-center gap-1">
            {date} <Calendar size={14} />
          </span>
        </div>
      </div>
    </article>
  )
}
