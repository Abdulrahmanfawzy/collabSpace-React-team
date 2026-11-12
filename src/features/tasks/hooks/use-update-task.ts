
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateTask } from "../services/update-task"
import { taskKeys } from "../api/tasks-keys"

interface UpdateTaskVariables {
  taskId: number
  payload: import("../types/tasks.types.api").UpdateTaskRequest
}

export function useUpdateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: function ({ taskId, payload }: UpdateTaskVariables) {
      return updateTask(taskId, payload)
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
