import { CheckCircle2 } from "lucide-react";
import { profileMockData, type Task } from "../data/profile.mock";

interface ProfileTasksProps {
  todoTasks?: Task[];
  doneTasks?: Task[];
}

const ProfileTasks = ({
  todoTasks = profileMockData.todoTasks,
  doneTasks = profileMockData.doneTasks,
}: ProfileTasksProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-start">
      {/* ===================== 1. TO DO CARD ===================== */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs flex flex-col overflow-hidden">
        {/* Full-width Header */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-gray-100/80 w-full">
          <span className="text-[20px] font-semibold text-gray-800">To do</span>
          <span className="text-sm font-medium text-gray-600">
            {todoTasks.length}
          </span>
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col gap-4">
          {/* Columns Header */}
          <div className="flex items-center justify-between text-xs text-gray-400 px-1">
            <span>Name</span>
            <span>Tasks</span>
          </div>

          {/* Tasks List */}
          <div className="flex flex-col gap-5 pt-1">
            {todoTasks.map((task) => (
              <div key={task.id} className="flex flex-col gap-2">
                <span className="text-sm font-normal text-gray-800">
                  {task.name}
                </span>
                {/* Progress Line */}
                <div className="w-full bg-blue-50/80 h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-primary-blue-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===================== 2. DONE CARD ===================== */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs flex flex-col overflow-hidden">
        {/* Full-width Header */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-emerald-50/80 w-full">
          <span className="text-[20px] font-semibold text-emerald-600">Done</span>
          <span className="text-sm font-medium text-emerald-600">
            {doneTasks.length}
          </span>
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col gap-4">
          {/* Columns Header */}
          <div className="flex items-center justify-between text-xs text-gray-400 px-1">
            <span>Name</span>
            <span>Tasks</span>
          </div>

          {/* Done Tasks List */}
          <div className="flex flex-col gap-5 pt-1">
            {doneTasks.map((task) => (
              <div key={task.id} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-normal text-gray-800">
                    {task.name}
                  </span>
                  <CheckCircle2 className="size-4.5 text-emerald-500 shrink-0" />
                </div>
                {/* Full Green Progress Line */}
                <div className="w-full bg-emerald-500 h-1 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTasks;