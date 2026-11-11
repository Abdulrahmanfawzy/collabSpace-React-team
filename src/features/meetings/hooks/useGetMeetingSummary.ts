import { useQuery } from "@tanstack/react-query";
import { getMeetingSummary } from "../api/meetings-api";

export const useGetMeetingSummary = (id: number) => {
  return useQuery({
    queryKey: ["meeting-summary", id],
    queryFn: () => getMeetingSummary(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};