import { Briefcase } from "lucide-react";

type Project = {
  name: string;
  done: number;
  total: number;
  iconBg: string;
  iconColor: string;
  barColor: string;
  trackColor: string;
};

const projects: Project[] = [
  {
    name: "Alpha",
    done: 100,
    total: 140,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    barColor: "bg-purple-700",
    trackColor: "bg-purple-100",
  },
  {
    name: "SepetGo",
    done: 52,
    total: 120,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    barColor: "bg-teal-500",
    trackColor: "bg-teal-100",
  },
];

function ActiveProjectsCard() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Active Projects</h3>
        <a href="#" className="text-xs font-medium text-blue-600 hover:underline">
          View All
        </a>
      </div>

      <div className="space-y-4">
        {projects.map((p) => {
          const percent = Math.round((p.done / p.total) * 100);
          return (
            <div key={p.name} className="rounded-xl border border-gray-100 p-4">
              <div className="mb-3 flex items-center gap-3">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${p.iconBg} ${p.iconColor}`}
                >
                  <Briefcase size={16} />
                </span>
                <span className="text-sm font-semibold text-gray-900">{p.name}</span>
              </div>

              <div className={`h-2 w-full overflow-hidden rounded-full ${p.trackColor}`}>
                <div
                  className={`h-full rounded-full ${p.barColor}`}
                  style={{ width: `${percent}%` }}
                />
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Task: {p.done} /{p.total}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ActiveProjectsCard;