
import { useParams } from "react-router-dom";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { ProjectHeader } from "@/features/projects/components/project-header";
import { ProjectInfoCard } from "@/features/projects/components/project-info-card";
import { ProjectOverviewChart } from "@/features/projects/components/project-overview-chart";
import { ProjectProgressCard } from "@/features/projects/components/project-progress-card";
import { TeamMembersCard } from "@/features/projects/components/team-members-card";

import {
  projectDetailsMock,
  teamMembersMock,
  overviewChartMock,
  projectProgressMock,
} from "@/features/projects/data/projects.mock";
import { KanbanBoard } from "@/features/tasks/components/kanban-board";
import { tasksMock } from "@/features/tasks/data/tasks.mock";

import { FilesTab } from "@/features/files/components/file-tabs";
import { filesMock } from "@/features/files/data/files.mock";


function ProjectDetailsPage() {
  const { projectId } = useParams();

  const project = projectDetailsMock;

  if (Number(projectId) !== project.id) {
    return <div className="p-6">Project not found</div>;
  }

  return (
    <div className="flex flex-col gap-6 bg-secondary-gray-50/40 p-6">

      <ProjectHeader project={project} />

      <Tabs  className="w-full">

        
        <TabsList variant="line" className=" justify-start gap-8 ">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
        </TabsList>

      
        <TabsContent value="overview" className="mt-6">
          <div className="flex flex-col gap-6">
            <div className="rounded-base border bg-white p-6">
              <h6 className="mb-3  text-h6 font-semibold">
                Project Description
              </h6>
              <p className="text-small text-secondary-gray-300">
                {project.description}
              </p>
            </div>

            <ProjectInfoCard project={project} />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <ProjectOverviewChart data={overviewChartMock} />
              <ProjectProgressCard progress={projectProgressMock} />
            </div>

            <TeamMembersCard members={teamMembersMock} />
          </div>
        </TabsContent>

        
        <TabsContent value="tasks" className="mt-6">
          <KanbanBoard tasks={tasksMock} />
        </TabsContent>

        <TabsContent value="teams" className="mt-6">
           <TeamMembersCard members={teamMembersMock} />
        </TabsContent>

        <TabsContent value="files" className="mt-6">
           <FilesTab files={filesMock} />
        </TabsContent>

      </Tabs>
    </div>
  );
}

export default ProjectDetailsPage;
