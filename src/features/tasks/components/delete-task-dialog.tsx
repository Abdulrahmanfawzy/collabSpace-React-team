
import { useState } from "react"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { useDeleteTask } from "../hooks/use-delete-task"

interface DeleteTaskDialogProps {
  taskId: number
  taskName: string
}

export function DeleteTaskDialog({
  taskId,
  taskName,
}: DeleteTaskDialogProps) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { mutate: deleteTask, isPending } = useDeleteTask()

  function handleDelete() {
    deleteTask(taskId, {
      onSuccess: function () {
        toast.success("Task deleted successfully")
        setOpen(false)
        navigate("/tasks")
      },
      onError: function () {
        toast.error("Failed to delete task")
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant="outline"
      onClick={(event) => {
  event.stopPropagation()
  setOpen(true)
}}
        className="rounded-xl text-destructive hover:bg-destructive/10"
      >
        <Trash2 size={16} />
      
      </Button>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
        </DialogHeader>

        <p className="py-3 text-sm text-secondary-gray-500">
          Are you sure you want to delete "{taskName}"?
          This action cannot be undone.
        </p>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
