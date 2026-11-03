import CalendarViewFilter from "./CalendarViewFilter"
import MonthNavigation from "./MonthNavigation"

const CalendarToolbar = () => {
  return (
    <section className="flex items-center gap-8 ml-16 mr-16.25 mb-9.75">
        <MonthNavigation />
        <CalendarViewFilter />
    </section>
  )
}

export default CalendarToolbar