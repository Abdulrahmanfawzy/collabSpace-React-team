import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
// import { PlusIcon } from "lucide-react"

const MeetingsHeader = () => {
  return (
    <section className="ml-16.25 mr-16  mt-12 mb-10.5 flex items-center justify-between">
        <h1 className="text-h4 font-semibold ">
            Meetings
        </h1>

        <Button variant={"primary"} className="py-3 pl-5 flex items-center gap-2 text-white rounded-4xl cursor-pointer transition duration-300">
            Add Meeting
            <Plus className="size-4" />
        </Button>
    </section>
  )
}

export default MeetingsHeader