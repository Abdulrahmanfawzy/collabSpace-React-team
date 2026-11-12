import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { getErrorMessage } from "@/lib/api-error"
import { useDeleteProject } from "../hooks/use-project-mutation"
import type { Project } from "../types/project.types"

interface DeleteProjectDialogProps {
  project: Project | null
  onOpenChange: (open: boolean) => void
}

export function DeleteProjectDialog({ project, onOpenChange }: DeleteProjectDialogProps) {
  const { mutate, isPending, isError, error, reset } = useDeleteProject()

  const handleOpenChange = (open: boolean) => {
    if (isPending) return // ما يتقفلش وهو بيمسح
    if (!open) reset()
    onOpenChange(open)
  }

  const handleDelete = () => {
    if (!project) return
    mutate(project.id, { onSuccess: () => onOpenChange(false) })
  }

  return (
    <AlertDialog open={!!project} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete <b>{project?.name}</b>. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {isError && (
          <p className="text-caption text-support-danger">{getErrorMessage(error)}</p>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault() 
              handleDelete()
            }}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}