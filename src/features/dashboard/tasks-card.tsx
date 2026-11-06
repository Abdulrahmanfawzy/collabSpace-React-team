type Priority = "High" | "Medium" | "Low";

const priorityStyle: Record<Priority, string> = {
  High: "bg-red-50 text-red-500",
  Medium: "bg-yellow-50 text-yellow-600",
  Low: "bg-green-50 text-green-600",
};

const tasks = [
  { title: "Creat Wireframes", priority: "High" as Priority, due: "due today", percent: 82 },
  { title: "User Research", priority: "Medium" as Priority, due: "due Dec 18", percent: 52 },
  { title: "Design System Updates", priority: "Low" as Priority, due: "due Dec 20", percent: 42 },
];

function TasksCard() {
  return (
    <div className="h-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Tasks</h3>
        <a href="#" className="text-xs font-medium text-blue-600 hover:underline">
          View All
        </a>
      </div>

      <div className="space-y-3">
        {tasks.map((t) => (
          <div key={t.title} className="rounded-xl border border-gray-100 p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-sm font-medium text-gray-900">{t.title}</p>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${priorityStyle[t.priority]}`}
              >
                {t.priority}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <span>{t.due}</span>
              <span>{t.percent}%</span>
            </div>

            <div className="mt-2 h-1.5 w-full rounded-full bg-blue-100">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{ width: `${t.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TasksCard;