import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import MeetingForm from "./MeetingForm";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const MeetingsHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="ml-16 mr-16 mt-12 mb-10.5 flex items-center justify-between">
        <h1 className="text-h4 font-semibold">
          Meetings
        </h1>

        <Button
          variant="primary"
          onClick={() => setIsOpen(true)}
          className="py-3 pl-5 flex items-center gap-2 text-white rounded-4xl cursor-pointer transition duration-300"
        >
          Add Meeting
          <Plus className="size-4" />
        </Button>
      </section>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent showCloseButton={false} >
          <MeetingForm
            onClose={() => setIsOpen(false)}
            onSubmitMeeting={(data) => {
              console.log(data);
              setIsOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MeetingsHeader;