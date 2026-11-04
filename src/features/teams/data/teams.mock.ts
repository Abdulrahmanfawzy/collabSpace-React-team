import type { Team, TeamMemberProgress } from "../types/team.types"

const member = (
  id: number,
  role: string,
  tasksDone: number,
  isLeader = false
): TeamMemberProgress => ({
  id,
  name: "Mohanad wahib",
  avatar: `https://i.pravatar.cc/48?img=${id}`,
  role,
  isLeader,
  tasksDone,
  tasksTotal: 20,
})

export const teamsMock: Team[] = [
  {
    id: 1,
    name: "UI/UX",
    color: "pink",
    completion: 42,
    members: [
      member(1, "Leader", 12, true),
      member(2, "UI Designer", 9),
      member(3, "UX Designer", 14),
      member(4, "UX Researcher", 18),
      member(5, "Product Designer", 4),
      member(6, "Visual Designer", 5),
    ],
  },
  {
    id: 2,
    name: "Frontend",
    color: "purple",
    completion: 42,
    members: [
      member(7, "Front Leader", 12, true),
      member(8, "React Dev", 9),
      member(9, "Frontend Dev", 14),
      member(10, "UI Engineer", 18),
      member(11, "Frontend Dev", 4),
    ],
  },
  {
    id: 3,
    name: "Backend",
    color: "teal",
    completion: 42,
    members: [
      member(12, "Back Leader", 12, true),
      member(13, "Backend Dev", 9),
      member(14, "API Engineer", 14),
      member(15, "Backend Dev", 18),
      member(16, "Database Engineer", 4),
      member(17, "Junior Backend", 9),
    ],
  },
  {
    id: 4,
    name: "Marketing",
    color: "gray",
    completion: 42,
    members: [
      member(18, "Marketing Lead", 12, true),
      member(19, "Content Strategist", 9),
      member(20, "Growth Specialist", 14),
      member(21, "SEO Specialist", 18),
    ],
  },
]