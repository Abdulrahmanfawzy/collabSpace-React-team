export const calculateEndTime = ( startTime: string, duration: string): string => {

  const [hours, minutes] = startTime.split(":").map(Number);

  const totalMinutes = hours * 60 + minutes + Number(duration);

  const endHours = Math.floor(totalMinutes / 60) % 24;
  const endMinutes = totalMinutes % 60;

  return `${String(endHours).padStart(2, "0")}:${String(
    endMinutes
  ).padStart(2, "0")}:00`;
};


export const formatMeetingTime = (time: string | Date) => {
  const date =
    time instanceof Date
      ? time
      : new Date(`2000-01-01T${time}`);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};