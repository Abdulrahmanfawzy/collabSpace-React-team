import avetar from '../../../../assets/images/profile-avtar.svg'

type TranscriptCardProps = {
    time : string, 
    name: string,
    text: string
}

const TranscriptCard = ({time , name , text} : TranscriptCardProps) => {
  return (
    <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
            <span className="p-2.5 rounded-4xl text-caption-small font-normal border border-border">
                {time}
            </span>

            <div className="flex items-center gap-2">
                <img src={avetar} alt="user image" className="w-8 h-8 rounded-full border-2"/>
                <span className="text-caption-small font-normal">
                    {name}
                </span>
            </div>
        </div>

        <p className="text-small font-normal">
            {text}
        </p>
    </div>
  )
}

export default TranscriptCard