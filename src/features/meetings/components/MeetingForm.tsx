/* eslint-disable react-refresh/only-export-components */
import { z } from "zod";
import { useState, useEffect } from "react";
import { useForm, Controller, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import type { User } from "../api/users-api";


//  Schema 

export const meetingSchema = z.object({
  subject: z.string().trim()
    .min(3, "Meeting subject must be at least 3 characters")
    .max(100, "Meeting subject is too long"),

  date: z.string().min(1, "Please select a meeting date"),

  time: z.string().min(1, "Please select a meeting time"),

  duration: z.enum(["15", "30", "45", "60", "90", "120"], { message: "Please select a duration" }),

  participants: z.array(z.number()).min(1, "Please add at least one participant"),

  note: z.string().max(500, "Note cannot exceed 500 characters"),
});


export const createMeetingSchema = meetingSchema;

export const updateMeetingSchema = meetingSchema.omit({
  participants: true,
  note: true,
});

export type createMeetingValues = z.infer<typeof createMeetingSchema>;
export type updateMeetingValues = z.infer<typeof updateMeetingSchema>;

type MeetingFormValues = createMeetingValues | updateMeetingValues;


//  Props 

interface MeetingFormProps {
  onClose?: () => void;
  onSubmitMeeting?: (
    data: MeetingFormValues
  ) => void | Promise<void>;
  isLoading?: boolean;
  users?: User[];
  isUpdate?: boolean;
  meeting?: Partial<createMeetingValues>;
}


//  Component 

export default function MeetingForm({
  onClose,
  onSubmitMeeting,
  isLoading = false,
  users,
  isUpdate = false,
  meeting,
}: MeetingFormProps) {

  const [guestInput, setGuestInput] = useState("");

  const schema = isUpdate ? updateMeetingSchema : createMeetingSchema;

  const { register, handleSubmit, control, watch, setValue, reset, formState: { errors, isSubmitting }
 } = useForm<createMeetingValues>({
    resolver: zodResolver(schema) as unknown as Resolver<createMeetingValues>,
    defaultValues: {
      subject: "",
      date: "",
      time: "",
      duration: "30",
      participants: [],
      note: "",
    },
  });

  useEffect(() => {
    if (isUpdate && meeting) {
      reset({
        subject: meeting.subject ?? "",
        date: meeting.date ?? "",
        time: meeting.time ?? "",
        duration: meeting.duration ?? "30",
        participants: meeting.participants ?? [],
        note: meeting.note ?? "",
      });
    } else if (!isUpdate) {
      reset({
        subject: "",
        date: "",
        time: "",
        duration: "30",
        participants: [],
        note: "",
      });
    }
  }, [isUpdate, meeting, reset]);

  const participants = watch("participants");

  //  Add Participant 

  const handleAddGuest = () => {
    // check search value is empty or no
    const searchValue = guestInput.trim().toLowerCase();
    if (!searchValue) return;

    // check if search value exist in users list or no
    const selectedUser = users?.find(
      (user) =>
        user.name.toLowerCase() === searchValue ||
        user.email.toLowerCase() === searchValue
    );
    if (!selectedUser) return;

    // check if user exist in participants array or no
    const alreadyExists = participants.includes(selectedUser.id);
    if (alreadyExists) return;

    setValue("participants", [...participants, selectedUser.id],
      { shouldValidate: true, shouldDirty: true }
    );

    setGuestInput("");
  };

  //  Remove Participant 
const handleRemoveGuest = (userId: number) => {
    setValue("participants", participants.filter((id) => id !== userId),
      { shouldValidate: true, shouldDirty: true }
    );
  };

  //  Submit 

  const handleFormSubmit = async (data: createMeetingValues) => {
    try {
      if (onSubmitMeeting) {
        await onSubmitMeeting(data as MeetingFormValues);
      } else {
        console.log(isUpdate ? "Update Meeting:" : "Create Meeting:", data);
      }
    }
    catch (error) {
      console.error("Failed to submit meeting:", error);
    }
  };


  return (
    <div className="w-full bg-white p-5 sm:p-6">

      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">
          {isUpdate ? "Update Meeting" : "New Meeting"}
        </h2>

        <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close" >
          <span className="text-2xl cursor-pointer">x</span>
        </Button>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5" >

        {/* Meeting Subject */}
        <div className="space-y-2 relative">
          <label className="text-small font-medium text-gray-600 absolute -top-3 left-4 bg-transparent z-99">
            Meeting Subject
          </label>

          <Input {...register("subject")} placeholder="Meeting Subject" className="h-14 rounded-xl"/>

          {errors.subject && <p className="text-small text-red-500"> {errors.subject.message} </p> }
        </div>

        {/* Date / Time / Duration */}
        <div className="grid grid-cols-1 gap-5 items-baseline-last sm:grid-cols-3">

          <div className="space-y-2 relative">
            <label className="text-small font-medium text-gray-600 absolute -top-3 left-4 bg-transparent z-99">
              Select Date
            </label>

            <Input type="date" {...register("date")} className="h-14 rounded-xl" />

            {errors.date && <p className="text-small text-red-500"> {errors.date.message} </p> }
          </div>

          <div className="space-y-2 relative">
            <label className="text-small font-medium text-gray-600 absolute -top-3 left-4 bg-transparent z-99">
              Select Time
            </label>

            <Input type="time" {...register("time")} className="h-14 rounded-xl" />

            {errors.time && <p className="text-small text-red-500"> {errors.time.message} </p> }
          </div>

          <div className="space-y-4 relative">
            <label className="text-small font-medium text-gray-600 absolute -top-3 left-4 bg-transparent z-99">
              Select Duration
            </label>

            <Controller
              name="duration"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="py-6 rounded-xl">
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

            {errors.duration && <p className="text-sm text-red-500"> {errors.duration.message} </p> }
          </div>

        </div>


        {/* Add Guests */}
        {!isUpdate && (
          <div className="space-y-3 relative">
            <label className="text-small font-medium text-gray-600 absolute -top-3 left-4 bg-transparent z-99">
              Add Guests
            </label>
            <div className="relative flex gap-2">
              <Input value={guestInput} onChange={(e) => setGuestInput(e.target.value)}
                placeholder="@Enter guest name or email"
                className="h-10 rounded-xl"
              />

              <Button type="button" onClick={handleAddGuest}
                className="absolute right-0 h-10 rounded-full px-7 transition duration-300 bg-black text-white cursor-pointer hover:bg-black/90"
              >
                Add +
              </Button>
            </div>

            {errors.participants && <p className="text-sm text-red-500"> {errors.participants.message} </p> }


            {/* Selected Guests */}
            <div className="flex flex-wrap gap-3 pt-2">
              {participants.map((userId) => {
                const guest = users?.find(
                  (user) => user.id === userId
                );

                if (!guest) return null;

                return (
                  <div
                    key={guest.id}
                    className="flex items-center gap-2 rounded-full bg-gray-100 py-2 pl-4 pr-2"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {guest.name}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleRemoveGuest(guest.id)}
                      className="flex size-6 items-center justify-center rounded-full text-gray-500 hover:bg-gray-200 hover:text-red-500"
                      aria-label={`Remove ${guest.name}`}
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}


        {/* Add Note */}
        {!isUpdate && (
          <div className="space-y-2 relative">
            <label className="text-sm font-medium text-gray-600 absolute -top-3 left-4 bg-transparent z-99">
              Add Note
            </label>

            <textarea {...register("note")} placeholder="Add a note..." className="w-full rounded-md border p-3" />

            <div className="flex justify-between">
              {errors.note && <p className="text-sm text-red-500"> {errors.note.message} </p> }

              <span className="text-caption-small text-gray-400"> {watch("note").length}/500 </span>
            </div>
          </div>
        )}


        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="py-4 w-full cursor-pointer rounded-full bg-primary-blue-500 text-base font-semibold transition duration-300 hover:bg-primary-blue-700"
        >
          {isSubmitting || isLoading
            ? isUpdate ? "Updating Meeting..." : "Creating Meeting..."
            : isUpdate ? "Update Meeting" : "Add Meeting"}
        </Button>
      </form>
    </div>
  );
}