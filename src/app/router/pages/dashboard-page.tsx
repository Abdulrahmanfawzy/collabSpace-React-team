import StatCard from "@/features/dashboard/statCard";
import CompletionRateCard from "@/features/dashboard/completion-rate-card";
import { ClipboardClock, ClipboardList, ClipboardCheck } from "lucide-react";
import ProjectOverviewCard from "@/features/dashboard/project-overview-card";
import ActiveProjectsCard from "@/features/dashboard/active-projects-card";
import RecentFilesCard from "@/features/dashboard/recent-file-card";
import TasksCard from "@/features/dashboard/tasks-card";
import TeamsCard from "@/features/dashboard/teams-card";
import AskAICard from "@/features/dashboard/ask-card";
import UpcomingMeetingsCard from "@/features/dashboard/upcoming-meetings-card";

function Dashboard() {
  return (
    <div className="min-h-screen  bg-secondary-gray-50/40 my-10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Pending Tasks"
          value="32"
          change="+9% from last month"
          current={32}
          total={94}
          theme={{
            badgeBg: "bg-amber-50",
            iconColor: "text-amber-500",
            barColor: "bg-amber-500",
            trackColor: "bg-amber-100",
          }}
          iconSvg={<ClipboardClock size={22} strokeWidth={1.7} />}
        />
        <StatCard
          title="In progress"
          value="40"
          change="+12% from last month"
          current={40}
          total={94}
          theme={{
            badgeBg: "bg-blue-50",
            iconColor: "text-blue-500",
            barColor: "bg-blue-500",
            trackColor: "bg-blue-100",
          }}
          iconSvg={<ClipboardList size={22} strokeWidth={1.7} />}
        />
        <StatCard
          title="Completed"
          value="22"
          change="+16% from last month"
          current={22}
          total={94}
          theme={{
            badgeBg: "bg-green-50",
            iconColor: "text-green-500",
            barColor: "bg-green-500",
            trackColor: "bg-green-100",
          }}
          iconSvg={<ClipboardCheck size={22} strokeWidth={1.7} />}
        />
        <CompletionRateCard value={33} change="+22% from last month" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="md:col-span-2 xl:col-span-2">
          <ProjectOverviewCard />
        </div>

        <ActiveProjectsCard />
        <RecentFilesCard />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <TasksCard />
        <TeamsCard />
        <UpcomingMeetingsCard />
        <AskAICard />
      </div>
    </div>
  );
}

export default Dashboard;
