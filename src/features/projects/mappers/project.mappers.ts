

import type { Team, TeamColor } from "@/features/teams/types/team.types"
import type { Project, ProjectColor, ProjectOverview } from "../types/project.types"
import type {UpdateProjectPayload, CreateProjectPayload, ProjectListItemResponse, ProjectOverviewData, ProjectTeamResponse } from "../types/projects.api.types"
import type { CreateProjectValues } from "../schemas/project.schema"

const PROJECT_COLORS: ProjectColor[] = ["purple", "teal"]
const TEAM_COLORS: TeamColor[] = ["pink", "purple", "teal", "gray"]


export function mapProjectListItem(p: ProjectListItemResponse): Project {
  return {
    id: p.id,
    name: p.name,
     description: p.description ?? "",  
    color: PROJECT_COLORS[p.id % PROJECT_COLORS.length],
    startDate: p.start_date ?? "-",
    deadline: p.deadline ?? "-",
    status: p.status,
    priority: p.priority,
    filesCount: p.files_count,
    teams: p.teams,
  }
}

export function mapProjectOverview(d: ProjectOverviewData): ProjectOverview {
  const stats = d.tasks_statistics
  const percent = Math.round(d.progress_percentage)

  return {
    project: {
      id: d.id,
      name: d.name,
      color: PROJECT_COLORS[d.id % PROJECT_COLORS.length],
      startDate: d.due_date_indicator.start_date ?? "-",
      deadline: d.due_date_indicator.deadline ?? "-",
      status: d.status,
      priority: d.priority,
      filesCount: d.counts.files,
      teams: d.teams.map((t) => ({ id: t.id, name: t.name })),
      description: d.description ?? "",
      progress: percent,
      totalTasks: stats.total,
    },
    progress: {
      percent,
      pending: stats.pending,
      inProgress: stats.in_progress + stats.in_review, 
      completed: stats.completed,
      total: stats.total,
    },
    members: d.direct_members.map((m) => ({
      id: m.id,
      name: m.name,
      avatar: m.avatar_url ?? "",
      role: m.role,
    })),
  }
}

export function mapProjectTeam(t: ProjectTeamResponse, index: number): Team {
  return {
    id: t.id,
    name: t.name,
    color: TEAM_COLORS[index % TEAM_COLORS.length],
    completion: Math.round(t.completion_percentage),
    members: t.members
      .map((m) => ({
        id: m.id,
        name: m.name,
        avatar: m.avatar_url ?? "",
        role: m.role_in_team,
        isLeader: m.is_leader,
        tasksDone: m.tasks_completed,
        tasksTotal: m.tasks_total,
      }))
      .sort((a, b) => Number(b.isLeader) - Number(a.isLeader)),
  }
}

/* ---------- Form → API ---------- */
export function toCreateProjectPayload(values: CreateProjectValues): CreateProjectPayload {
  return {
    name: values.name,
    description: values.description || undefined,
    start_date: values.startDate,
    deadline: values.deadline,
    priority: values.priority,
    status: values.status,
    teams: values.teams.map(Number),
  }
}
const toDateInput = (d: string) => (d === "-" ? "" : d.slice(0, 10))

export function mapProjectToForm(project: Project): CreateProjectValues {
  return {
    name: project.name,
    description: project.description,
    startDate: toDateInput(project.startDate),
    deadline: toDateInput(project.deadline),
    priority: project.priority,
    status: project.status,
    teams: project.teams.map((t) => String(t.id)),
  }
}


export function toUpdateProjectPayload(values: CreateProjectValues): UpdateProjectPayload {
  return {
    name: values.name,
    description: values.description || undefined,
    start_date: values.startDate,
    deadline: values.deadline,
    priority: values.priority,
    status: values.status,
  }
}