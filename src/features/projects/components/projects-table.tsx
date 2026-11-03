import { Briefcase, FileText } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AvatarGroup } from "@/components/common/avatar-group"
import { PriorityText, StatusText } from "./project-status"
import type { Project, ProjectColor } from "../types/project.types"


const iconStyles: Record<ProjectColor, string> = {
  purple: "bg-support-purple/10 text-support-purple",
  teal: "bg-support-success/10 text-support-success",
}

interface ProjectsTableProps {
  projects: Project[]
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  return (
    <Table className="border-separate border-spacing-y-2">
      <TableHeader>
        <TableRow className="border-0 hover:bg-transparent [&>th]:border-b">
          <TableHead>Project Name</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>Deadline</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Files</TableHead>
          <TableHead>Teams</TableHead>
          <TableHead>Priority</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {projects.map((project) => (
          <TableRow
            key={project.id}
            className="border-0 [&>td]:bg-white [&>td]:py-3 [&>td:first-child]:pl-4 "
          >
            <TableCell>
              <span className="flex items-center gap-2 font-medium">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full ${iconStyles[project.color]}`}
                >
                  <Briefcase size={16}  />
                </span>
                {project.name}
              </span>
            </TableCell>
            <TableCell>{project.startDate}</TableCell>
            <TableCell>{project.deadline}</TableCell>
            <TableCell>
              <StatusText status={project.status} />
            </TableCell>
            <TableCell>
              <span className="flex items-center gap-1 text-secondary-gray-300">
                <FileText size={14} />
                {project.filesCount} Files
              </span>
            </TableCell>
            <TableCell>
              <AvatarGroup members={project.teams} />
            </TableCell>
            <TableCell>
              <PriorityText priority={project.priority} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}