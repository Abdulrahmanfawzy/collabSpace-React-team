import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
import { teamOptions } from "@/features/teams/data/team-options"
import { PRIORITIES } from "@/types/common"
import { getErrorMessage } from "@/lib/api-error"
import { createProjectSchema } from "../schemas/project.schema"
import type { CreateProjectValues } from "../schemas/project.schema"
import { PROJECT_STATUSES } from "../types/project.types"
import type { Project } from "../types/project.types"
import {mapProjectToForm ,toUpdateProjectPayload} from "../mappers/project.mappers"

import {
  useUpdateProject,
  useAssignTeams,
  useRemoveTeam,
} from "../hooks/use-project-mutation"




interface EditProjectDialogProps {
  project: Project | null
  onOpenChange: (open: boolean) => void
}

export function EditProjectDialog({ project, onOpenChange }: EditProjectDialogProps) {
  const { mutate, isPending, isError, error, reset: resetMutation } = useUpdateProject();
   const assignTeams = useAssignTeams()  ;
  const removeTeam = useRemoveTeam() ;

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProjectValues>({
    resolver: zodResolver(createProjectSchema),
  })

 useEffect(() => {
  if (project) {
    reset(mapProjectToForm(project))
    resetMutation()
  }
 
}, [project, reset])

  const onSubmit = (values: CreateProjectValues) => {
  if (!project) return

  const oldIds = project.teams.map((t) => t.id)
  const newIds = values.teams.map(Number)
  const toAdd = newIds.filter((id) => !oldIds.includes(id))
  const toRemove = oldIds.filter((id) => !newIds.includes(id))

  mutate(
    { id: project.id, payload: toUpdateProjectPayload(values) },
    {
      onSuccess: () => {
        if (toAdd.length) assignTeams.mutate({ id: project.id, teamIds: toAdd })
        toRemove.forEach((teamId) =>
          removeTeam.mutate({ id: project.id, teamId })
        )
        onOpenChange(false)
      },
    }
  )
}

  return (
    <Dialog open={!!project} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField label="Project Name" htmlFor="name" error={errors.name?.message}>
            <Input id="name" {...register("name")} />
          </FormField>

          <FormField label="Description" htmlFor="description">
            <Textarea id="description" rows={3} {...register("description")} />
          </FormField>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Start Date" htmlFor="startDate" error={errors.startDate?.message}>
              <Input id="startDate" type="date" {...register("startDate")} />
            </FormField>
            <FormField label="Deadline" htmlFor="deadline" error={errors.deadline?.message}>
              <Input id="deadline" type="date" {...register("deadline")} />
            </FormField>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Priority">
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PRIORITIES.map((p) => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
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
                      {PROJECT_STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>
          </div>

          <FormField label="Teams" error={errors.teams?.message}>
            <Controller
              name="teams"
              control={control}
              render={({ field }) => (
                <div className="flex flex-wrap gap-4">
                  {teamOptions.map((t) => (
                    <label key={t.value} className="flex items-center gap-2 text-small">
                      <Checkbox
                        checked={field.value?.includes(t.value)}
                        onCheckedChange={(checked) =>
                          field.onChange(
                            checked
                              ? [...(field.value ?? []), t.value]
                              : (field.value ?? []).filter((v) => v !== t.value)
                          )
                        }
                      />
                      {t.label}
                    </label>
                  ))}
                </div>
              )}
            />
          </FormField>

          {isError && (
            <p className="text-caption text-support-danger">{getErrorMessage(error)}</p>
          )}

          <DialogFooter>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-primary-blue-500 hover:bg-primary-blue-600"
            >
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}