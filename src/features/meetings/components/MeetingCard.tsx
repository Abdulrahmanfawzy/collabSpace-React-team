import type { EventDisplayInfo } from "@fullcalendar/react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../../components/ui/button";
import { calculateEndTime, formatMeetingTime } from "../utils/calculateEndTime";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import MeetingForm, { type updateMeetingValues } from "./MeetingForm";
import { useState } from "react";
import { useUpdateMeeting } from "../hooks/useUpdateMeeting";
import type { UpdateMeetingPayload } from "../api/meetings-api";
import useDeleteMeeting from "../hooks/useDeleteMeeting";
import { hasPermission, type UserRole } from "@/features/auth/constants/permissions";
import { getStoredUser } from "@/lib/auth";

type MeetingEventProps = {
  info: EventDisplayInfo;
};

type MeetingMember = {
  id: number;
  name: string;
  avatar_url: string;
};

const MeetingCard = ({ info }: MeetingEventProps) => {
  const navigate = useNavigate();

  // permissions
  const user = getStoredUser() as {
    roles: UserRole[];
  } | null;

  const role = user?.roles?.[0];

  const canUpdateMeeting = role
    ? hasPermission(role, "meetings.update")
    : false;

  const canDeleteMeeting = role
    ? hasPermission(role, "meetings.delete")
    : false;

  const { participants } = info.event.extendedProps as {
    participants: MeetingMember[];
  };

  const meetingId = info.event.extendedProps.id as number;

  const startTime = formatMeetingTime(info.event.start!);
  const endTime = formatMeetingTime(info.event.end!);

  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync, isPending } = useUpdateMeeting();

  const { mutate: mutateDel, isPending: isDeleting } = useDeleteMeeting();

  const handleDeleteMeeting = (e: React.MouseEvent) => {
    e.stopPropagation();
    mutateDel(meetingId);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const handleCardClick = () => {
    navigate(`/meetings/${meetingId}`);
  };

  const handleUpdateMeeting = async (data: updateMeetingValues) => {
    const payload: UpdateMeetingPayload & { id: number } = {
      id: meetingId,
      title: data.subject,
      meeting_date: data.date,
      start_time: ` ${data.time}:00`,
      end_time: calculateEndTime(data.time, data.duration),
      meeting_link: "https://meet.google.com/xyz-collab-ai",
    };

    try {
      await mutateAsync(payload);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to update meeting:", error);
    }
  };

  if (isDeleting) {
    return <p>Deleting Process...</p>;
  }

  return (
    <>
      <div
        onClick={handleCardClick}
        className="flex w-50 flex-col gap-2 rounded-4xl bg-white p-3 h-26 cursor-pointer hover:shadow-md transition"
      >
        {/* Meeting Header */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-sm font-semibold text-foreground">
            {info.event.title}
          </h3>

            {(canUpdateMeeting || canDeleteMeeting) && (
              <div className="flex shrink-0 items-center gap-1">
                {canUpdateMeeting && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-6"
                    aria-label="Edit meeting"
                    onClick={handleEditClick}
                  >
                    <Pencil className="size-3.5" />
                  </Button>
                )}

                {canDeleteMeeting && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-6 text-destructive"
                    aria-label="Delete meeting"
                    onClick={handleDeleteMeeting}
                    disabled={isDeleting}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                )}
              </div>
            )}
          
        </div>

        {/* Meeting Date */}
        <span className="text-xs text-muted-foreground">
          {startTime} - {endTime}
        </span>

        {/* Members & Join */}
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {participants?.slice(0, 2).map((member) => (
              <img
                key={member.id}
                src={member.avatar_url}
                alt={member.name}
                title={member.name}
                className="size-7 rounded-full border-2 border-white object-cover"
              />
            ))}

            {participants?.length > 3 && (
              <span className="flex size-7 items-center justify-center rounded-full border-2 border-white bg-muted text-[10px] font-medium">
                +{participants.length - 2}
              </span>
            )}
          </div>

          <Button
            size="sm"
            className="h-7 gap-1 rounded-full px-3 text-sm bg-transparent cursor-pointer text-black/70 hover:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            Join
            <Plus className="size-3.5" />
          </Button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent showCloseButton={false}>
          <MeetingForm
            onClose={() => setIsOpen(false)}
            onSubmitMeeting={handleUpdateMeeting}
            isLoading={isPending}
            isUpdate={true}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MeetingCard;