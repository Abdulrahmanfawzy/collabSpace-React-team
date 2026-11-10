import { useEffect, useState } from "react";
import { FileCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";

import ProfileHeader from "./ProfileHeader";
import ProfileTasks from "./ProfileTasks";
import ProfileFiles from "./ProfileFiles";
import type { ProfileTab } from "./ProfileHeader";
import { getProfile, type ProfileMeResponse } from "@/services/profile.service";

const ProfileView = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>("overview");
  const [profile, setProfile] = useState<ProfileMeResponse["data"] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getProfile()
      .then((response) => {
        if (!mounted) return;
        if (response.success) {
          setProfile(response.data);
        } else {
          toast.error(response.message || "Failed to load profile.");
        }
      })
      .catch((error: unknown) => {
        if (!mounted) return;
        const message =
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "Failed to load profile.";
        toast.error(message);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-20 text-gray-500">
        Unable to load profile.
      </div>
    );
  }

  const { user, stats, recent_activities } = profile;

  const joinedDate = user.created_at
    ? `Joined ${new Date(user.created_at).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })}`
    : "Joined";

  const activities = (recent_activities || []).map((activity) => ({
    id: activity.id,
    text: activity.description,
    time: new Date(activity.created_at).toLocaleString(),
  }));

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header with User info, Stats & Tabs */}
      <ProfileHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        name={user.name}
        role={user.job_title || ""}
        avatar={user.avatar_url || undefined}
        joinedDate={joinedDate}
        completedTasks={stats?.completed_tasks ?? 0}
        hoursWorked={stats?.hours_worked ?? 0}
      />

      {/* 2. Dynamic Tab Content */}
      {activeTab === "overview" && (
        <div className="flex flex-col gap-6">
          {/* About Section */}
          <section className="p-6">
            <h2 className="text-[25px] font-medium text-gray-900 mb-2">About</h2>
            <p className="text-[16px] md:text-base text-text-secondary leading-relaxed font-normal w-[753px]">
              {user.about || "No information provided."}
            </p>
          </section>

          {/* Recent Activities Section */}
          <section className="p-6 w-[753px]">
            <h2 className="text-[25px] font-medium text-gray-900 mb-2">
              Recent Activates
            </h2>
            <div className="flex flex-col">
              {activities.map((act) => (
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
              {activities.length === 0 && (
                <p className="text-gray-400 text-sm">No recent activities.</p>
              )}
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