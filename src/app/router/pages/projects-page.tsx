import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProjectsTable } from "@/features/projects/components/projects-table"
import { projectsMock } from "@/features/projects/data/projects.mock"

export default function ProjectsPage() {
  const [search, setSearch] = useState("")

  const filteredProjects = projectsMock.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-6 p-6  bg-secondary-gray-50/40">
      {/* العنوان + زرار Add */}
      <div className="flex items-center justify-between">
        <h1 className="text-h1 font-semibold">All Projects</h1>
        <Button className="bg-primary-blue-500 hover:bg-primary-blue-600 rounded-2xl">
          Add Project <Plus size={14} />
        </Button>
      </div>

      {/* البحث + الفلاتر */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-xs">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-gray-300"
          />
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="mine">My Projects</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="newest">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* الجدول */}
      <ProjectsTable projects={filteredProjects} />
    </div>
  )
}