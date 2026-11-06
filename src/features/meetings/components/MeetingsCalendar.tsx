import FullCalendar, { useCalendarController } from "@fullcalendar/react";

import themePlugin from "@fullcalendar/react/themes/monarch";
import timeGridPlugin from "@fullcalendar/react/timegrid";
import interactionPlugin from "@fullcalendar/react/interaction";

import "@fullcalendar/react/skeleton.css";

import MeetingCard from "./MeetingCard";
import CalendarToolbar from "./CalendarToolbar";
import { useNavigate } from "react-router-dom";


const meetings = [
  {
    id: "1",
    title: "Weekly Team Sync",
    start: "2026-11-06T09:00:00",
    end: "2026-11-06T10:00:00",
    extendedProps: {
      status: "Upcoming",
      meetingType: "Online",
      members: [
        { id: "1", avatar: "https://i.pravatar.cc/100?img=11" },
        { id: "2", avatar: "https://i.pravatar.cc/100?img=12" },
        { id: "3", avatar: "https://i.pravatar.cc/100?img=13" },
        { id: "4", avatar: "https://i.pravatar.cc/100?img=14" },
      ],
    },
  },
  {
    id: "2",
    title: "Weekly Team Sync",
    start: "2026-11-10T10:00:00",
    end: "2026-11-10T11:00:00",
    extendedProps: {
      status: "Upcoming",
      meetingType: "Online",
      members: [
        { id: "1", avatar: "https://i.pravatar.cc/100?img=11" },
        { id: "2", avatar: "https://i.pravatar.cc/100?img=12" },
        { id: "3", avatar: "https://i.pravatar.cc/100?img=13" },
        { id: "4", avatar: "https://i.pravatar.cc/100?img=14" },
      ],
    },
  },
  {
    id: "3",
    title: "Weekly Team Sync",
    start: "2026-11-07T10:00:00",
    end: "2026-11-07T11:00:00",
    extendedProps: {
      status: "Incoming",
      meetingType: "Online",
      members: [
        { id: "1", avatar: "https://i.pravatar.cc/100?img=11" },
        { id: "2", avatar: "https://i.pravatar.cc/100?img=12" },
        { id: "3", avatar: "https://i.pravatar.cc/100?img=13" },
        { id: "4", avatar: "https://i.pravatar.cc/100?img=14" },
      ],
    },
  },
];

const MeetingsCalendar = () => {
  const controller = useCalendarController();

  const navigate = useNavigate()

  return (
    <>
      <CalendarToolbar controller={controller} />

      <div className="mt-10 mx-16 overflow-x-auto">
        <FullCalendar
          plugins={[themePlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridFiveDay"

          views={{
            timeGridFiveDay: {
              type: "timeGrid",
              duration: { days: 5 },

              dayHeaderClass: (info) =>
                info.isToday ? "bg-primary-blue-50 rounded-md p-10" : "",

              dayHeaderContent: (info) => (
                <div className="flex flex-col items-center gap-1">
                  <span>
                    {info.isToday
                      ? "Today"
                      : info.date.toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                  </span>

                  <span>{info.date.getDate()}</span>
                </div>
              ),
              dayLaneClass: (info) =>
                info.isToday ? "bg-primary-blue-50" : "",
              
            },
          }}

          eventClick={(info) => {
            const meetingId = info.event.id;

            navigate(`/meetings/${meetingId}`);
          }}


          slotMinTime="09:00:00"
          slotMaxTime="17:00:00"
          slotDuration="01:00:00"
          slotMinHeight={137}
          events={meetings}
          eventContent={(info) => (
            <div className="bg-transparent py-4 px-3 flex justify-center items-center">
              <MeetingCard info={info} />
            </div>
          )}
          controller={controller}
          headerToolbar={false}
          slotHeaderFormat={{
            hour: "numeric",
            minute: "2-digit",
            hour12: false,
          }}
          slotHeaderInnerClass="w-38 h-34 flex justify-center items-center"
          height="auto"
          dayHeaderInnerClass="flex flex-col gap-0.5 items-center py-2 text-small font-medium"
          allDaySlot={true}
          allDayHeaderContent="Time"
          allDayHeaderClass="absolute top-2 text-small font-medium flex justify-center items-center"
          allDayHeaderInnerClass="px-2.5"
          
          dayLaneDidMount={(info) => {
            const lane = info.el;

            lane.style.position = "relative";

            const overlay = document.createElement("div");

            overlay.style.cssText = `
              position: absolute;
              inset: 0;
              display: grid;
              grid-template-rows: repeat(8, 1fr);
              pointer-events: none;
              z-index: 0;
            `;

            for (let hour = 9; hour < 17; hour++) {
              const slotStart = new Date(info.date);
              slotStart.setHours(hour, 0, 0, 0);

              const slotEnd = new Date(slotStart);
              slotEnd.setHours(hour + 1);

              const hasMeeting = meetings.some((meeting) => {
                const meetingStart = new Date(meeting.start);
                const meetingEnd = new Date(meeting.end);

                return (
                  meetingStart < slotEnd &&
                  meetingEnd >= slotStart &&
                  meetingStart.toDateString() === info.date.toDateString()
                );
              });

              if (hasMeeting) {
                const emptySlot = document.createElement("div");
                overlay.appendChild(emptySlot);
                continue;
              }

              const label = document.createElement("div");

              label.className =
                "flex items-center justify-center text-small text-muted-foreground";

              label.textContent = info.date.toLocaleDateString("en-US", {
                weekday: "short",
              });

              overlay.appendChild(label);
            }

            lane.appendChild(overlay);
          }}
          
        />
      </div>
    </>
  );
};

export default MeetingsCalendar;