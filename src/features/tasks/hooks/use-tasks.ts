import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/get-tasks";
import { taskKeys } from "../api/tasks-keys";
import type { GetTasksParams } from "../types/tasks.types.api";
import { mapTaskListItem } from "../mappers/tasks-mappers";


export function useTasks(params: GetTasksParams = {}) {

return useQuery({
 queryKey: taskKeys.list(params),
 queryFn: () => getTasks(params),
  placeholderData: keepPreviousData,
  select: (response) =>({
    tasks:response.data.data.map(mapTaskListItem),
    total: response.data.meta.total,
  }),

})
}