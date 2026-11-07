const AiSummary = () => {
  return (
    <div className="w-188 h-95">
    
        <div className="w-78">
            <span className="cursor-pointer p-2.5 text-small font-normal rounded-t-lg bg-background-secondary transition duration-300 ">Ai Summary</span>
            <span className="cursor-pointer p-2.5 text-small font-normal rounded-t-lg bg-transparent transition duration-300 hover:bg-background-secondary">Note</span>
            <span className="cursor-pointer p-2.5 text-small font-normal rounded-t-lg bg-transparent transition duration-300 hover:bg-background-secondary">Comments</span>
        </div>

        <div className="w-full h-86 rounded-tr-4xl rounded-b-4xl pt-5 pb4 px-4 flex flex-col gap-6 bg-background-secondary">
            <h3 className="font-medium text-h5 leading-4 ">
                AI Generate Summary
            </h3>

            <div className="w-full flex flex-col gap-6">
                <span className="font-medium text-h6  ">
                    Key Points
                </span>

                <ul className="flex flex-col gap-5 list-disc">
                    <li className="font-normal text-body leading-4">
                        • The team reviewed the latest homepage design and agreed on the proposed layout.
                    </li>
                    <li className="font-normal text-body leading-4">
                        • Several usability improvements were suggested for the sign-up flow.
                    </li>
                    <li className="font-normal text-body leading-4">
                        • Final color decisions were postponed to the next meeting.
                    </li>
                    <li className="font-normal text-body leading-4">
                        •The design team was asked to update the wireframes based on feedback.
                    </li>
                    <li className="font-normal text-body leading-4">
                        • A follow-up review meeting was scheduled for next week.
                    </li>
                </ul>
            </div>

        </div>
    
    </div>
    
  )
}

export default AiSummary