import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FileCard } from "./file-card"
import type { FileItem } from "../types/file.types"

interface FilesTabProps {
  files: FileItem[]
}

export function FilesTab({ files }: FilesTabProps) {
  const recentFiles = files.slice(0, 3)

  return (
    <div className="flex flex-col gap-8">
      {/* Recent Files */}
      <section className="flex flex-col gap-4">
        <h2 className="text-h2 font-semibold">Recent Files</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {recentFiles.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      </section>

      {/* All Files */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-h2 font-semibold">All Files</h2>
          <Button className="bg-primary-blue-500 hover:bg-primary-blue-600">
            Upload File <Plus size={14} />
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {files.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      </section>
    </div>
  )
}