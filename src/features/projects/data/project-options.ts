import { projectsMock } from "./projects.mock"

export const projectOptions = projectsMock.map((p) => ({
  value: String(p.id),
  label: p.name,
}))