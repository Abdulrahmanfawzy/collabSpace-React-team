
import { useQuery } from "@tanstack/react-query"
import { getTeams } from "../api/get-teams"
import { teamKeys } from "../api/teams-keys"

export function useTeams(params: { page?: number; per_page?: number } = {}) {
  return useQuery({
    queryKey: teamKeys.list(params),
    queryFn: () => getTeams(params),
    select: (response) => response.data.data,
  })
}
