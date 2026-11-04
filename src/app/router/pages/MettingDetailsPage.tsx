import Navbar from "@/components/common/Navbar/Navbar"
import MeetingInfo from "@/features/meetings/components/MeetingDetails/MeetingInfo"
import Transcripts from "@/features/meetings/components/MeetingDetails/Transcripts"

const MettingDetailsPage = () => {
  return (
    <>
    <Navbar />
    <div className="flex items-center">
      <MeetingInfo />
      <Transcripts />
    </div>
    </>
  )
}

export default MettingDetailsPage