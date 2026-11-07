import { useState } from "react";
import {
  FileCheck,
} from "lucide-react";


import ProfileHeader from "./ProfileHeader";
import ProfileTasks from "./ProfileTasks";
import ProfileFiles from "./ProfileFiles";
import { profileMockData } from "../data/profile.mock";
import type { ProfileTab } from "./ProfileHeader";

const ProfileView = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>("overview");

  

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header with User info, Stats & Tabs */}
      <ProfileHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        name={profileMockData.name}
        role={profileMockData.role}
        joinedDate={profileMockData.joinedDate}
        completedTasks={profileMockData.completedTasks}
        hoursWorked={profileMockData.hoursWorked}
      />

      {/* 2. Dynamic Tab Content */}
        
        {activeTab === "overview" && (
          <div className="flex flex-col gap-6">
            {/* About Section */}
            <section className="p-6">
              <h2 className="text-[25px] font-medium text-gray-900 mb-2">About</h2>
              <p className="text-[16px] md:text-base text-text-secondary leading-relaxed font-normal w-[753px]">
                {profileMockData.about}
              </p>
            </section>

            {/* Recent Activities Section */}
            <section className="p-6  w-[753px]">
              <h2 className="text-[25px] font-medium text-gray-900 mb-2">
                Recent Activates
              </h2>
              <div className="flex flex-col">
                {profileMockData.recentActivities.map((act) => (
                  <div
                    key={act.id}
                    className="flex items-center justify-between py-4 first:pt-0 last:pb-0 text-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex size-4 items-center justify-center text-amber-500 shrink-0">
                        <FileCheck className="size-4" />
                      </div>
                      <span className="font-medium text-[16px] text-gray-800">
                        {act.text}
                      </span>
                    </div>
                    <span className="text-[14] text-gray-400 whitespace-nowrap pl-4">
                      {act.time}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === "tasks" && <ProfileTasks />}

        {/* Files Tab */}
        {activeTab === "files" && <ProfileFiles />}
    </div>
  );
};

export default ProfileView;
