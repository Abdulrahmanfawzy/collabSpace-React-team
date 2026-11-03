import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { ProjectDetails } from "../types/project.types"

interface ProjectHeaderProps {
  project: ProjectDetails
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  const { name, progress, startDate, deadline } = project

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-caption text-secondary-gray-300">
          Projects &gt; <span className="text-secondary-gray-700">{name}</span>
        </p>
        <div className="flex items-center gap-3">
          <h1 className="text-h1 font-semibold">{name}</h1>
          <Badge variant="low">{progress}% Completed</Badge>
        </div>
      </div>

      <div className="flex w-64 flex-col gap-2 rounded-base border border-secondary-gray-50 bg-white p-3">
        <p className="text-caption font-medium">Due Date</p>
        <Progress value={progress} className="h-1.5" />
        <div className="flex justify-between text-caption text-secondary-gray-300">
          <span>Start Date: {startDate}</span>
          <span>Deadline: {deadline}</span>
        </div>
      </div>
    </div>
  )
}