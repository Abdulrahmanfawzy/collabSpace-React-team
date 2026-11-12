import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getProjectOverview } from "../api/get-project-overview"
import { getProjectTeams } from "../api/get-project-teams"
import { getProjects } from "../api/get-projects"
import { mapProjectListItem, mapProjectOverview, mapProjectTeam } from "../mappers/project.mappers"
import { projectKeys } from "../api/projects-keys"
import type { GetProjectsParams } from "../types/projects.api.types"

export function useProjects(params: GetProjectsParams = {}) {
  return useQuery({
    queryKey: projectKeys.list(params),
    queryFn: () => getProjects(params),
    placeholderData: keepPreviousData,
    select: (res) => ({
  projects: res.data.data.map(mapProjectListItem),
  total: res.data.total,
}),
  })
}

export function useProjectOverview(id: number) {
  return useQuery({
    queryKey: projectKeys.overview(id),
    queryFn: () => getProjectOverview(id),
    enabled: Number.isFinite(id),
    select: (res) => mapProjectOverview(res.data),
  })
}

export function useProjectTeams(id: number) {
  return useQuery({
    queryKey: projectKeys.teams(id),
    queryFn: () => getProjectTeams(id),
    enabled: Number.isFinite(id),
    select: (res) => res.data.map(mapProjectTeam),
  })
}