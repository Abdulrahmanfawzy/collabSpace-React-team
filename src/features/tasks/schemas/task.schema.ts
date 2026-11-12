import { z } from "zod"
import { TASK_STATUSES } from "../types/task.types"

export const createTaskSchema = z.object({
  name: z.string().min(1, "Task name is required").max(255),
  description: z.string(),
  project: z.string().min(1, "Project is required"),
  priority: z.enum(["Low", "Medium", "High", "Critical"]),
  status: z.enum(TASK_STATUSES),
})

export type CreateTaskValues = z.infer<typeof createTaskSchema>