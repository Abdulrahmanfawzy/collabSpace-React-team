import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteMeeting } from "../api/meetings-api"

const useDeleteMeeting = () => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMeeting,
    
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["meetings"],
      });
    },

  })
}

export default useDeleteMeeting