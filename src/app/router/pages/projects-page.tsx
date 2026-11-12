import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProjectsTable } from "@/features/projects/components/projects-table"
import SearchInput from "@/components/common/SearchInput"
import { AddProjectDialog } from "@/features/projects/components/add-project-dialog"
import { DeleteProjectDialog } from "@/features/projects/components/delete-project-dialog"
import { useProjects } from "@/features/projects/hooks/use-project"
import { useDebounce } from "@/hooks/use-debounce"
import { ProjectsLoading } from "@/components/skeleton/loading"
import type { Project } from "@/features/projects/types/project.types"
import { EditProjectDialog } from "@/features/projects/components/edit-form-dialog"
import { hasPermission } from "@/features/auth/constants/permissions"
import { EmptyState } from "@/components/common/empty-state"

export default function ProjectsPage() {
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search)

  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [deletingProject, setDeletingProject] = useState<Project | null>(null)

  const { data, isLoading, isError } = useProjects({
    search: debouncedSearch || undefined,
  })

  const projects = data?.projects ?? []

const user = JSON.parse(localStorage.getItem("user") || "null");
const role = user?.roles?.[0];

const canCreateProject = hasPermission(role, "projects.create");
const canEditProject = hasPermission(role, "projects.update");
const canDeleteProject = hasPermission(role, "projects.delete");

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-h4 font-semibold">All Projects</h1>
        {canCreateProject && <AddProjectDialog />}
      </div>

      <div className="flex items-center justify-between gap-4">
        <SearchInput   placeholder="Search..."
  width="w-1/2"
  style="bg-white pl-10"
  iconStyle="left-3 text-gray-400"
  paramKey="search" />

        <div className="flex gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-36 border-black text-black">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="mine">My Projects</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="newest">
            <SelectTrigger className="w-32 border-black">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading && <ProjectsLoading />}
      {isError && (
        <p className="text-small text-support-danger">Something went wrong</p>
      )}

      
{!isLoading && !isError && (
  projects.length === 0 ? (
    <EmptyState
      title="No Projects Yet"
      description="You are not assigned to any projects yet. Your projects will appear here once you are added to a team."
    />
  ) : (
    <ProjectsTable
      projects={projects}
      onEdit={setEditingProject}
      onDelete={setDeletingProject}
      canEdit={canEditProject}
  canDelete={canDeleteProject}
    />
  )
)}

     
      <EditProjectDialog
        project={editingProject}
        onOpenChange={(open) => !open && setEditingProject(null)}
      />

      <DeleteProjectDialog
        project={deletingProject}
        onOpenChange={(open) => !open && setDeletingProject(null)}
      />
    </div>
  )
}