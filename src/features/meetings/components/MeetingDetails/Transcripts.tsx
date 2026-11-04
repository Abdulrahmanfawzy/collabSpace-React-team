import SearchInput from "@/components/common/SearchInput"
import TranscriptsHeader from "./TranscriptsHeader"
import TranscriptCard from "./TranscriptCard"

const Transcripts = () => {
  
  const transcripts = [
    {time : "00:01" , name : "Mohanad Wahib" , text:"Good morning everyone. Thanks for joining on time. Today we’ll focus on reviewing the latest design updates and aligning on next steps."},
    {time : "00:40" , name : "Ahmed Hassan" , text:"Morning. I went through the new homepage design, and overall it looks cleaner, but I think we still have some usability issues to address."},
    {time : "01:23" , name : "Omar Khaled" , text:"I agree. The layout is better, but the call-to-action isn’t very clear, especially for first-time users."},
    {time : "02:01" , name : "Mohanad Wahib" , text:"From a UX perspective, the sign-up flow also feels a bit long. Users might drop off before completing the process."},
    {time : "04:48" , name : "Mahmoud Ashraf" , text:"That’s a good point. Do you think we should reduce the number of required fields in the first step?"},
    {time : "06:15" , name : "Ahmed Hassan" , text:"Good morning everyone. Let’s begin today’s meeting by reviewing the project timeline and assigning tasks for the next phase."},
  ]

  return (
    <section className="w-133 bg-white rounded-4xl px-4 py-17 flex flex-col gap-5 ml-8 mr-13 mt-10">
        <TranscriptsHeader />
        <SearchInput placeholder="Search Transcript" width={"full"} style={"bg-background-secondary pr-4 pl-11"} iconStyle="left-4"/>
        <div className="flex flex-col gap-5">
          {transcripts?.map(t => (
             <TranscriptCard key={t.time} time={t.time} name={t.name} text={t.text}/>
          ))}
        </div>
    </section>
  )
}

export default Transcripts