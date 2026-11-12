import type { GetTasksParams } from "../types/tasks.types.api";


export const taskKeys = {
    all: ["tasks"] as const,
    lists: () => [...taskKeys.all, "list"] as const,
    list: (params: GetTasksParams) => [...taskKeys.lists(), params] as const,
     details: () => [...taskKeys.all, "detail"] as const,
  detail: (id: number) => [...taskKeys.details(), id] as const,
}