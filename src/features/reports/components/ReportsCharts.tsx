
import { useState } from "react";

import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type {
  TasksReport,
  ProjectsReport,
  TeamsReport,
} from "../types/reports.types";

const chartCardClass = "rounded-2xl bg-white p-5 shadow-sm sm:p-6";

const chartTitleClass =
  "text-xl font-semibold text-secondary-gray-700 sm:text-2xl";

// Tasks chart
export const TaskCompletionChart = ({
  data,
}: {
  data: TasksReport["by_status"];
}) => {
  const chartData = Object.entries(data).map(([status, count]) => ({
    status,
    count,
  }));

  return (
    <div className={chartCardClass}>
      <h2 className={chartTitleClass}>Tasks by Status</h2>

      <div className="mt-8 h-65 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="status" tick={{ fontSize: 11 }} />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="count"
              fill="#005AFB"
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Projects chart
export const ProjectsProgressChart = ({
  data,
}: {
  data: ProjectsReport["projects"];
}) => {
  const [filter, setFilter] = useState("all");

  const filteredProjects = data.filter((project) => {
    if (filter === "active") return project.status === "In Progress";
    if (filter === "completed") return project.status === "Completed";

    return true;
  });

  const chartData = filteredProjects.map((project) => ({
    name: project.name,
    progress: project.progress_percentage,
  }));

  return (
    <div className={chartCardClass}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className={chartTitleClass}>Projects Progress</h2>

        <select
          aria-label="Filter projects"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="cursor-pointer text-sm outline-none"
        >
          <option value="all">All Projects</option>
          <option value="active">Active Projects</option>
          <option value="completed">Completed Projects</option>
        </select>
      </div>

      <div className="mt-8 h-65 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient
                id="projectsGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#A7F3A7" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#A7F3A7" stopOpacity={0.08} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="name"
              tick={{ fontSize: 10 }}
              interval={0}
              angle={-15}
              textAnchor="end"
              height={65}
            />
            <YAxis domain={[0, 100]} />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="progress"
              stroke="#86EFAC"
              strokeWidth={2}
              fill="url(#projectsGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Teams chart
export const WorkerActivityChart = ({
  data,
}: {
  data: TeamsReport["teams"];
}) => {
  const chartData = data.map((team) => ({
    name: team.team_name,
    completionRate: team.completion_rate,
  }));

  return (
    <div className={chartCardClass}>
      <h2 className={chartTitleClass}>Team Completion Rate</h2>

      <div className="mt-8 h-65 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis domain={[0, 100]} />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="completionRate"
              stroke="#005AFB"
              strokeWidth={4}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
