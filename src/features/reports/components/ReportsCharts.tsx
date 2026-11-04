import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  taskCompletionData,
  projectsProgressData,
  workerActivityData,
} from "../data/reportsData";

const chartCardClass =
  "rounded-2xl bg-white p-5 shadow-sm sm:p-6";

const chartTitleClass =
  "text-xl font-semibold text-secondary-gray-700 sm:text-2xl";

const TaskCompletionChart = () => {
  return (
    <div className={chartCardClass}>
      <h2 className={chartTitleClass}>
        Task Completion Time vs Deadline
      </h2>

      <div className="mt-8 h-65 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={taskCompletionData}
            margin={{ top: 10, right: 5, left: -15, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#EEEEEE"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#A1A1AA", fontSize: 12 }}
            />

            <YAxis
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#A1A1AA", fontSize: 12 }}
            />

            <Tooltip
              cursor={{ fill: "#F3F6FC" }}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              }}
            />

            <Bar
              dataKey="value"
              fill="#005AFB"
              radius={[5, 5, 0, 0]}
              barSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const ProjectsProgressChart = () => {
  return (
    <div className={chartCardClass}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className={chartTitleClass}>
          Projects Progress
        </h2>

      
  <select
    aria-label="Filter projects"
    className="cursor-pointer text-sm outline-none "
    defaultValue="all"
  >
    <option value="all">All Projects</option>
    <option value="active">Active Projects</option>
    <option value="completed">Completed Projects</option>
  </select>
      </div>

      <div className="mt-8 h-65 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={projectsProgressData}
            margin={{ top: 10, right: 5, left: -15, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="projectsGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#A7F3A7"
                  stopOpacity={0.9}
                />

                <stop
                  offset="100%"
                  stopColor="#A7F3A7"
                  stopOpacity={0.08}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#EEEEEE"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#A1A1AA", fontSize: 12 }}
            />

            <YAxis
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#A1A1AA", fontSize: 12 }}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="value"
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

const WorkerActivityChart = () => {
  return (
    <div className={chartCardClass}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className={chartTitleClass}>
          Worker Activity Rate
        </h2>

        <select
          aria-label="Activity period"
          className="cursor-pointer px-3 py-2 text-sm outline-none"
          defaultValue="monthly"
        >
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="mt-8 h-65 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={workerActivityData}
            margin={{ top: 10, right: 5, left: -15, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#EEEEEE"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#A1A1AA", fontSize: 12 }}
            />

            <YAxis
              domain={[0, 110]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#A1A1AA", fontSize: 12 }}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
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
export {
  TaskCompletionChart,
  ProjectsProgressChart,
  WorkerActivityChart,
};

