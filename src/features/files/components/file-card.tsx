import { Download, File, FileText, Image } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { FileItem, FileType } from "../types/file.types"


const fileTypeStyles: Record<FileType, { icon: LucideIcon; className: string }> = {
  pdf: { icon: FileText, className: "bg-support-danger/10 text-support-danger" },
  doc: { icon: File, className: "bg-primary-blue-50 text-primary-blue-500" },
  image: { icon: Image, className: "bg-support-success/10 text-support-success" },
}

interface FileCardProps {
  file: FileItem
}

export function FileCard({ file }: FileCardProps) {
  const { name, type, uploadedBy, size, uploadedAt } = file
  const { icon: Icon, className } = fileTypeStyles[type]

  return (
    <article className="flex items-center gap-3 rounded-base border border-secondary-gray-100 bg-white p-4">
     
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${className}`}>
        <Icon size={20} />
      </span>

     
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <h3 className="truncate text-small font-semibold">{name}</h3>
        <p className="text-caption text-secondary-gray-500">By {uploadedBy}</p>
        <p className="text-caption text-secondary-gray-300">
          {size} • {uploadedAt}
        </p>
      </div>

      
      <button
        type="button"
        aria-label={`Download ${name}`}
        className="shrink-0 text-secondary-gray-500 hover:text-primary-blue-500"
      >
        <Download size={18} />
      </button>
    </article>
  )
}