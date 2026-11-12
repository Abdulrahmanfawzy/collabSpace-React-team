
import { useState } from "react"
import { Plus } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

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

import { useProjects } from "@/features/projects/hooks/use-project"
import { useCreateTask } from "../hooks/use-create-task"
import { createTaskSchema } from "../schemas/task.schema"
import type { CreateTaskValues } from "../schemas/task.schema"
import { TASK_STATUSES, TASK_STATUS_LABELS } from "../types/task.types"

const statusMap = {
  todo: "Pending",
  "in-progress": "In Progress",
  "in-review": "In Review",
  completed: "Completed",
} as const

const priorities = ["Low", "Medium", "High", "Critical"] as const

export function CreateTaskDialog() {
  const [open, setOpen] = useState(false)

  const { mutate: createTask, isPending } = useCreateTask()

  const {
    data: projectsData,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
  } = useProjects()

  const projects = projectsData?.projects ?? []

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
      project: "",
      priority: "Medium",
      status: "todo",
    },
  })

  function onSubmit(values: CreateTaskValues) {
    createTask(
      {
        project_id: Number(values.project),
        name: values.name,
        description: values.description || undefined,
        priority: values.priority,
        status: statusMap[values.status],
      },
      {
        onSuccess: () => {
          toast.success("Task created successfully")
          reset()
          setOpen(false)
        },
        onError: () => {
          toast.error("Failed to create task")
        },
      }
    )
  }

  function handleOpenChange(next: boolean) {
    setOpen(next)

    if (!next) {
      reset()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="rounded-2xl bg-primary-blue-500 px-6 hover:bg-primary-blue-600">
          Create Task <Plus size={14} />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            label="Task Name"
            htmlFor="name"
            error={errors.name?.message}
          >
            <Input
              id="name"
              placeholder="Enter task name"
              {...register("name")}
            />
          </FormField>

          <FormField label="Description" htmlFor="description">
            <Textarea
              id="description"
              rows={3}
              {...register("description")}
            />
          </FormField>

          {/* Project */}
          <FormField
            label="Project"
            error={errors.project?.message}
          >
            <Controller
              name="project"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={
                    isProjectsLoading ||
                    isProjectsError ||
                    projects.length === 0
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        isProjectsLoading
                          ? "Loading projects..."
                          : isProjectsError
                            ? "Failed to load projects"
                            : projects.length === 0
                              ? "No projects available"
                              : "Select project"
                      }
                    />
                  </SelectTrigger>

                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem
                        key={project.id}
                        value={String(project.id)}
                      >
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>

          {/* Priority */}
          <FormField
            label="Priority"
            error={errors.priority?.message}
          >
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
                      <SelectItem
                        key={priority}
                        value={priority}
                      >
                        {priority}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>

          {/* Status */}
          <FormField label="Status" error={errors.status?.message}>
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
                    {TASK_STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {TASK_STATUS_LABELS[status]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>

          <DialogFooter>
            <Button
              type="submit"
              disabled={isPending || projects.length === 0}
              className="rounded-2xl bg-primary-blue-500 px-6 hover:bg-primary-blue-600"
            >
              {isPending ? "Creating..." : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
