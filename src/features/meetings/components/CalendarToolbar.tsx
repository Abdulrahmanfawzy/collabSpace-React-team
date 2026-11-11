import { ChevronLeft, ChevronRight } from "lucide-react"
import CalendarViewFilter from "./CalendarViewFilter"


import { useCalendarController } from "@fullcalendar/react";
import type { TimeFilter } from "../types/meetings.types";

type CalendarToolbarProps = {
  controller: ReturnType<typeof useCalendarController>,
  setProjectId : (value:number) => void,
  setFilterTime : (value:TimeFilter) => void,
  projectId: number
  filterTime: TimeFilter;
};

const CalendarToolbar = ({controller ,setFilterTime , setProjectId , projectId , filterTime} : CalendarToolbarProps) => {

  return (
    <section className="flex items-center gap-8 ml-16 mr-16 mb-10">

        {/* Month Navigation */}
        <div className="flex items-center gap-4 grow">

          <button
            onClick={() => controller.prev()}
            className="cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <h2 className="text-xl font-medium ">
            {controller?.view?.title}
          </h2>

          <button
            onClick={() => controller.next()}
            className="cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
      </div>

      <CalendarViewFilter setFilterTime={setFilterTime} setProjectId={setProjectId} filterTime={filterTime} projectId={projectId} />
    </section>
  )
}

export default CalendarToolbar