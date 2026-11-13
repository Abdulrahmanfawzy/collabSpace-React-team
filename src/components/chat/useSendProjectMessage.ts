import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendProjectMessage } from "./message.api";

export function useSendProjectMessage(projectId?: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (text: string) => sendProjectMessage(projectId!, text),
    onSuccess: () => {
      // use the same key prefix as inside useProjectMessages
      qc.invalidateQueries({ queryKey: ["project-messages", projectId] });
    },
  });
}