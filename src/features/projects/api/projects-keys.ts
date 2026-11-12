import type { GetProjectsParams } from "../types/projects.api.types";


export const projectKeys = {
  all: ["projects"] as const,
  lists: () => [...projectKeys.all, "list"] as const,
  list: (params: GetProjectsParams) => [...projectKeys.lists(), params] as const,
  detail: (id: number) => [...projectKeys.all, "detail", id] as const,
  overview: (id: number) =>
    [...projectKeys.detail(id), "overview"] as const,

  teams: (id: number) =>
    [...projectKeys.detail(id), "teams"] as const,
}


