import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteMeeting } from "../api/meetings-api"
import { toast } from "sonner";

const useDeleteMeeting = () => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMeeting,
    
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["meetings"],
      });
      toast.success(response.message || "Deleting Meeting SuccessFully")
    },

    onError : (response) => {
      toast.error(response.message || "Failed to deleting meeting")
    }

  })
}

export default useDeleteMeeting
