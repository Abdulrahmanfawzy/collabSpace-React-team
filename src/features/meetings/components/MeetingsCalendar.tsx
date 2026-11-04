import MeetingCard from "./MeetingCard";

const days = [
  { name: "Wed", date: 4 },
  { name: "Thu", date: 5 },
  { name: "Fri", date: 6 },
  { name: "Sat", date: 7 },
  { name: "Sun", date: 8 },
];

const hours = Array.from({ length: 10 }, (_, i) => i + 8);

const events = [
  { id: 1, title: "Design Review", day: 4, start: 8, end: 9},
  { id: 2, title: "Project Discussion", day: 5, start: 12, end: 13.5},
  { id: 3, title: "Sprint Planning", day: 6, start: 9, end: 10},
];

const ROW_HEIGHT = 137;

const formatHour = (hour: number) => {
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;

  return `${formattedHour} ${period}`;
};

const MeetingsCalendar = () => {
  return (
    <div className="mt-10 mx-16 overflow-x-auto">
      
      <div className="min-w-225">

        {/* Calendar Header */}
        <div className="grid grid-cols-6 ">

          {/* Time Header */}
          <div className="flex h-15 items-center justify-center ">
            <span className="text-sm font-medium ">
              Time
            </span>
          </div>

          {/* Days Header */}
          {days.map((day) => (
            <div
              key={day.date}
              className="flex h-15 items-center justify-center "
            >
              <span className="text-sm font-medium text-foreground">
                {day.name} {day.date}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar Body */}
        <div className="grid grid-cols-6 ">

          {/* Time Column */}
          <div>
            {hours.map((hour) => (
              <div
                key={hour}
                className="flex items-center justify-center  text-xs "
                style={{ height: ROW_HEIGHT }}
              >
                {formatHour(hour)}
              </div>
            ))}
          </div>



          {/* Days Columns */}
          {days.map((day) => (
            <div key={day.date} className="relative">
              {hours.map((hour) => {
                const meeting = events.find(
                  (event) =>
                    event.day === day.date &&
                    hour >= event.start &&
                    hour < event.end
                );

                return (
                  <div
                    key={hour}
                    className="relative flex items-center justify-center"
                    style={{ height: ROW_HEIGHT }}
                  >
                    {!meeting && (
                      <span className="text-sm font-medium text-muted-foreground">
                        {day.name}
                      </span>
                    )}
                  </div>
                );
              })}

              {/* Meetings */}
              {events
                .filter((event) => event.day === day.date)
                .map((event) => {
                  const top = (event.start - 8) * ROW_HEIGHT;
                  const height = (event.end - event.start) * ROW_HEIGHT;

                  return (
                    <div
                      key={event.id}
                      className="absolute left-0 right-0 px-1"
                      style={{
                        top,
                        height,
                      }}
                    >
                      <MeetingCard event={event} />
                    </div>
                  );
                })}
            </div>
          ))}


        </div>
      </div>
    </div>
  );
};

export default MeetingsCalendar;
