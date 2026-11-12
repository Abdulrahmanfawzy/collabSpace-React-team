
import { apiClient } from "@/lib/api-client"
import type {
  TaskDetailsResponse,
  UpdateTaskStatusRequest,
} from "../types/tasks.types.api"

export async function updateTaskStatus(
  taskId: number,
  payload: UpdateTaskStatusRequest
) {
  const { data } = await apiClient.patch<TaskDetailsResponse>(
    `/tasks/${taskId}/status`,
    payload
  )

  return data.data
}
