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
import { useProjects } from "@/features/projects/hooks/use-project"
import { useDebounce } from "@/hooks/use-debounce"

export default function ProjectsPage() {

 
  const [search, setSearch] = useState("")
const debouncedSearch = useDebounce(search)


 const { data, isLoading, error } = useProjects({
    search: debouncedSearch || undefined,
  })
console.log({ data, isLoading, error })

const projects = data?.projects ?? []
  


  return (
    <div className="flex flex-col gap-6 p-6 ">
      
      <div className="flex items-center justify-between">
        <h1 className="text-h4 font-semibold">All Projects</h1>
       
        <AddProjectDialog/>
      </div>

      <div className="flex items-center justify-between gap-4">
        <SearchInput  />

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

      
     {isLoading && <p className="text-small text-secondary-gray-300">Loading...</p>}
{error && <p className="text-small text-support-danger">Something went wrong</p>}
{!isLoading && !error && <ProjectsTable projects={projects} />}
    </div>
  )
}