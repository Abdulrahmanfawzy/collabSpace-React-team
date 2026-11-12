import { apiClient } from "@/lib/api-client"
import type { CreateTaskRequest } from "../types/tasks.types.api"

export async function createTask(payload: CreateTaskRequest) {
  const { data } = await apiClient.post("/tasks", payload)

  return data
}