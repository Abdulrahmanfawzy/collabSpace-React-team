
import { Button } from "@/components/ui/button";
import type { EventDisplayInfo } from "@fullcalendar/react";
import { Plus } from "lucide-react";

type MeetingEventProps = {
  info: EventDisplayInfo;
};

const MeetingCard = ({ info }: MeetingEventProps) => {
  const { members } = info.event.extendedProps;


  return (
    <div className="flex max-h-27 w-50 flex-col gap-4  rounded-4xl bg-white text-black p p-3 border border-background-main cursor-pointer">

      {/* Meeting Title */}

      {/* Time */}
      <div className="flex flex-col gap-2">

        <h3 className=" text-small font-normal">
          {info.event.title}
        </h3>

        <span className="text-caption-small font-normal">
          {info.timeText}
        </span>
      </div>



      {/* Members */}
    <div className="flex items-center">
      <div className="flex items-center grow">
        {members?.slice(0, 2).map((member: { id: string; avatar: string } , i : number) => (
          <img
            key={member.id}
            src={member.avatar}
            alt="Member"
            className={`size-8 rounded-4xl border-2 border-secondary object-cover ${ i !== 0 ? "-ml-3" : ""}`}
          />
        ))}

        {members?.length > 2 && (
          <span className="w-8 h-8 rounded-full flex justify-center items-center text-[10px] font-bold bg-background-secondary text-muted-foreground">
            +{members.length - 2}
          </span>
        )}
      </div>
      <Button variant={"default"} className="bg-transparent text-black/70 text-caption-small cursor-pointer flex items-center gap-1 hover:bg-transparent">
        Join
        <Plus size={4} className="text-black"/>
      </Button>
    </div>

    </div>
  );
};

export default MeetingCard;
