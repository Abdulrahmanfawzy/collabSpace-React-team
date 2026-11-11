import { useQuery } from "@tanstack/react-query";
import { getMeetingDetails } from "../api/meetings-api";

export const useGetMeetingDetails = (id: number) => {
  return useQuery({
    queryKey: ["meeting", id],
    queryFn: () => getMeetingDetails(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};