import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editMessage } from "./message.api";

export function useProjectMessageActions(projectId?: string) {
  const qc = useQueryClient();
  const refresh = () => qc.invalidateQueries({ queryKey: ["project-messages", projectId] });

  const edit = useMutation({
    mutationFn: ({ id, text }: { id: number; text: string }) => editMessage(id, text),
    onSuccess: refresh,
  });

  return { edit };
}