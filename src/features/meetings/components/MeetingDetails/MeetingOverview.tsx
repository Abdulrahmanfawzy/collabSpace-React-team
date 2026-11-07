import { Briefcase, CalendarDays, Clock } from "lucide-react"
import avetar from '../../../../assets/images/profile-avtar.svg'

const MeetingOverview = () => {
  return (
    <div className="w-full flex items-center gap-4 mt-4 mb-5">

        {/* project */}
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-pill bg-soft-purple flex items-center justify-center">
                <Briefcase className="size-4 text-support-purple"/>
            </div>
            <span className="text-small font-normal">
                Project 1
            </span>
        </div>

        {/* members */}
        <div className="flex">
            <img src={avetar} alt="user image" className="w-8 h-8 rounded-full border-2 border-border"/>
            <img src={avetar} alt="user image" className="w-8 h-8 rounded-full border-2 border-border -ml-3"/>
            <img src={avetar} alt="user image" className="w-8 h-8 rounded-full border-2 border-border -ml-3"/>
            <img src={avetar} alt="user image" className="w-8 h-8 rounded-full border-2 border-border -ml-3"/>
            <img src={avetar} alt="user image" className="w-8 h-8 rounded-full border-2 border-border -ml-3"/>
        </div>


        {/* date */}
        <div className="flex items-center gap-2 py-2.5">
            <CalendarDays className="size-4"/>
            <span className="text-caption-small font-normal">
                December 12, 2025
            </span>
        </div>

        {/* time */}
        <div className="flex items-center gap-2 py-2.5">
            <Clock  className="size-4"/>
            <span className="text-caption-small font-normal">
                10:00 - 10:30 AM
            </span>
        </div>

    </div>
  )
}

export default MeetingOverview