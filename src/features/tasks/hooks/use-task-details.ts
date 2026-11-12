
import { useQuery } from "@tanstack/react-query"

import { taskKeys } from "../api/tasks-keys"
import { getTaskDetails } from "../api/get-tasks-details"

export function useTaskDetails(taskId: number) {
  return useQuery({
    queryKey: taskKeys.detail(taskId),
    queryFn: () => getTaskDetails(taskId),
    enabled: !!taskId,
  })
}
