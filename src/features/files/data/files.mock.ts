import type { FileItem } from "../types/file.types"

const file = (id: number): FileItem => ({
  id,
  name: "Design mockups",
  type: "pdf",
  uploadedBy: "Ahmed Hassan",
  size: "6.4 MB",
  uploadedAt: "1h ago",
})

export const filesMock: FileItem[] = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(file)