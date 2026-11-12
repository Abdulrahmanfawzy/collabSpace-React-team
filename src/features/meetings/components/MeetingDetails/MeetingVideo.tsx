interface MeetingVideoProps {
  meetingLink: string;
}

const MeetingVideo = ({ meetingLink }: MeetingVideoProps) => {

  if (!meetingLink) return null;

  return (
    <div className="w-188 h-81 rounded-card overflow-hidden relative mt-5 mb-6">
      <iframe
        src={meetingLink}
        title="Meeting Room"
        allow="camera; microphone; fullscreen; display-capture; autoplay"
        allowFullScreen
        className="aspect-video absolute inset-0 w-full border-0"
      />
    </div>
  );
};

export default MeetingVideo;
