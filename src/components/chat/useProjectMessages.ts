import { useInfiniteQuery } from "@tanstack/react-query";
import { getProjectMessages } from "@/components/chat/message.api";

export function useProjectMessages(projectId?: string) {
  return useInfiniteQuery({
    queryKey: ["project-messages", projectId],
    queryFn: ({ pageParam }) => getProjectMessages(projectId!, pageParam),
    initialPageParam: 1,
    getNextPageParam: (last) =>
      last.meta.current_page < last.meta.last_page ? last.meta.current_page + 1 : undefined,
    enabled: !!projectId,
  });
}