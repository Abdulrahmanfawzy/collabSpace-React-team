import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Member } from "@/types/common"

interface AvatarGroupProps {
  members: Member[]
  max?: number
}

export function AvatarGroup({ members, max = 3 }: AvatarGroupProps) {
  const visibleMembers = members.slice(0, max)
  const extraCount = members.length - max

  return (
    <div className="flex -space-x-2">
      {visibleMembers.map((member) => (
        <Avatar key={member.id} className="h-6 w-6 border-2 border-white">
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback>{member.name[0]}</AvatarFallback>
        </Avatar>
      ))}

      {extraCount > 0 && (
        <Avatar className="h-6 w-6 border-2 border-white">
          <AvatarFallback>+{extraCount}</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}