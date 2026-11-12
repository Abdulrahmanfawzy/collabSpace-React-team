import { TeamsTab } from "@/features/teams/components/teams-tab"
import { useProjectTeams } from "../hooks/use-project"


export function ProjectTeamsPanel({ projectId }: { projectId: number }) {
  const { data: teams = [], isLoading, isError } = useProjectTeams(projectId)

  if (isLoading) return <p className="text-small text-secondary-gray-300">Loading...</p>
  if (isError) return <p className="text-small text-support-danger">Something went wrong</p>

  return <TeamsTab teams={teams} />
}