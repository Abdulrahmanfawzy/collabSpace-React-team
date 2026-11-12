import { useState } from "react";
import { Plus } from "lucide-react";

import MeetingForm, { type MeetingFormValues } from "./MeetingForm";

import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
} from "../../../components/ui/dialog";
import { useCreateMeeting } from "../hooks/useCreateMeeting";
import { useUsers } from "../hooks/useUsers";
import type { CreateMeetingPayload } from "../types/meetings.types";
import { calculateEndTime } from "../utils/calculateEndTime";
import { hasPermission, type UserRole } from "@/features/auth/constants/permissions";
import { getStoredUser } from "@/lib/auth";



interface MeetingsHeaderProps {
  projectId: number;
}


const MeetingsHeader = ({ projectId }: MeetingsHeaderProps) => {

  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync, isPending } = useCreateMeeting();

  const { data, isLoading: isUsersLoading } = useUsers();

  const users = data?.data ?? [];

  console.log("API Response:", data);
  console.log("Users:", users);
  console.log("Is Array:", Array.isArray(users));

  const handleCreateMeeting = async (data: MeetingFormValues) => {


    const payload: CreateMeetingPayload = {
      title: data.subject,
      description: data.note,
      meeting_date: data.date,
      start_time: `${data.time}:00`,
      end_time: calculateEndTime(
        data.time,
        data.duration
      ),
      meeting_link: "https://meet.google.com/xyz-collab-ai",
      project_id: projectId,
      participants: data.participants,
    };

    try {
      await mutateAsync(payload);
      setIsOpen(false);
      
    } 
    catch (error) {
      console.error("Failed to create meeting:", error);
    }
  };

    // permissions
    const user = getStoredUser() as {
      roles: UserRole[];
    } | null;

    const role = user?.roles?.[0];

    const canCreateMeeting = role
      ? hasPermission(role, "meetings.create")
      : false;

  

  return (
    <>
      <section className=" mt-12 mb-10.5 flex items-center justify-between">
        <h1 className="text-h4 font-semibold">
          Meetings
        </h1>

        {
          canCreateMeeting &&
            <Button
              variant="primary"
              onClick={() => setIsOpen(true)}
              className="py-3 pl-5 flex items-center gap-2 text-white rounded-4xl cursor-pointer transition duration-300"
            >
              Add Meeting
              <Plus className="size-4" />
            </Button>
        }
      </section>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent showCloseButton={false}>
          {isUsersLoading ? (
            <p className="p-6 text-center">
              Loading users...
            </p>
          ) : (
            <MeetingForm
              users={users || []}
              onClose={() => setIsOpen(false)}
              onSubmitMeeting={handleCreateMeeting}
              isLoading={isPending}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MeetingsHeader;