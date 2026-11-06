import AiSummary from "./AiSummary"
import videoImage from '../../../../assets/images/Video-image.png'
import playIcon from '../../../../assets/images/play-video.png'
import Breadcrumb from "./Breadcrumb"
import MeetingOverview from "./MeetingOverview"

const MeetingInfo = () => {
  return (
    <section className="w-188 mt-11 ml-16 mb-14 ">

        <div className="flex flex-col gap-4">
          <Breadcrumb />
          <h1 className="font-semibold text-h4 ">
            Design Review 
          </h1>
        </div>

        <MeetingOverview />

        <div className='w-188 h-81 rounded-card overflow-hidden relative mt-5 mb-6'>
            <img src={videoImage} alt="Video Image" className='w-full h-full object-cover' />
            <img src={playIcon} alt="Video play icon" className='w-10 h-10 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2' />
        </div>
        
        <AiSummary />
    </section>
  )
}

export default MeetingInfo