
import { z } from "zod";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const meetingSchema = z.object({
  subject: z.string().trim().min(3, "Meeting subject must be at least 3 characters").max(100, "Meeting subject is too long"),
  date: z.string().min(1, "Please select a meeting date"),
  time: z.string().min(1, "Please select a meeting time"),
  duration: z.enum(["15", "30", "45", "60", "90", "120"], { message: "Please select a duration" }),
  guests: z.array(z.string()).min(1, "Please add at least one guest"),
  note: z.string().max(500, "Note cannot exceed 500 characters"),
});

type MeetingFormValues = z.infer<typeof meetingSchema>;

interface NewMeetingFormProps {
  onClose?: () => void;
  onSubmitMeeting?: (data: MeetingFormValues) => void | Promise<void>;
}

export default function MeetingForm({ onClose, onSubmitMeeting }: NewMeetingFormProps) {
  const [guestInput, setGuestInput] = useState("");

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<MeetingFormValues>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      subject: "",
      date: "",
      time: "",
      duration: "30",
      guests: [],
      note: "",
    },
  });

  const guests = watch("guests");

  const handleAddGuest = () => {
    const newGuest = guestInput.trim();
    if (!newGuest) return;

    const alreadyExists = guests.some(
      (guest) => guest.toLowerCase() === newGuest.toLowerCase()
    );
    if (alreadyExists) return;

    setValue("guests", [...guests, newGuest], {
      shouldValidate: true,
      shouldDirty: true,
    });
    setGuestInput("");
  };

  const handleRemoveGuest = (guestToRemove: string) => {
    setValue("guests", guests.filter((guest) => guest !== guestToRemove), {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleFormSubmit = async (data: MeetingFormValues) => {
    try {
      if (onSubmitMeeting) {
        await onSubmitMeeting(data);
      } else {
        console.log("Meeting Data:", data);
      }
    } catch (error) {
      console.error("Failed to create meeting:", error);
    }
  };

  return (
    <div className="w-full bg-white p-5 sm:p-6">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">New Meeting</h2>
        <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close">
          <span className="text-2xl">×</span>
        </Button>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Meeting Subject</label>
          <Input {...register("subject")} placeholder="Meeting Subject" className="h-14 rounded-xl" />
          {errors.subject && <p className="text-sm text-red-500">{errors.subject.message}</p>}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Select Date</label>
            <Input type="date" {...register("date")} className="h-14 rounded-xl" />
            {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Select Time</label>
            <Input type="time" {...register("time")} className="h-14 rounded-xl" />
            {errors.time && <p className="text-sm text-red-500">{errors.time.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Select Duration</label>
            <Controller
              name="duration"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-14 rounded-xl">
                    <SelectValue placeholder="Select Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 Minutes</SelectItem>
                    <SelectItem value="30">30 Minutes</SelectItem>
                    <SelectItem value="45">45 Minutes</SelectItem>
                    <SelectItem value="60">1 Hour</SelectItem>
                    <SelectItem value="90">1.5 Hours</SelectItem>
                    <SelectItem value="120">2 Hours</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.duration && <p className="text-sm text-red-500">{errors.duration.message}</p>}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-600">Add Guests</label>
          <div className="relative flex gap-2">
            <Input
              value={guestInput}
              onChange={(e) => setGuestInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddGuest();
                }
              }}
              placeholder="@Enter guest name"
              className="h-14 rounded-xl"
            />
            <Button type="button" onClick={handleAddGuest} className="absolute right-0 h-14 rounded-full px-7 transition duration-300 bg-black text-white cursor-pointer hover:bg-black/90">
              Add +
            </Button>
          </div>

          {errors.guests && <p className="text-sm text-red-500">{errors.guests.message}</p>}

          <div className="flex flex-wrap gap-3 pt-2">
            {guests.map((guest) => (
              <div key={guest} className="flex items-center gap-2 rounded-full bg-gray-100 py-2 pl-4 pr-2">
                <span className="text-sm font-medium text-gray-700">{guest}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveGuest(guest)}
                  className="flex size-6 items-center justify-center rounded-full text-gray-500 hover:bg-gray-200 hover:text-red-500"
                  aria-label={`Remove ${guest}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Add Note</label>
          <textarea
            {...register("note")}
            placeholder="Add a note..."
            className="w-full rounded-md border p-3"
          />
          <div className="flex justify-between">
            {errors.note ? <p className="text-sm text-red-500">{errors.note.message}</p> : <span />}
            <span className="text-xs text-gray-400">{watch("note").length}/500</span>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-14 w-full cursor-pointer rounded-full bg-primary-blue-500 text-base font-semibold transition duration-300 hover:bg-primary-blue-700"
        >
          {isSubmitting ? "Creating Meeting..." : "Add Meeting"}
        </Button>
      </form>
    </div>
  );
}
