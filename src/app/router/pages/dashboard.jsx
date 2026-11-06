import SectionCard from "../../../components/common/sectionCard";
import ProgressBar from "../../../components/common/progressBar";
import StatCard from "../../../components/common/statCard";

function Dashboard() {
  return (
    <div className="min-h-screen bg-background p-6">

      {/* Statistics */}
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
            trackColor: "bg-amber-50/60"
          }}
          iconSvg={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              <circle cx="15" cy="15" r="5" />
              <polyline points="15 12 15 15 17 16" />
            </svg>
          }
        />
      </div>

      {/* Dashboard Sections */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">

        <SectionCard title="Project Overview">
          <p className="mb-2 text-sm">Website Redesign</p>
          <ProgressBar value={70} />
          <p className="mb-5 mt-2 text-xs text-muted-foreground">
            70% Completed
          </p>

          <p className="mb-2 text-sm">Mobile Application</p>
          <ProgressBar value={45} />
          <p className="mt-2 text-xs text-muted-foreground">
            45% Completed
          </p>
        </SectionCard>

        <SectionCard title="Active Projects">
          <p className="mb-3 text-sm">Alpha</p>
          <p className="text-sm">SeptGo</p>
        </SectionCard>

        <SectionCard title="Recent Files">
          <p className="mb-3 text-sm">Research.pdf</p>
          <p className="mb-3 text-sm">Dashboard.jsx</p>
          <p className="text-sm">Database.sql</p>
        </SectionCard>

      </div>
    </div>
  );
}

export default Dashboard;