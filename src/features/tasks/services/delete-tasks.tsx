
import { apiClient } from "@/lib/api-client"

export async function deleteTask(taskId: number) {
  const { data } = await apiClient.delete(`/tasks/${taskId}`)
  return data
}

