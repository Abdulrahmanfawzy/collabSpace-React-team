
import type { ReactNode } from "react";

import { getStoredUser } from "@/lib/auth";

import {
  ROLE_PERMISSIONS,
  hasPermission,
  type UserRole,
} from "@/features/auth/constants/permissions";

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
  useUserReport,
} from "./hooks/useReports";

// Reusable report section
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
  // Get logged-in user
  const storedUser = getStoredUser() as {
    id?: number | string;
    roles?: unknown;
  } | null;

  // Backend returns roles as an array
  const userRoles = Array.isArray(storedUser?.roles)
    ? storedUser.roles
    : [];

  // Find a valid role from central permissions
  const userRole = userRoles.find(
    (role): role is UserRole =>
      typeof role === "string" &&
      Object.prototype.hasOwnProperty.call(ROLE_PERMISSIONS, role)
  );

  // Check permissions
  const canViewAllReports = userRole
    ? hasPermission(userRole, "reports.view-all")
    : false;

  const canViewAnalytics = userRole
    ? hasPermission(userRole, "analytics.view")
    : false;

  const canGenerateReports = userRole
    ? hasPermission(userRole, "reports.generate")
    : false;

  const canViewPersonalReports = userRole
    ? hasPermission(userRole, "reports.view-personal")
    : false;

  // Determine access
  const canViewProjectReports =
    canViewAllReports || canViewAnalytics;

  const shouldFetchPersonalReport =
    canViewPersonalReports && !canViewAllReports;

  // Current user ID
  const userId = Number(storedUser?.id) || 0;

  // Administrator: Tasks report
  const {
    data: tasks,
    isPending: tasksLoading,
    isError: tasksError,
    error: tasksErrorMessage,
    refetch: refetchTasks,
  } = useTasksReport(canViewAllReports);

  // Administrator and Project Manager: Projects report
  const {
    data: projects,
    isPending: projectsLoading,
    isError: projectsError,
    error: projectsErrorMessage,
    refetch: refetchProjects,
  } = useProjectsReport(canViewProjectReports);

  // Administrator: Teams report
  const {
    data: teams,
    isPending: teamsLoading,
    isError: teamsError,
    error: teamsErrorMessage,
    refetch: refetchTeams,
  } = useTeamsReport(canViewAllReports);

  // Team Member: Personal report
  const {
    data: personalReport,
    isPending: personalLoading,
    isError: personalError,
    error: personalErrorMessage,
    refetch: refetchPersonal,
  } = useUserReport(
    shouldFetchPersonalReport ? userId : 0
  );

  // No valid role
  if (!userRole) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F7FA] p-5">
        <p className="text-center text-gray-600">
          Unable to identify your role. Please sign in again.
        </p>
      </main>
    );
  }

  // Team Member: Personal Statistics
  // Uses the existing StatCard design, without creating a new dashboard.
  if (shouldFetchPersonalReport) {
    return (
      <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F5F7FA] px-1 py-4 sm:px-6 lg:px-8 lg:py-8">
        <div className="mx-auto w-full min-w-0 max-w-[1600px] space-y-5">
          <ReportSection
            isLoading={personalLoading}
            isError={personalError || !personalReport}
            error={personalErrorMessage}
            onRetry={() => {
              void refetchPersonal();
            }}
          >
            {personalReport && (
              <section className="grid grid-cols-3 gap-2 sm:gap-5">
                <StatCard
                  title="Assigned Tasks"
                  value={String(personalReport.tasks.total_assigned)}
                  description="Total assigned tasks"
                />

                <StatCard
                  title="Completed Tasks"
                  value={String(personalReport.tasks.completed)}
                  description={`${personalReport.tasks.completion_rate}% completion rate`}
                />

                <StatCard
                  title="In Progress Tasks"
                  value={String(personalReport.tasks.in_progress)}
                  description="Tasks currently in progress"
                />

                <StatCard
                  title="Pending Tasks"
                  value={String(personalReport.tasks.pending)}
                  description="Tasks currently pending"
                />

                <StatCard
                  title="Overdue Tasks"
                  value={String(personalReport.tasks.overdue)}
                  description="Tasks past their deadline"
                />

                <StatCard
                  title="Meeting Attendance"
                  value={`${personalReport.meetings.attendance_rate}%`}
                  description={`${personalReport.meetings.attended} attended out of ${personalReport.meetings.total_invited} meetings`}
                />

                <StatCard
                  title="Uploaded Files"
                  value={String(personalReport.files.uploaded_count)}
                  description={personalReport.files.formatted_size}
                />

                <StatCard
                  title="Productivity Score"
                  value={String(personalReport.productivity.score)}
                  description={personalReport.productivity.performance_level}
                />

                <StatCard
                  title="On-time Completion"
                  value={`${personalReport.tasks.on_time_rate}%`}
                  description="Tasks completed on time"
                />
              </section>
            )}
          </ReportSection>
        </div>
      </main>
    );
  }

  // No reports permission
  if (!canViewProjectReports && !canGenerateReports) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F7FA] p-5">
        <p className="text-center text-gray-600">
          You don't have permission to access this page.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F5F7FA] px-1 py-4 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full min-w-0 max-w-[1600px] space-y-5">

        {/* Administrator: All Statistics */}
        {canViewAllReports && (
          <section className="grid grid-cols-3 gap-2 sm:gap-5">

            <ReportSection
              isLoading={tasksLoading}
              isError={tasksError || !tasks}
              error={tasksErrorMessage}
              onRetry={() => {
                void refetchTasks();
              }}
            >
              {tasks && (
                <StatCard
                  title="Total Tasks"
                  value={String(tasks.summary.total_tasks)}
                  description="Total tasks in the system"
                />
              )}
            </ReportSection>

            <ReportSection
              isLoading={projectsLoading}
              isError={projectsError || !projects}
              error={projectsErrorMessage}
              onRetry={() => {
                void refetchProjects();
              }}
            >
              {projects && (
                <StatCard
                  title="Total Projects"
                  value={String(projects.summary.total_projects)}
                  description="Total projects in the system"
                />
              )}
            </ReportSection>

            <ReportSection
              isLoading={teamsLoading}
              isError={teamsError || !teams}
              error={teamsErrorMessage}
              onRetry={() => {
                void refetchTeams();
              }}
            >
              {teams && (
                <StatCard
                  title="Total Teams"
                  value={String(teams.summary.total_teams)}
                  description="Total teams in the system"
                />
              )}
            </ReportSection>

          </section>
        )}

        {/* Original Charts and Report Form */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">

          {/* Tasks Chart: Administrator */}
          {canViewAllReports && (
            <ReportSection
              isLoading={tasksLoading}
              isError={tasksError || !tasks}
              error={tasksErrorMessage}
              onRetry={() => {
                void refetchTasks();
              }}
            >
              {tasks && (
                <TaskCompletionChart data={tasks.by_status} />
              )}
            </ReportSection>
          )}

          {/* Projects Chart: Administrator and Project Manager */}
          {canViewProjectReports && (
            <ReportSection
              isLoading={projectsLoading}
              isError={projectsError || !projects}
              error={projectsErrorMessage}
              onRetry={() => {
                void refetchProjects();
              }}
            >
              {projects && (
                <ProjectsProgressChart data={projects.projects} />
              )}
            </ReportSection>
          )}

          {/* Teams Chart: Administrator */}
          {canViewAllReports && (
            <ReportSection
              isLoading={teamsLoading}
              isError={teamsError || !teams}
              error={teamsErrorMessage}
              onRetry={() => {
                void refetchTeams();
              }}
            >
              {teams && (
                <WorkerActivityChart data={teams.teams} />
              )}
            </ReportSection>
          )}

          {/* Report Form: Administrator and Project Manager */}
          {canGenerateReports && <ReportForm />}

        </section>
      </div>
    </main>
  );
};

export default ReportsPage;
