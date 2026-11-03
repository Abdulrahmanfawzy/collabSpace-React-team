import type {ChartPoint, Project, ProjectDetails, ProjectProgress,   TeamMember } from "../types/project.types"

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

export const projectDetailsMock: ProjectDetails = {
  id: 1,
  name: "Alpha",
  color: "purple",
  startDate: "Oct 12",
  deadline: "Dec 25",
  status: "In Progress",
  priority: "High",
  filesCount: 22,
  teams: [],
  description:
    "This project focuses on organizing tasks, tracking progress, and coordinating team efforts to ensure timely delivery and clear visibility across all project activities.",
  progress: 42,
  projectType: "SaaS",
  totalTasks: 140,
}


export const teamMembersMock: TeamMember[] = [
  { id: 1, name: "Mohanad wahib", avatar: "https://i.pravatar.cc/48?img=11", isLeader: true },
  { id: 2, name: "Sara Hassan", avatar: "https://i.pravatar.cc/48?img=12" },
  { id: 3, name: "Ali Mohamed", avatar: "https://i.pravatar.cc/48?img=13" },
  { id: 4, name: "Khalid Mousa", avatar: "https://i.pravatar.cc/48?img=14" },
]

export const overviewChartMock: ChartPoint[] = [
  { month: "Jan", value: 10000 },
  { month: "Feb", value: 11000 },
  { month: "Mar", value: 20000 },
  { month: "Apr", value: 8000 },
  { month: "May", value: 12000 },
  { month: "Jun", value: 20000 },
]

export const projectProgressMock: ProjectProgress = {
  percent: 78,
  pending: 16,
  inProgress: 36,
  completed: 42,
  total: 94,
}