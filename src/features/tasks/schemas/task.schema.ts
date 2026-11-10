import { z } from "zod"
import { TASK_STATUSES } from "../types/task.types"

export const createTaskSchema = z.object({
  name: z.string().min(1, "Task name is required"),
  description: z.string(),
  team: z.string().min(1, "Assigned team is required"),
  project: z.string().min(1, "Project is required"),
  status: z.enum(TASK_STATUSES),
  attachments: z.custom<FileList>().optional(),
})

export type CreateTaskValues = z.infer<typeof createTaskSchema>