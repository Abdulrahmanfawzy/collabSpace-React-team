
import { useParams } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectHeader } from "@/features/projects/components/project-header"
import { ProjectInfoCard } from "@/features/projects/components/project-info-card"
import { ProjectOverviewChart } from "@/features/projects/components/project-overview-chart"
import { ProjectProgressCard } from "@/features/projects/components/project-progress-card"
import { TeamMembersCard } from "@/features/projects/components/team-members-card"
import { overviewChartMock } from "@/features/projects/data/projects.mock"
import { KanbanBoard } from "@/features/tasks/components/kanban-board"
import { FilesTab } from "@/features/files/components/file-tabs"
import { filesMock } from "@/features/files/data/files.mock"
import { useProjectOverview } from "@/features/projects/hooks/use-project"
import { ProjectTeamsPanel } from "@/features/projects/components/project-team-panel"
import { useTasks } from "@/features/tasks/hooks/use-tasks"
import { ProjectsLoading } from "@/components/skeleton/loading"

function ProjectDetailsPage() {
  const { projectId } = useParams();
  const {
  data: tasksData,
  isLoading: tasksLoading,
  isError: tasksError,
} = useTasks({
  project_id: Number(projectId),
})
  const { data, isLoading, isError } = useProjectOverview(Number(projectId))

  if (isLoading) return <div className="p-6">Loading...</div>
  if (isError || !data) return <div className="p-6">Project not found</div>

  const { project, progress, members } = data

  return (
    <div className="flex flex-col gap-6 p-6">
      <ProjectHeader project={project} />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList variant="line" className="justify-start gap-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
            <div className="flex flex-col gap-6 lg:col-span-2">
              <div className="rounded-base border bg-white p-6">
                <h6 className="mb-3 text-small font-semibold">Description</h6>
                <p className="text-small text-secondary-gray-300">{project.description}</p>
              </div>

              <ProjectOverviewChart data={overviewChartMock} />
              <ProjectInfoCard project={project} />
            </div>

            <div className="flex flex-col gap-6">
              <ProjectProgressCard progress={progress} />
              <TeamMembersCard members={members} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="mt-6">
         {tasksLoading ? (
 <ProjectsLoading/>
) : tasksError ? (
  <p>Failed to load tasks</p>
) : (
  <KanbanBoard tasks={tasksData?.tasks ?? []} />
)}
        </TabsContent>

        <TabsContent value="teams" className="mt-6">
          <ProjectTeamsPanel projectId={project.id} />
        </TabsContent>

        <TabsContent value="files" className="mt-6">
          <FilesTab files={filesMock} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProjectDetailsPage