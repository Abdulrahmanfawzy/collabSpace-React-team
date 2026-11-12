
import { apiClient } from "@/lib/api-client"
import type {
  TaskDetailsResponse,
  UpdateTaskRequest,
} from "../types/tasks.types.api"

export async function updateTask(
  taskId: number,
  payload: UpdateTaskRequest
) {
  const { data } = await apiClient.put<TaskDetailsResponse>(
    `/tasks/${taskId}`,
    payload
  )

  return data.data
}
