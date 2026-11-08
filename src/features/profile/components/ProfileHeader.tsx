import { Link } from "react-router-dom";
import { Settings, Calendar, Briefcase, Clock } from "lucide-react";
import avtar from "@/assets/images/profile-avtar.svg";

export type ProfileTab = "overview" | "tasks" | "files";

interface ProfileHeaderProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
  name?: string;
  role?: string;
  joinedDate?: string;
  completedTasks?: number;
  hoursWorked?: number;
}

const ProfileHeader = ({
  activeTab,
  onTabChange,
  name = "Mohamed Salah",
  role = "UI/UX Designer",
  joinedDate = "Joind Apr 2022",
  completedTasks = 140,
  hoursWorked = 345,
}: ProfileHeaderProps) => {
  const tabs: { id: ProfileTab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "tasks", label: "Tasks" },
    { id: "files", label: "Files" },
  ];

  return (
    <header className="flex flex-col gap-6">
      {/* Top Section: User Info & Stats Cards */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: User Avatar & Details */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={avtar}
              alt={name}
              className="size-18 md:size-20 rounded-full object-cover border-2 border-white shadow-xs"
            />
            {/* Settings button over avatar */}
            <Link
              to="/profile/settings"
              title="Edit Profile Settings"
              className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-primary-blue-500 text-white shadow-md hover:bg-primary-blue-600 transition-colors"
            >
              <Settings className="size-4" />
            </Link>
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl md:text-2xl font-bold text-gray-900 tracking-tight">
              {name}
            </h1>
            <div className="flex flex-wrap items-center gap-2.5 text-xs md:text-sm text-text-secondary mt-1 font-medium">
              <span className="text-[20px]">{role}</span>
              <span className="flex items-center gap-1.5 text-[20px] ">
                <Calendar className="size-3.5" />
                <span>{joinedDate}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Stats Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full lg:w-auto">
          {/* Card 1: Completed Tasks */}
          <div className="flex items-center justify-between gap-4 rounded-base bg-white p-3 border border-gray-100/80 shadow-xs w-[290px] h-[110px]">
            <div>
              <p className="text-xs text-gray-500 font-medium">Completed Tasks</p>
              <p className="text-2xl font-bold text-gray-900 mt-6">{completedTasks}</p>
            </div>
            <div className="flex size-13 items-center justify-center rounded-full bg-blue-50 text-primary-blue-500 shrink-0">
              <Briefcase className="size-6" />
            </div>
          </div>

          {/* Card 2: Hours Worked */}
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-white p-3 border border-gray-100/80 shadow-xs w-[290px] h-[110px]">
            <div>
              <p className="text-xs text-gray-500 font-medium">Hours Worked</p>
              <p className="text-2xl font-bold text-gray-900 mt-6">{hoursWorked}</p>
            </div>
            <div className="flex size-13 items-center justify-center rounded-full bg-pink-50 text-support-pink shrink-0">
              <Clock className="size-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Tabs Navigation */}
      <div className="flex border-b border-gray-200 gap-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`pb-3 text-sm md:text-base font-medium transition-all relative whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? "text-primary-blue-500 font-semibold"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-blue-500 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </header>
  );
};

export default ProfileHeader;
