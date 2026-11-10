// import SharedDropdown from "@/components/common/SharedDropdown"


const TranscriptsHeader = () => {
  // const items = [
  //   { label: "English", value: "english" },
  //   { label: "العربية", value: "arabic" },
  // ];

  return (
    <div className="w-full flex items-center  gap-4">
        <h2 className="text-h5 font-medium grow">
            Meeting Transcripts
        </h2>

        {/* <SharedDropdown
          text="English"
          items={items}
          className="gap-2.5 py-2.5 pr-2.5 pl-3"
        /> */}
    </div>
  )
}

export default TranscriptsHeader