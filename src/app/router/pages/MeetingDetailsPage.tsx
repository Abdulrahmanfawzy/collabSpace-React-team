import MeetingInfo from "@/features/meetings/components/MeetingDetails/MeetingInfo";
import Transcripts from "@/features/meetings/components/MeetingDetails/Transcripts";
import { useParams } from "react-router-dom";

const MeetingDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <>
      <div className="app-container flex items-start">
        <MeetingInfo id={id}/>
        <Transcripts id={id}/>
      </div>
    </>
  );
};

export default MeetingDetailsPage;
