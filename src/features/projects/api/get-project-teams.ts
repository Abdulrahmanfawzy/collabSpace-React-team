import { apiClient } from "@/lib/api-client"
import type { ProjectTeamsResponse } from "../types/projects.api.types"


export async function getProjectTeams(id: number) {
  const { data } = await apiClient.get<ProjectTeamsResponse>(`/projects/${id}/teams`)
  return data
}