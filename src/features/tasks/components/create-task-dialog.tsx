import { useState } from "react"
import { Plus } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
 import { teamOptions } from "@/features/teams/data/team-options"
 import { projectOptions } from "@/features/projects/data/project-options"
import { createTaskSchema } from "../schemas/task.schema"
import type { CreateTaskValues } from "../schemas/task.schema"
import { TASK_STATUSES, TASK_STATUS_LABELS } from "../types/task.types"

export function CreateTaskDialog() {
  const [open, setOpen] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTaskValues>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      name: "",
      description: "",
      team: "",
      project: "",
      status: "todo",
    },
  })

  const onSubmit = (values: CreateTaskValues) => {
    console.log("Create task:", values) 
    reset()
    setOpen(false)
  }

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (!next) reset()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-primary-blue-500 hover:bg-primary-blue-600 rounded-2xl px-6">
          Create Task <Plus size={14} />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField label="Task Name" htmlFor="name" error={errors.name?.message}>
            <Input id="name" placeholder="Enter task name" {...register("name")} />
          </FormField>

          <FormField label="Description" htmlFor="description">
            <Textarea id="description" rows={3} {...register("description")} />
          </FormField>

          <FormField label="Assigned Team" error={errors.team?.message}>
            <Controller
              name="team"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select team" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>

          <FormField label="Project" error={errors.project?.message}>
            <Controller
              name="project"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
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
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TASK_STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {TASK_STATUS_LABELS[s]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>

          <FormField label="Attachments" htmlFor="attachments">
            <Input id="attachments" type="file" multiple {...register("attachments")} />
          </FormField>

          <DialogFooter>
            <Button type="submit" className="bg-primary-blue-500 hover:bg-primary-blue-600 rounded-2xl px-6">
              Create Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}