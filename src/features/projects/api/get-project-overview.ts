import { apiClient } from "@/lib/api-client"
import type { ProjectOverviewResponse } from "../types/projects.api.types"


export async function getProjectOverview(id: number) {
  const { data } = await apiClient.get<ProjectOverviewResponse>(`/projects/${id}/overview`)
  return data
}