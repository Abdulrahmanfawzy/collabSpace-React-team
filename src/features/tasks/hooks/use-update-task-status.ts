
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateTaskStatus } from "../services/update-task-status"
import { taskKeys } from "../api/tasks-keys"

interface UpdateTaskStatusVariables {
  taskId: number
  status: "Pending" | "In Progress" | "In Review" | "Completed"
}

export function useUpdateTaskStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: function ({
      taskId,
      status,
    }: UpdateTaskStatusVariables) {
      return updateTaskStatus(taskId, { status })
    },

    onSuccess: function (_, variables) {
      queryClient.invalidateQueries({
        queryKey: taskKeys.all,
      })

      queryClient.invalidateQueries({
        queryKey: taskKeys.detail(variables.taskId),
      })
    },
  })
}
