
import { useParams } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";

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

function ProjectOverviewPage() {
  const { projectId } = useParams();

  const project = projectDetailsMock;

  if (Number(projectId) !== project.id) {
    return <div className="p-6">Project not found</div>;
  }

  return (
    // <div className="flex flex-col gap-6 bg-secondary-gray-50/40 p-6">
    //   <ProjectHeader project={project} />

    //   <Card>
    //     <CardContent className="p-6">
    //       <h2 className="mb-3 text-small font-semibold">Project Description</h2>
    //       <p className="text-small text-secondary-gray-300">
    //         {project.description}
    //       </p>
    //     </CardContent>
    //   </Card>

    //   <ProjectInfoCard project={project} />

    //   <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
    //     <ProjectOverviewChart data={overviewChartMock} />

    //     <ProjectProgressCard progress={projectProgressMock} />
    //   </div>

    //   <TeamMembersCard members={teamMembersMock} />
    // </div>
   
   <>
   <div className=" flex flex-row bg-secondary-gray-50/40 p-6 min-h-screen">
         <ProjectHeader project={project} />

     <div className="grid grid-cols-1 md:grid-cols-2  gap-5">
        {/* ds / chart detals */}
        <div>
         <Card>
        <CardContent className="p-6">
          <h2 className="mb-3  font-semibold">Project Description</h2>
          <p className="text-small text-secondary-gray-300">
            {project.description}
          </p>
        </CardContent>
       </Card>

        <ProjectOverviewChart data={overviewChartMock} />

        <ProjectInfoCard project={project} />
        </div>




{/* prog / team */}
        <div>
             <ProjectProgressCard progress={projectProgressMock} />

             <TeamMembersCard members={teamMembersMock} />
        </div>

        {/*  */}
    </div>
    
   </div>
    
    </>
  );
}

export default ProjectOverviewPage;
