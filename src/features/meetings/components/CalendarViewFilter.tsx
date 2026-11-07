import SharedDropdown from "@/components/common/SharedDropdown";

const CalendarViewFilter = () => {
  const items = [
    { label: "Today", value: "today" },
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
  ];

  return (
    <SharedDropdown
      text="This Week"
      items={items}
      className="gap-2.5 py-2.5 pr-2.5 pl-3"
    />
  );
};

export default CalendarViewFilter;

