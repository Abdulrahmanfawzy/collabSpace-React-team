import { Button } from '@/components/ui/button';
import avetar from '../../../assets/images/profile-avtar.svg'
import { Plus } from 'lucide-react';

type Meeting = {
  id: number;
  title: string;
  day: number;
  start: number;
  end: number;
};

type MeetingCardProps = {
  event: Meeting;
};

const MeetingCard = ({ event }: MeetingCardProps) => {
  const formatTime = (hour: number) => {
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;

    const minutes = hour % 1 === 0 ? "00" : "30";

    return `${formattedHour}:${minutes} ${period}`;
  };

  return (
    <div className=" w-full overflow-hidden rounded-lg flex flex-col gap-4 bg-white p-3 border border-background-main">
        <div className="w-full flex flex-col gap-2">
            <h3 className="text-small font-normal">
                {event.title}
            </h3>

            <p className="text-caption-small font-normal text-black/75">
                {formatTime(event.start)} - {formatTime(event.end)}
            </p>
        </div>

        <div className='w-full flex items-center gap-1'>
            <div className='grow'>
                <img src={avetar} alt="user image" className="w-8 h-8 rounded-full border-2"/>
            </div>
            <Button variant={"default"} className='flex items-center gap-1 cursor-pointer bg-transparent border-0 text-caption-small font-normal text-black/70 hover:bg-transparent'>
                Join
                <Plus className="size-4" />
            </Button>
        </div>
    </div>
  );
};

export default MeetingCard;
