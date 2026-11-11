
import type { ReactNode } from "react";

import StatCard from "./components/StatCard";
import ReportForm from "./components/ReportForm";

import {
  TaskCompletionChart,
  ProjectsProgressChart,
  WorkerActivityChart,
} from "./components/ReportsCharts";

import {
  useTasksReport,
  useProjectsReport,
  useTeamsReport,
} from "./hooks/useReports";

// Reusable component for each report section
type ReportSectionProps = {
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
  onRetry: () => void;
  children: ReactNode;
};

const ReportSection = ({
  isLoading,
  isError,
  error,
  onRetry,
  children,
}: ReportSectionProps) => {
  if (isLoading) {
    return (
      <div className="flex min-h-45 items-center justify-center rounded-2xl bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-primary-blue-500">
          Loading...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-45 flex-col items-center justify-center gap-3 rounded-2xl bg-white p-5 text-center shadow-sm">
        <p className="text-sm text-red-500">
          {error instanceof Error
            ? error.message
            : "Failed to load this report."}
        </p>

        <button
          onClick={onRetry}
          className="rounded-full bg-primary-blue-500 px-5 py-2 text-sm text-white transition hover:bg-primary-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

const ReportsPage = () => {
  const {
    data: tasks,
    isPending: tasksLoading,
    isError: tasksError,
    error: tasksErrorMessage,
    refetch: refetchTasks,
  } = useTasksReport();

  const {
    data: projects,
    isPending: projectsLoading,
    isError: projectsError,
    error: projectsErrorMessage,
    refetch: refetchProjects,
  } = useProjectsReport();

  const {
    data: teams,
    isPending: teamsLoading,
    isError: teamsError,
    error: teamsErrorMessage,
    refetch: refetchTeams,
  } = useTeamsReport();

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F5F7FA] px-1 py-4 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full min-w-0 max-w-[1600px] space-y-5">

        {/* Statistics Cards */}
        <section className="grid grid-cols-3 gap-2 sm:gap-5">

          <ReportSection
            isLoading={tasksLoading}
            isError={tasksError || !tasks}
            error={tasksErrorMessage}
            onRetry={() => {
              void refetchTasks();
            }}
          >
            <StatCard
              title="Task Completion Rate"
              value={`${tasks?.summary.completion_rate ?? 0}%`}
              description={`${tasks?.summary.completed_tasks ?? 0} completed tasks`}
            />
          </ReportSection>

          <ReportSection
            isLoading={projectsLoading}
            isError={projectsError || !projects}
            error={projectsErrorMessage}
            onRetry={() => {
              void refetchProjects();
            }}
          >
            <StatCard
              title="Projects Completion Rate"
              value={`${projects?.summary.average_completion_rate ?? 0}%`}
              description={`${projects?.summary.total_projects ?? 0} total projects`}
            />
          </ReportSection>

          <ReportSection
            isLoading={teamsLoading}
            isError={teamsError || !teams}
            error={teamsErrorMessage}
            onRetry={() => {
              void refetchTeams();
            }}
          >
            <StatCard
              title="Total Team Members"
              value={String(teams?.summary.total_members ?? 0)}
              description={`${teams?.summary.total_teams ?? 0} teams`}
            />
          </ReportSection>

        </section>

        {/* Charts and Report Form */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">

          <ReportSection
            isLoading={tasksLoading}
            isError={tasksError || !tasks}
            error={tasksErrorMessage}
            onRetry={() => {
              void refetchTasks();
            }}
          >
            <TaskCompletionChart
  data={
    tasks?.by_status ?? {
      Pending: 0,
      "In Progress": 0,
      "In Review": 0,
      Completed: 0,
    }
  }
/>
          </ReportSection>

          <ReportSection
            isLoading={projectsLoading}
            isError={projectsError || !projects}
            error={projectsErrorMessage}
            onRetry={() => {
              void refetchProjects();
            }}
          >
          <ProjectsProgressChart
  data={projects?.projects ?? []}
/>
          </ReportSection>

          <ReportSection
            isLoading={teamsLoading}
            isError={teamsError || !teams}
            error={teamsErrorMessage}
            onRetry={() => {
              void refetchTeams();
            }}
          >
         <WorkerActivityChart
  data={teams?.teams ?? []}
/>
          </ReportSection>

          <ReportForm />

        </section>
              </div>
    </main>
  );
};

export default ReportsPage;
