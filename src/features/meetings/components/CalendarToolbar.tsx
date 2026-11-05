import { ChevronLeft, ChevronRight } from "lucide-react"
import CalendarViewFilter from "./CalendarViewFilter"


import { useCalendarController } from "@fullcalendar/react";

type CalendarToolbarProps = {
  controller: ReturnType<typeof useCalendarController>;
};

const CalendarToolbar = ({controller} : CalendarToolbarProps) => {

  return (
    <section className="flex items-center gap-8 ml-16 mr-16 mb-10">

        {/* Month Navigation */}
        <div className="flex items-center gap-3 grow">

          <button
            onClick={() => controller.prev()}
            className="p-2 cursor-pointer hover:bg-muted"
          >
            <ChevronLeft size={18} />
          </button>

          <h2 className="text-lg font-semibold ">
            {controller?.view?.title}
          </h2>

          <button
            onClick={() => controller.next()}
            className="p-2 cursor-pointer hover:bg-muted"
          >
            <ChevronRight size={18} />
          </button>
      </div>

      <CalendarViewFilter />
    </section>
  )
}

export default CalendarToolbar