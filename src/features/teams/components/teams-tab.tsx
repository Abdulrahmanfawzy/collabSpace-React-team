import { TeamCard } from "./team-card"
import type { Team } from "../types/team.types"

interface TeamsTabProps {
  teams: Team[]
}

export function TeamsTab({ teams }: TeamsTabProps) {
  return (
    <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-4">
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  )
}