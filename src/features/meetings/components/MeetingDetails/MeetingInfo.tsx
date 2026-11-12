import { useGetMeetingDetails } from "../../hooks/useGetMeetingDetails";
import AiSummary from "./AiSummary";
import Breadcrumb from "./Breadcrumb";
import MeetingOverview from "./MeetingOverview";
import MeetingVideo from "./MeetingVideo";

type props = {
  id: string | undefined
}

const MeetingInfo = ({id} : props) => {
  
  const { data, isLoading } = useGetMeetingDetails(Number(id));

  const meeting = data?.data;

  if (isLoading) return <div className="mt-11  animate-pulse h-96 bg-muted rounded-4xl " />;

  return (
    <section className="mt-11  mb-14">
      <div className="flex flex-col gap-4">
        <Breadcrumb title={meeting?.title} />
        <h1 className="font-semibold text-h4">{meeting?.title}</h1>
      </div>

      <MeetingOverview meeting={meeting} />

      <MeetingVideo meetingLink="https://meet.jit.si/CollabSpaceTestRoom123"/>

      <AiSummary id={id}/>
    </section>
  );
};

export default MeetingInfo;