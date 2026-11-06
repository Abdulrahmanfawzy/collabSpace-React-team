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

      <CalendarViewFilter />
    </section>
  )
}

export default CalendarToolbar