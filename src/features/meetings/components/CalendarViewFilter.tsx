import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useGetProjects } from "../hooks/useGetProjects";
import type { Project } from "../types/projects.types";
import type { TimeFilter } from "../types/meetings.types";

interface CalendarViewFilterProps {
  setProjectId: (value: number) => void;
  setFilterTime: (value: TimeFilter) => void;
  projectId: number
  filterTime: TimeFilter;
}

const CalendarViewFilter = ({
  setProjectId,
  setFilterTime,
  projectId,
  filterTime 
}: CalendarViewFilterProps) => {

  const timesFilter = [
    { label: "Today", value: "today" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Past", value: "past" },
  ];

  const { data } = useGetProjects();

  const projects: Project[] = data?.data?.data ?? [];

  return (
    <div className="flex gap-4">

      {/* Project Filter */}
      <Select
        value={`${projectId}`}
        onValueChange={(value) => setProjectId(Number(value))}
      >
        <SelectTrigger className="bg-transparent gap-2.5 py-2.5 pr-2.5 pl-3 border border-black rounded-4xl">
          <SelectValue placeholder="Select Project" />
        </SelectTrigger>

        <SelectContent>
            {/* <SelectItem
              key={"all"}
              value={''}
            >
              {"all"}
            </SelectItem> */}
          {projects.map((project) => (
            <SelectItem
              key={project.id}
              value={String(project.id)}
            >
              {project.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Time Filter */}
      <Select
      value={filterTime}
        onValueChange={(value) => setFilterTime(value as TimeFilter)}
      >
        <SelectTrigger className="bg-transparent gap-2.5 py-2.5 pr-2.5 pl-3 border border-black rounded-4xl">
          <SelectValue placeholder="Select Time" />
        </SelectTrigger>

        <SelectContent>
          {timesFilter.map((time) => (
            <SelectItem
              key={time.value}
              value={time.value}
            >
              {time.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

    </div>
  );
};

export default CalendarViewFilter;