
import StatCard from "./components/StatCard";
import ReportForm from "./components/ReportForm";

import {
  TaskCompletionChart,
  ProjectsProgressChart,
  WorkerActivityChart,
} from "./components/ReportsCharts";

import { statsData } from "./data/reportsData";

const ReportsPage = () => {
  return (
<main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F5F7FA] px-1 py-4 sm:px-6 lg:px-8 lg:py-8">
<div className="mx-auto w-full min-w-0 max-w-[1600px] space-y-5">
        {/* 3 Statistics Cards */}
        <section className="grid grid-cols-3 gap-2 sm:gap-5">
          {statsData.map((stat) => (
            <StatCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              trend={stat.trend}
            />
          ))}
        </section>

        {/* 4 Cards: 2 Columns */}
<section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">          <TaskCompletionChart />
          <ProjectsProgressChart />
          <WorkerActivityChart />
          <ReportForm />
        </section>

      </div>
    </main>
  );
};

export default ReportsPage;
