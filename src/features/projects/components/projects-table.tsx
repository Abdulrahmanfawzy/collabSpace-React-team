


import { Briefcase, FileText } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { DataTable } from "@/components/common/data-table"
import type { Column } from "@/components/common/data-table"
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
  const navigate = useNavigate()

  const columns: Column<Project>[] = [
    {
      header: "Project Name",
      cell: (p) => (
        <span className="flex items-center gap-2 font-medium">
          <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${iconStyles[p.color]}`}>
            <Briefcase size={16} />
          </span>
          {p.name}
        </span>
      ),
    },
    { header: "Start Date", cell: (p) => p.startDate },
    { header: "Deadline", cell: (p) => p.deadline },
    { header: "Status", cell: (p) => <StatusText status={p.status} /> },
    {
      header: "Files",
      cell: (p) => (
        <span className="flex items-center gap-1 text-secondary-gray-300">
          <FileText size={14} />
          {p.filesCount} Files
        </span>
      ),
    },
    {
  header: "Teams",
  cell: (p) => (
    <span className="block max-w-48 truncate text-secondary-gray-300">
      {p.teams.length ? p.teams.map((t) => t.name).join(", ") : "-"}
    </span>
  ),
},
    { header: "Priority", cell: (p) => <PriorityText priority={p.priority} /> },
  ]

  return (
    <DataTable
      columns={columns}
      data={projects}
      getRowKey={(p) => p.id}
      onRowClick={(p) => navigate(`/projects/${p.id}`)}
    />
  )
}