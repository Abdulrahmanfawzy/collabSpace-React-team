import { BadgeCheck } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { TeamMember } from "../types/project.types"

interface TeamMembersCardProps {
  members: TeamMember[]
}

export function TeamMembersCard({ members }: TeamMembersCardProps) {
  return (
    <Card className="rounded-base">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-h6 font-semibold">Team Members</CardTitle>

        <Select defaultValue="ui-ux">
          <SelectTrigger className="h-8 w-28 border-0 shadow-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ui-ux">UI/UX</SelectItem>
            <SelectItem value="frontend">Frontend</SelectItem>
            <SelectItem value="backend">Backend</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {members.map((member) => (
          <div key={member.id} className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-9 w-9">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
              {member.isLeader && (
                <BadgeCheck
                  size={16}
                  className="absolute -left-1 -top-1 fill-primary-blue-500 text-white"
                />
              )}
            </div>

            <span className="text-small">{member.name}</span>

            {member.role && (
              <span className="text-caption text-secondary-gray-300">{member.role}</span>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}