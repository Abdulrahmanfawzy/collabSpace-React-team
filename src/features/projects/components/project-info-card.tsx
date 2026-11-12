import { Briefcase, Calendar, CircleAlert, CircleCheck, Clock } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ProjectDetails } from "../types/project.types"

interface InfoItemProps {
  icon: LucideIcon
  label: string
  value: string | number
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-base bg-primary-blue-50 text-primary-blue-500">
        <Icon size={18} />
      </span>
      <div className="flex flex-col">
        <span className="text-caption text-secondary-gray-300">{label}</span>
        <span className="text-small font-semibold">{value}</span>
      </div>
    </div>
  )
}

interface ProjectInfoCardProps {
  project: ProjectDetails
}

export function ProjectInfoCard({ project }: ProjectInfoCardProps) {
  return (
    <Card className="rounded-base">
      <CardHeader>
        <CardTitle className="text-h6 font-semibold">Product Details</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <InfoItem icon={Briefcase} label="Status" value={project.status}  />
        <InfoItem icon={Calendar} label="Start Date" value={project.startDate} />
        <InfoItem icon={Clock} label="Deadline" value={project.deadline} />
        <InfoItem icon={CircleAlert} label="Priority" value={project.priority} />
        <InfoItem icon={CircleCheck} label="Total Tasks" value={project.totalTasks} />
      </CardContent>
    </Card>
  )
}