import MeetingsCalendar from '@/features/meetings/components/MeetingsCalendar'
import MeetingsHeader from '@/features/meetings/components/MeetingsHeader'
import { useState } from 'react'

const CalendaPage = () => {
  const [projectId , setProjectId ] = useState(0)

  return (
    <div className='app-container'>
      <MeetingsHeader projectId={projectId}/>
      <MeetingsCalendar projectId={projectId} setProjectId={setProjectId}/>
    </div>
)
}

export default CalendaPage