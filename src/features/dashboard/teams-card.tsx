import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Avatar from "@/components/common/avatar";

const members = [
  { name: "Mohanad wahib", leader: true, done: 12, total: 14 },
  { name: "Sara Hassan", done: 10, total: 16 },
  { name: "Ali Mohamed", done: 4, total: 12 },
  { name: "Khalid Mousa", done: 11, total: 16 },
  { name: "Mahmoud Salah", done: 12, total: 14 },
  { name: "Ahmed Mohamed", done: 6, total: 12 },
];

function TeamsCard() {
  const [team, setTeam] = useState("UI/UX");

  return (
    <div className="h-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <h3 className="text-lg font-semibold text-gray-900">Teams</h3>
        <div className="relative">
          <select
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            className="cursor-pointer appearance-none bg-transparent pr-4 text-xs text-gray-500 outline-none"
          >
            <option>UI/UX</option>
            <option>Frontend</option>
            <option>Backend</option>
          </select>
          <ChevronDown
            size={12}
            className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>

      <div className="mb-3 flex justify-between text-xs text-gray-400">
        <span>Name</span>
        <span>Tasks</span>
      </div>

      <ul className="space-y-4">
        {members.map((m) => (
          <li key={m.name} className="flex items-center gap-3">
            <Avatar name={m.name} size={26} />

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-xs font-medium text-gray-900">{m.name}</span>
                {m.leader && (
                  <span className="text-[10px] text-gray-400">Leader</span>
                )}
              </div>
              <div className="mt-1.5 h-1 w-full rounded-full bg-blue-100">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{ width: `${(m.done / m.total) * 100}%` }}
                />
              </div>
            </div>

            <span className="w-10 shrink-0 text-right text-xs text-gray-500">
              {m.done}/{m.total}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamsCard;