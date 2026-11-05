import MeetingInfo from "@/features/meetings/components/MeetingDetails/MeetingInfo"
import Transcripts from "@/features/meetings/components/MeetingDetails/Transcripts"

const MettingDetailsPage = () => {
  return (
    <>
    <div className="flex items-center">
      <MeetingInfo />
      <Transcripts />
    </div>
    </>
  )
}

export default MettingDetailsPage