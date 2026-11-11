import { Database, Download, FileCode, FileText } from "lucide-react";
import type { ReactNode } from "react";

type FileItem = {
  name: string;
  author: string;
  time: string;
  icon: ReactNode;
};

const files: FileItem[] = [
  {
    name: "UX_Research_Summary.pdf",
    author: "Mohanad Wahib",
    time: "13:00",
    icon: <FileText size={22} className="text-red-500" />,
  },
  {
    name: "Dashboard_Layout_React.jsx",
    author: "Wahib salem",
    time: "14:06",
    icon: <FileCode size={22} className="text-gray-700" />,
  },
  {
    name: "Database_Schema_v2.sql",
    author: "Mohamed Nadir",
    time: "13:00",
    icon: <Database size={22} className="text-blue-500" />,
  },
];

function RecentFilesCard() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Recent Files</h3>
        <a href="#" className="text-xs font-medium text-blue-600 hover:underline">
          View All
        </a>
      </div>

      <ul className="divide-y divide-gray-100">
        {files.map((f) => (
          <li key={f.name} className="flex items-center justify-between gap-3 py-4 first:pt-0 last:pb-0">
            <div className="flex min-w-0 items-center gap-3">
              <span className="shrink-0">{f.icon}</span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-900">{f.name}</p>
                <p className="text-xs text-gray-500">
                  By {f.author} • {f.time}
                </p>
              </div>
            </div>

            <button
              type="button"
              aria-label={`Download ${f.name}`}
              className="shrink-0 rounded-lg p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            >
              <Download size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentFilesCard;