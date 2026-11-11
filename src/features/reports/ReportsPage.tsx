
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

  const isLoading =
    tasksLoading || projectsLoading || teamsLoading;

  const isError =
    tasksError || projectsError || teamsError;

  const handleRetry = () => {
    refetchTasks();
    refetchProjects();
    refetchTeams();
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F7FA]">
        <p className="text-lg font-medium text-primary-blue-500">
          Loading reports...
        </p>
      </main>
    );
  }

  if (isError || !tasks || !projects || !teams) {
    const errorMessage =
      tasksErrorMessage || projectsErrorMessage || teamsErrorMessage;

    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F5F7FA]">
        <p className="text-center text-red-500">
          {errorMessage instanceof Error
            ? errorMessage.message
            : "Failed to load reports. Please try again."}
        </p>

        <button
          onClick={handleRetry}
          className="rounded-full bg-primary-blue-500 px-6 py-3 text-white"
        >
          Try Again
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F5F7FA] px-1 py-4 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full min-w-0 max-w-[1600px] space-y-5">

        {/* Statistics Cards */}
        <section className="grid grid-cols-3 gap-2 sm:gap-5">
          <StatCard
            title="Task Completion Rate"
            value={`${tasks.summary.completion_rate}%`}
            description={`${tasks.summary.completed_tasks} completed tasks`}
          />

          <StatCard
            title="Projects Completion Rate"
            value={`${projects.summary.average_completion_rate}%`}
            description={`${projects.summary.total_projects} total projects`}
          />

          <StatCard
            title="Total Team Members"
            value={String(teams.summary.total_members)}
            description={`${teams.summary.total_teams} teams`}
          />
        </section>

        {/* Charts and Report Form */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
          <TaskCompletionChart data={tasks.by_status} />

          <ProjectsProgressChart data={projects.projects} />

          <WorkerActivityChart data={teams.teams} />

          <ReportForm />
        </section>

      </div>
    </main>
  );
};

export default ReportsPage;
