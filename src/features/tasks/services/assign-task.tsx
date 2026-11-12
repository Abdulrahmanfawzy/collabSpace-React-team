
import { apiClient } from "@/lib/api-client"
import type {
  TaskDetailsResponse,
  AssignTaskRequest,
} from "../types/tasks.types.api"

export async function assignTask(
  taskId: number,
  payload: AssignTaskRequest
) {
  const { data } = await apiClient.patch<TaskDetailsResponse>(
    `/tasks/${taskId}/assign`,
    payload
  )

  return data.data
}
