
import { useEffect, useState } from "react"
import { Pencil } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormField } from "@/components/common/form-field"

import { useUpdateTask } from "../hooks/use-update-task"
import type { TaskDetailsItem } from "../types/tasks.types.api"

interface EditTaskDialogProps {
  task: TaskDetailsItem
}

interface EditTaskValues {
  name: string
  description: string
  priority: "Low" | "Medium" | "High" | "Critical"
  status: "Pending" | "In Progress" | "In Review" | "Completed"
  due_date: string
}

const priorities = ["Low", "Medium", "High", "Critical"] as const

const statuses = [
  "Pending",
  "In Progress",
  "In Review",
  "Completed",
] as const

export function EditTaskDialog({ task }: EditTaskDialogProps) {
  const [open, setOpen] = useState(false)

  const { mutate: updateTask, isPending } = useUpdateTask()

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditTaskValues>({
    defaultValues: {
      name: task.name,
      description: task.description ?? "",
      priority: task.priority,
      status: task.status,
      due_date: task.due_date?.slice(0, 10) ?? "",
    },
  })

  useEffect(() => {
    if (open) {
      reset({
        name: task.name,
        description: task.description ?? "",
        priority: task.priority,
        status: task.status,
        due_date: task.due_date?.slice(0, 10) ?? "",
      })
    }
  }, [open, task, reset])

  function onSubmit(values: EditTaskValues) {
    updateTask(
      {
        taskId: task.id,
        payload: {
          name: values.name,
          description: values.description,
          priority: values.priority,
          status: values.status,
          due_date: values.due_date || null,
        },
      },
      {
        onSuccess: () => {
          toast.success("Task updated successfully")
          setOpen(false)
        },
        onError: () => {
          toast.error("Failed to update task")
        },
      }
    )
  }

  function handleOpenChange(next: boolean) {
    setOpen(next)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Button
        variant="outline"
        className="rounded-xl"
        onClick={() => setOpen(true)}
      >
        <Pencil size={16} />
        Edit Task
      </Button>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            label="Task Name"
            htmlFor="edit-task-name"
            error={errors.name?.message}
          >
            <Input
              id="edit-task-name"
              placeholder="Enter task name"
              required
              {...register("name", {
                required: "Task name is required",
              })}
            />
          </FormField>

          <FormField label="Description" htmlFor="edit-task-description">
            <Textarea
              id="edit-task-description"
              rows={3}
              {...register("description")}
            />
          </FormField>

          <FormField label="Priority">
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>

                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priority}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>

          <FormField label="Status">
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>

                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>

          <FormField label="Due Date" htmlFor="edit-task-due-date">
            <Input
              id="edit-task-due-date"
              type="date"
              {...register("due_date")}
            />
          </FormField>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending}
              className="rounded-2xl bg-primary-blue-500 px-6 hover:bg-primary-blue-600"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
