import { useMutation, useQueryClient } from "@tanstack/react-query"

import {
  assignTeamsToProject,
  createProject,
  deleteProject,
  removeTeamFromProject,
  updateProject,
} from "../services/project-service"
import { projectKeys } from "../api/projects-keys"

export function useCreateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() })
    },
  })
}

export function useUpdateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProject,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() })
      queryClient.invalidateQueries({ queryKey: projectKeys.overview(variables.id) })
    },
  })
}

export function useAssignTeams() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: assignTeamsToProject,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.teams(variables.id) })
      queryClient.invalidateQueries({ queryKey: projectKeys.overview(variables.id) })
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() })
    },
  })
}

export function useRemoveTeam() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: removeTeamFromProject,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.teams(variables.id) })
      queryClient.invalidateQueries({ queryKey: projectKeys.overview(variables.id) })
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() })
    },
  })
}

export function useDeleteProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() })
      queryClient.removeQueries({ queryKey: projectKeys.overview(id) })
      queryClient.removeQueries({ queryKey: projectKeys.teams(id) })
    },
  })
}