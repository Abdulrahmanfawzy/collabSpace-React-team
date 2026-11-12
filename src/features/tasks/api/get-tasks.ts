import { apiClient } from "@/lib/api-client"
import type { GetTasksParams, TasksListResponse } from "../types/tasks.types.api"


export async function getTasks(params: GetTasksParams = {}) {
  console.log("assigned_to:", params.assigned_to);
console.log("project_id:", params.project_id);


  const { data } = await apiClient.get<TasksListResponse>("/tasks", {
    params,
  })
console.log("Tasks API Response:", data);
  return data
}