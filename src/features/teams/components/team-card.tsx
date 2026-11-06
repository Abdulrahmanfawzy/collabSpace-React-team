import { BadgeCheck } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import type { Team, TeamColor } from "../types/team.types"


const headerStyles: Record<TeamColor, string> = {
  pink: "bg-support-pink/10 text-support-pink",
  purple: "bg-support-purple/10 text-support-purple",
  teal: "bg-support-success/10 text-support-success",
  gray: "bg-secondary-gray-50 text-secondary-gray-500",
}

const pad = (n: number) => String(n).padStart(2, "0")

interface TeamCardProps {
  team: Team
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    <section className="overflow-hidden rounded-base border border-secondary-gray-50 bg-white">
      <header className={`flex items-center justify-between px-4 py-4 ${headerStyles[team.color]}`}>
        <h2 className="text-body font-semibold text-secondary-gray-700">{team.name}</h2>
        <span className="text-caption">{team.completion}% Completed</span>
      </header>

      <div className="flex flex-col gap-4 p-4">
        <div className="flex justify-between text-caption text-secondary-gray-300">
          <span>Name</span>
          <span>Tasks</span>
        </div>

        {team.members.map((m) => (
          <div key={m.id} className="flex items-center gap-3">
            <div className="relative shrink-0">
              <Avatar className="h-9 w-9">
                <AvatarImage src={m.avatar} alt={m.name} />
                <AvatarFallback>{m.name[0]}</AvatarFallback>
              </Avatar>
              {m.isLeader && (
                <BadgeCheck
                  size={16}
                  className="absolute -left-1 -top-1 fill-primary-blue-500 text-white"
                />
              )}
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <span className="truncate text-small">{m.name}</span>
                <span className="text-caption text-secondary-gray-300">{m.role}</span>
              </div>
              <Progress value={(m.tasksDone / m.tasksTotal) * 100} className="h-1" />
            </div>

            <span className="shrink-0 text-caption">
              {pad(m.tasksDone)}/{m.tasksTotal}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}