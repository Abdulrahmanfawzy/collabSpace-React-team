import { teamsMock } from "./teams.mock"

export const teamOptions = teamsMock.map((t) => ({
  value: String(t.id),
  label: t.name,
}))