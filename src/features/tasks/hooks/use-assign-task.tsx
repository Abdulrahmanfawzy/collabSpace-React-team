
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { assignTask } from "../services/assign-task"
import { taskKeys } from "../api/tasks-keys"
import type { AssignTaskRequest } from "../types/tasks.types.api"

interface AssignTaskVariables {
  taskId: number
  payload: AssignTaskRequest
}

export function useAssignTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: function ({
      taskId,
      payload,
    }: AssignTaskVariables) {
      return assignTask(taskId, payload)
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
