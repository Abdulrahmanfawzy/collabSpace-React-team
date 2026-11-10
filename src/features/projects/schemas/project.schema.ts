import { z } from "zod"
import { PRIORITIES } from "@/types/common"
import { PROJECT_STATUSES } from "../types/project.types"

export const createProjectSchema = z
  .object({
    name: z.string().min(1, "Project name is required"),
    description: z.string(),
    startDate: z.string().min(1, "Start date is required"),
    deadline: z.string().min(1, "Deadline is required"),
    priority: z.enum(PRIORITIES),
    status: z.enum(PROJECT_STATUSES),
    teams: z.array(z.string()).min(1, "Select at least one team"),
    files: z.custom<FileList>().optional(),
  })
  .refine((d) => !d.startDate || !d.deadline || d.deadline >= d.startDate, {
    message: "Deadline must be after the start date",
    path: ["deadline"],
  })

export type CreateProjectValues = z.infer<typeof createProjectSchema>