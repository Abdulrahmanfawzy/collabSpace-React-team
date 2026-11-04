import Navbar from '@/components/common/Navbar/Navbar'
import CalendarToolbar from '@/features/meetings/components/CalendarToolbar'
import MeetingsCalendar from '@/features/meetings/components/MeetingsCalendar'
import MeetingsHeader from '@/features/meetings/components/MeetingsHeader'

const CalendaPage = () => {
  return (
    <>
    <Navbar />
    <MeetingsHeader />
    <CalendarToolbar />
    <MeetingsCalendar />
    </>
)
}

export default CalendaPage