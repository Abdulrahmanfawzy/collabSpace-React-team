import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMeeting } from "../api/meetings-api";
import { toast } from "sonner";

export const useUpdateMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMeeting,

    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["meetings"],
      });

      queryClient.invalidateQueries({
        queryKey: ["meeting", variables.id],
      });

      toast.success(response.message || "Updateing Meeting SuccessFully")
    },
    
    onError : (response) => {
      toast.error(response.message || "Failed to updateing meeting")
    }
  });
};
