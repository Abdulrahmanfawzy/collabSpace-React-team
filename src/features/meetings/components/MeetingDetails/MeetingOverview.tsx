import { Briefcase, CalendarDays, Clock } from "lucide-react";
import type { MeetingDetails } from "../../types/meetings.types";
import { formatMeetingTime } from "../../utils/calculateEndTime"; 

type Props = {
  meeting?: MeetingDetails;
};

const MeetingOverview = ({ meeting }: Props) => {
  if (!meeting) return null;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="w-full flex items-center gap-4 mt-4 mb-5 flex-wrap">
      {/* project */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-pill bg-soft-purple flex items-center justify-center">
          <Briefcase className="size-4 text-support-purple" />
        </div>
        <span className="text-small font-normal">{meeting.project?.name}</span>
      </div>

      {/* members */}
      <div className="flex">
        {meeting.participants?.slice(0, 5).map((p) => (
          <img
            key={p.id}
            src={p.avatar_url}
            alt={p.name}
            title={p.name}
            className="w-8 h-8 rounded-full border-2 border-border -ml-3 first:ml-0 object-cover"
          />
        ))}
      </div>

      {/* date */}
      <div className="flex items-center gap-2 py-2.5">
        <CalendarDays className="size-4" />
        <span className="text-caption-small font-normal">
          {formatDate(meeting.meeting_date)}
        </span>
      </div>

      {/* time */}
      <div className="flex items-center gap-2 py-2.5">
        <Clock className="size-4" />
        <span className="text-caption-small font-normal">
          {formatMeetingTime(meeting.start_time)} - {formatMeetingTime(meeting.end_time)}
        </span>
      </div>
    </div>
  );
};

export default MeetingOverview;