import { useState } from "react"
import { Plus} from "lucide-react"
import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProjectsTable } from "@/features/projects/components/projects-table"
import { projectsMock } from "@/features/projects/data/projects.mock"
import SearchInput from "@/components/common/SearchInput"
import { AddProjectDialog } from "@/features/projects/components/add-project-dialog"

export default function ProjectsPage() {
  const [search, setSearch] = useState("")

  const filteredProjects = projectsMock.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-6 p-6 ">
      
      <div className="flex items-center justify-between">
        <h1 className="text-h4 font-semibold">All Projects</h1>
       
        <AddProjectDialog/>
      </div>

      <div className="flex items-center justify-between gap-4">
        <SearchInput/>

        <div className="flex gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-36 border-black text-black">
              <SelectValue />
            </SelectTrigger>
            <SelectContent >
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="mine">My Projects</SelectItem>
            </SelectContent>
          </Select>

          <Select  defaultValue="newest">
            <SelectTrigger className="w-32 border-black">
              <SelectValue />
            </SelectTrigger>
            <SelectContent >
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      
      <ProjectsTable projects={filteredProjects} />
    </div>
  )
}