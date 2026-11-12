
import { apiClient } from "@/lib/api-client"
import type {
  GetTeamsParams,
  GetTeamsResponse,
} from "../types/tasks.types.api"

export async function getTeams(params: GetTeamsParams = {}) {
  const { data } = await apiClient.get<GetTeamsResponse>("/teams", {
    params,
  })

  return data
}
