import { CalendarDays } from "lucide-react";
import { AvatarGroup } from "@/components/common/avatar-group";
import type { Member } from "@/types/common";

type Meeting = {
  id: number;
  title: string;
  date: string;
  time: string;
  members: Member[];
};

const meetings: Meeting[] = [
  {
    id: 1,
    title: "Design Review",
    date: "Today",
    time: "14:00 - 15:00",
    members: [
      { id: 1, name: "Ali Mohamed", avatar: "/avatars/ali.jpg" },
      { id: 2, name: "Sara Hassan", avatar: "/avatars/sara.jpg" },
      { id: 3, name: "Omar Khaled", avatar: "/avatars/omar.jpg" },
      { id: 4, name: "Mona Adel", avatar: "/avatars/mona.jpg" },
      { id: 5, name: "Yara Samy", avatar: "/avatars/yara.jpg" },
      { id: 6, name: "Hany Fathy", avatar: "/avatars/hany.jpg" },
    ],
  },
  {
    id: 2,
    title: "Sprint Planning Meeting",
    date: "Dec 12",
    time: "13:00 - 13:30",
    members: [
      { id: 1, name: "Khalid Mousa", avatar: "/avatars/khalid.jpg" },
      { id: 2, name: "Mona Adel", avatar: "/avatars/mona.jpg" },
      { id: 3, name: "Yara Samy", avatar: "/avatars/yara.jpg" },
      { id: 4, name: "Nour Ali", avatar: "/avatars/nour.jpg" },
      { id: 5, name: "Laila Hany", avatar: "/avatars/laila.jpg" },
      { id: 6, name: "Omar Khaled", avatar: "/avatars/omar.jpg" },
      { id: 7, name: "Sara Hassan", avatar: "/avatars/sara.jpg" },
    ],
  },
  {
    id: 3,
    title: "UX Feedback Session",
    date: "Dec 18",
    time: "14:00 - 15:00",
    members: [
      { id: 1, name: "Ahmed Mohamed", avatar: "/avatars/ahmed.jpg" },
      { id: 2, name: "Nour Ali", avatar: "/avatars/nour.jpg" },
      { id: 3, name: "Hany Fathy", avatar: "/avatars/hany.jpg" },
      { id: 4, name: "Laila Hany", avatar: "/avatars/laila.jpg" },
      { id: 5, name: "Ali Mohamed", avatar: "/avatars/ali.jpg" },
      { id: 6, name: "Sara Hassan", avatar: "/avatars/sara.jpg" },
      { id: 7, name: "Omar Khaled", avatar: "/avatars/omar.jpg" },
      { id: 8, name: "Mona Adel", avatar: "/avatars/mona.jpg" },
    ],
  },
];

function UpcomingMeetingsCard() {
  return (
    <div className="h-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Up coming meetings</h3>
        <a href="#" className="text-xs font-medium text-blue-600 hover:underline">
          View All
        </a>
      </div>

      <div className="space-y-3">
        {meetings.map((m) => (
          <div key={m.id} className="rounded-xl border border-gray-100 p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-sm font-medium text-gray-900">{m.title}</p>
              <span className="flex shrink-0 items-center gap-1 text-xs text-gray-600">
                {m.date}
                <CalendarDays size={13} />
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <AvatarGroup members={m.members} max={3} />
              <span className="text-xs text-gray-500">{m.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingMeetingsCard;