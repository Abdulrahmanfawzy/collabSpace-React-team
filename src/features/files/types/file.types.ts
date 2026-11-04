export type FileType = "pdf" | "doc" | "image"

export interface FileItem {
  id: number
  name: string
  type: FileType
  uploadedBy: string
  size: string
  uploadedAt: string
}