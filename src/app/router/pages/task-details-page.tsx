
import { useNavigate, useParams } from "react-router-dom"
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  FolderKanban,
  Paperclip,
  UserRound,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { PriorityBadge } from "@/components/common/priority-badge"
import { useTaskDetails } from "@/features/tasks/hooks/use-task-details"
import { EditTaskDialog } from "@/features/tasks/components/edit-task-dialog"
import { AssignTaskDialog } from "@/features/tasks/components/assign-task-dialog"
import { DeleteTaskDialog } from "@/features/tasks/components/delete-task-dialog"

const statusStyles: Record<string, string> = {
  Pending: "bg-secondary-gray-100 text-secondary-gray-700",
  "In Progress": "bg-primary-blue-50 text-primary-blue-500",
  "In Review": "bg-support-pink/10 text-support-pink",
  Completed: "bg-support-success/10 text-support-success",
}

function formatDate(date: string | null) {
  if (!date) return "Not set"

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export default function TaskDetailsPage() {
  const { taskId } = useParams()
  const navigate = useNavigate()

  const {
    data: task,
    isLoading,
    isError,
  } = useTaskDetails(Number(taskId))

  if (isLoading) {
    return <div className="py-10 text-center">Loading task details...</div>
  }

  if (isError || !task) {
    return (
      <div className="flex flex-col items-center gap-4 py-16">
        <p className="text-secondary-gray-500">
          Failed to load task details.
        </p>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen space-y-6 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-secondary-gray-400">
        <button
          onClick={() => navigate("/tasks")}
          className="hover:text-primary-blue-500"
        >
          Tasks
        </button>
        <span>/</span>
        <span className="text-secondary-gray-700">Task Details</span>
      </div>

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
            className="mt-1 shrink-0 rounded-xl"
          >
            <ArrowLeft size={18} />
          </Button>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold text-secondary-gray-900">
                {task.name}
              </h1>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  statusStyles[task.status]
                }`}
              >
                {task.status}
              </span>
            </div>

            <p className="mt-2 text-sm text-secondary-gray-400">
              Task #{task.id} · Created {formatDate(task.created_at)}
            </p>
          </div>
        </div>

<div className="flex flex-wrap items-center gap-3">
  <PriorityBadge priority={task.priority} />
  <AssignTaskDialog task={task} />
  <EditTaskDialog task={task} />
  <DeleteTaskDialog
    taskId={task.id}
    taskName={task.name}
  />
</div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-5 lg:col-span-2">
          {/* Description */}
          <section className="rounded-base border border-secondary-gray-50 bg-white p-5">
            <h2 className="mb-4 text-base font-semibold text-secondary-gray-900">
              Description
            </h2>

            <p className="text-sm leading-7 text-secondary-gray-500">
              {task.description || "No description provided."}
            </p>
          </section>

          {/* Task Information */}
          <section className="rounded-base border border-secondary-gray-50 bg-white p-5">
            <h2 className="mb-5 text-base font-semibold text-secondary-gray-900">
              Task Information
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              <InfoItem
                icon={<FolderKanban size={18} />}
                label="Project"
                value={task.project.name}
              />

              <InfoItem
                icon={<Users size={18} />}
                label="Team"
                value={task.team?.name ?? "Not assigned"}
              />

              <InfoItem
                icon={<UserRound size={18} />}
                label="Assigned To"
                value={task.assignee?.name ?? "Not assigned"}
              />

              <InfoItem
                icon={<UserRound size={18} />}
                label="Created By"
                value={task.creator.name}
              />
            </div>
          </section>

          {/* Activity Information */}
          <section className="rounded-base border border-secondary-gray-50 bg-white p-5">
            <h2 className="mb-5 text-base font-semibold text-secondary-gray-900">
              Additional Information
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              <InfoItem
                icon={<Clock3 size={18} />}
                label="Hours Spent"
                value={`${task.hours_spent} hours`}
              />

              <InfoItem
                icon={<Paperclip size={18} />}
                label="Attachments"
                value={String(task.attachments_count)}
              />

              <InfoItem
                icon={<CalendarDays size={18} />}
                label="Due Date"
                value={formatDate(task.due_date)}
              />

              <InfoItem
                icon={<CalendarDays size={18} />}
                label="Completed At"
                value={formatDate(task.completed_at)}
              />
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          <section className="rounded-base border border-secondary-gray-50 bg-white p-5">
            <h2 className="mb-5 text-base font-semibold text-secondary-gray-900">
              Task Overview
            </h2>

            <div className="space-y-5">
              <div>
                <p className="mb-2 text-xs text-secondary-gray-400">
                  Priority
                </p>
                <PriorityBadge priority={task.priority} />
              </div>

              <div>
                <p className="mb-2 text-xs text-secondary-gray-400">
                  Status
                </p>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                    statusStyles[task.status]
                  }`}
                >
                  {task.status}
                </span>
              </div>

              <div className="border-t border-secondary-gray-50 pt-4">
                <p className="text-xs text-secondary-gray-400">
                  Last Updated
                </p>
                <p className="mt-1 text-sm font-medium text-secondary-gray-700">
                  {formatDate(task.updated_at)}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-base border border-secondary-gray-50 bg-white p-5">
            <h2 className="mb-4 text-base font-semibold text-secondary-gray-900">
              Project
            </h2>

            <div className="flex items-center gap-3 rounded-xl bg-primary-blue-50/50 p-3">
              <div className="rounded-lg bg-white p-2 text-primary-blue-500">
                <FolderKanban size={20} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-secondary-gray-800">
                  {task.project.name}
                </p>
                <p className="text-xs text-secondary-gray-400">
                  Project #{task.project.id}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              className="mt-4 w-full rounded-xl"
              onClick={() => navigate(`/projects/${task.project_id}`)}
            >
              View Project
            </Button>
          </section>
        </aside>
      </div>
    </div>
  )
}

interface InfoItemProps {
  icon: React.ReactNode
  label: string
  value: string
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-lg bg-primary-blue-50 p-2 text-primary-blue-500">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-secondary-gray-400">{label}</p>
        <p className="mt-1  text-sm font-medium text-secondary-gray-800">
          {value}
        </p>
      </div>
    </div>
  )
}
