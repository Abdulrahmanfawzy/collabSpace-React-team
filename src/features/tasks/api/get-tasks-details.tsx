
import { apiClient } from "@/lib/api-client"
import type { TaskDetailsResponse } from "../types/tasks.types.api"

export async function getTaskDetails(taskId: number) {
  const { data } = await apiClient.get<TaskDetailsResponse>(
    `/tasks/${taskId}`
  )

  return data.data
}
