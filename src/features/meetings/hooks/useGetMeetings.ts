import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import type { Filters, MeetingsResponse } from "../types/meetings.types"
import { getMeetings } from "../api/meetings-api"


const useGetMeetings = (filters : Filters): UseQueryResult<MeetingsResponse> => {
  return useQuery({
    queryKey:["meetings" , filters],
    queryFn : ()=> getMeetings(filters),
    staleTime: 1000 * 60 * 10,
    enabled: !!filters.project_id,
  })
}

export default useGetMeetings