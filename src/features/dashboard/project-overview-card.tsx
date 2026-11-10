import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChevronDown } from "lucide-react";

const data = [
  { month: "Jan", value: 10500 },
  { month: "Feb", value: 8500 },
  { month: "Mar", value: 20000 },
  { month: "Apr", value: 8500 },
  { month: "May", value: 12000 },
  { month: "Jun", value: 19500 },
];

type SelectProps = {
  value: string;
  options: string[];
  onChange: (v: string) => void;
};

function Select({ value, options, onChange }: SelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-transparent pl-6 pr-1 text-sm text-gray-600 outline-none cursor-pointer"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-gray-900"
      />
    </div>
  );
}

function ProjectOverviewCard() {
  const [project, setProject] = useState("All Projects");
  const [period, setPeriod] = useState("This Year");

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-medium text-gray-900">Project overview</h3>

        <div className="flex items-center gap-6">
          <Select
            value={project}
            onChange={setProject}
            options={["All Projects", "Website Redesign", "Mobile Application"]}
          />
          <Select
            value={period}
            onChange={setPeriod}
            options={["This Year", "Last Year", "Last 6 Months"]}
          />
        </div>
      </div>

      {/* Chart */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="overviewGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} stroke="transparent" />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 13 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 13 }}
              ticks={[0, 5000, 10000, 15000, 20000, 25000]}
              domain={[0, 25000]}
              tickFormatter={(v: number) => (v === 0 ? "0k" : `${v / 1000}k`)}
            />

            <Tooltip
              contentStyle={{ borderRadius: 12, border: "1px solid #f1f5f9" }}
              formatter={(v: number) => [`${v.toLocaleString()}`, "Value"]}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2.5}
              fill="url(#overviewGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ProjectOverviewCard;