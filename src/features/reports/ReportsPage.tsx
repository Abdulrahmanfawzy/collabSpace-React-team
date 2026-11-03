import StatCard from "./components/StatCard";
import ReportsCharts from "./components/ReportsCharts";
import ReportForm from "./components/ReportForm";

import { statsData } from "./data/reportsData";

const ReportsPage = () => {
  return (
    <main className="min-h-screen bg-[#F5F7FA] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-360 space-y-6">

        {/* Statistics Cards */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
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

        {/* Charts and Report Form */}
        <section className="grid grid-cols-1 items-stretch gap-6 xl:grid-cols-2">
          <ReportsCharts />
          <ReportForm />
        </section>

      </div>
    </main>
  );
};

export default ReportsPage;