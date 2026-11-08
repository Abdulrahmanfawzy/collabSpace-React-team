// import { Briefcase, FileText } from "lucide-react"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import { AvatarGroup } from "@/components/common/avatar-group"
// import { PriorityText, StatusText } from "./project-status"
// import type { Project, ProjectColor } from "../types/project.types"
// import { Link } from "react-router-dom";

// const iconStyles: Record<ProjectColor, string> = {
//   purple: "bg-support-purple/10 text-support-purple",
//   teal: "bg-support-success/10 text-support-success",
// }

// interface ProjectsTableProps {
//   projects: Project[]
// }

// export function ProjectsTable({ projects }: ProjectsTableProps) {
//   return (
//     <Table className="border-separate border-spacing-y-2">
//       <TableHeader>
//         <TableRow className="border-0 hover:bg-transparent [&>th]:border-b">
//           <TableHead>Project Name</TableHead>
//           <TableHead>Start Date</TableHead>
//           <TableHead>Deadline</TableHead>
//           <TableHead>Status</TableHead>
//           <TableHead>Files</TableHead>
//           <TableHead>Teams</TableHead>
//           <TableHead>Priority</TableHead>
//         </TableRow>
//       </TableHeader>

//       <TableBody>
//         {projects.map((project) => (
//           <TableRow
//             key={project.id}
//             className="border-0 [&>td]:bg-white [&>td]:py-3 [&>td:first-child]:pl-4 "
//           >
//             <TableCell>
//               <span className="flex items-center gap-2 font-medium">
//                 <span
//                   className={`flex h-7 w-7 items-center justify-center rounded-full ${iconStyles[project.color]}`}
//                 >
//                   <Briefcase size={16}  />
//                 </span>
//               <Link
//               to={`/projects/${project.id}`}
//                 className=" cursor-pointer">
//                 {project.name}
//                 </Link>
//               </span>
//             </TableCell>
//             <TableCell>{project.startDate}</TableCell>
//             <TableCell>{project.deadline}</TableCell>
//             <TableCell>
//               <StatusText status={project.status} />
//             </TableCell>
//             <TableCell>
//               <span className="flex items-center gap-1 text-secondary-gray-300">
//                 <FileText size={14} />
//                 {project.filesCount} Files
//               </span>
//             </TableCell>
//             <TableCell>
//               <AvatarGroup members={project.teams} />
//             </TableCell>
//             <TableCell>
//               <PriorityText priority={project.priority} />
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   )
// }


import { Briefcase, FileText } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { DataTable } from "@/components/common/data-table"
import type { Column } from "@/components/common/data-table"
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
    { header: "Teams", cell: (p) => <AvatarGroup members={p.teams} /> },
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