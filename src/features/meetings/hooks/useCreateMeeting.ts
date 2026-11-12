import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMeeting } from "../api/meetings-api";
import { toast } from "sonner";

export const useCreateMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMeeting,

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["meetings"],
      });
      toast.success(response.message || "Creating Meeting SuccessFully")
    },

    onError : (response) => {
      toast.error(response.message || "Failed to creating meeting")
    }
  });
};