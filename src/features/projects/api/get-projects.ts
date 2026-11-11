import { apiClient } from "@/lib/api-client"


import type { GetProjectsParams, ProjectsListResponse } from "../types/projects.api.types"


export async function getProjects(params: GetProjectsParams = {}) {
  const { data } = await apiClient.get<ProjectsListResponse>("/projects", { params })
  console.log("projects raw:", data) 
  return data
}
