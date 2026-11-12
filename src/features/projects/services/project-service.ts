import { apiClient } from "@/lib/api-client"
import type { ApiResponse } from "@/types/api"
import type { AssignTeamsPayload, CreateProjectPayload, ProjectListItemResponse, UpdateProjectPayload } from "../types/projects.api.types";

  

export async function createProject(payload: CreateProjectPayload) {
  const { data } = await apiClient.post<ApiResponse<ProjectListItemResponse>>("/projects", payload)
  return data
}

export async function updateProject({ id, payload }: { id: number; payload: UpdateProjectPayload }) {
  const { data } = await apiClient.put<ApiResponse<ProjectListItemResponse>>(`/projects/${id}`, payload)
  return data
}

export async function deleteProject(id: number) {
  await apiClient.delete(`/projects/${id}`)
}

export async function assignTeamsToProject({ id, teamIds }: { id: number; teamIds: number[] }) {
  const body: AssignTeamsPayload = { team_ids: teamIds }
  await apiClient.post(`/projects/${id}/teams`, body)
}

export async function removeTeamFromProject({ id, teamId }: { id: number; teamId: number }) {
  await apiClient.delete(`/projects/${id}/teams/${teamId}`)
}