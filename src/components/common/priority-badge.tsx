import { Badge } from "@/components/ui/badge"
import type { Priority } from "@/types/common"

const variantMap = {
  Low: "low",
  Medium: "medium",
  High: "high",
  Critical: "critical",
} as const

interface PriorityBadgeProps {
  priority: Priority
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return <Badge variant={variantMap[priority]}>{priority}</Badge>
}