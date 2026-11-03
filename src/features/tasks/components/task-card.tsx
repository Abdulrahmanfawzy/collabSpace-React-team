import { Calendar, MessageSquare } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { AvatarGroup } from "@/components/common/avatar-group"
import { PriorityBadge } from "@/components/common/priority-badge"
import type { Task } from "../types/task.types"

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  const { title, description, priority, progress, reviewer, members, comments, date } = task

  return (
    <article className="flex flex-col gap-3 rounded-base border border-secondary-gray-50 bg-white p-3">
      {/* 1. العنوان + الأولوية */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-small font-semibold">{title}</h3>
        <PriorityBadge priority={priority} />
      </div>

      {/* 2. الوصف */}
      <p className="text-caption text-secondary-gray-300">{description}</p>

      {/* 3. شريط التقدم (اختياري) */}
      {progress !== undefined && (
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-caption text-secondary-gray-300">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      )}

      {/* 4. الـ Reviewer (اختياري) */}
      {reviewer && (
        <div className="flex items-center justify-between text-caption">
          <span className="flex items-center gap-2">
            <img src={reviewer.avatar} alt="" className="h-5 w-5 rounded-full object-cover" />
            {reviewer.name}
          </span>
          <span className="text-secondary-gray-300">Reviewer</span>
        </div>
      )}

      {/* 5. الصور + التعليقات + التاريخ */}
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