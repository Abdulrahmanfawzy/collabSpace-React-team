export type TeamColor = "pink" | "purple" | "teal" | "gray"

export interface TeamMemberProgress {
  id: number
  name: string
  avatar: string
  role: string
  isLeader?: boolean
  tasksDone: number
  tasksTotal: number
}

export interface Team {
  id: number
  name: string
  color: TeamColor
  completion: number
  members: TeamMemberProgress[]
}
