import { useMutation, useQueryClient } from "@tanstack/react-query"
import { taskKeys } from "../api/tasks-keys"
import { createTask } from "../services/create-tasks"


export function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: taskKeys.all,
      })
    },
  })
}