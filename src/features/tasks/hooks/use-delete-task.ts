
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { taskKeys } from "../api/tasks-keys"
import { deleteTask } from "../services/delete-tasks"

export function useDeleteTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: function (taskId: number) {
      return deleteTask(taskId)
    },

    onSuccess: function (_, taskId) {
      queryClient.invalidateQueries({
        queryKey: taskKeys.all,
      })

      queryClient.removeQueries({
        queryKey: taskKeys.detail(taskId),
      })
    },
  })
}
