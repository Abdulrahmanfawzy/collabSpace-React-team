import type { Project } from "../types/project.types"

const member = (id: number) => ({
  id,
  name: `Member ${id}`,
  avatar: `https://i.pravatar.cc/48?img=${id}`,
})

export const projectsMock: Project[] = [
  {
    id: 1,
    color:"purple",
    name: "Alpha",
    startDate: "2025-12-12",
    deadline: "2025-12-14",
    status: "In Progress",
    priority: "High",
    filesCount: 22,
    teams: [member(1), member(2), member(3)],
  },
  {
    id: 2,
    color:"teal",
    name: "SepetGo",
    startDate: "2025-12-12",
    deadline: "2025-12-14",
    status: "Completed",
    priority: "Medium",
    filesCount: 22,
    teams: [member(4), member(5), member(6)],
  },
]