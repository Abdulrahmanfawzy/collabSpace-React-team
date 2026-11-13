import { useMemo, useState } from "react";
import { Navigate, useOutletContext, useParams } from "react-router-dom";
import ChatConversation, { type Message } from "@/components/chat/chat-conversation";
import EditChatModel from "@/components/chat/edit-chat-model";
import type { ChatsOutletContext } from "@/components/layout/chats-layout";
import { useProjectMessages } from "@/components/chat/useProjectMessages";
import type { ApiMessage } from "@/components/chat/message.api";
import { useSendProjectMessage } from "@/components/chat/useSendProjectMessage";
import { useProjectMessageActions } from "@/components/chat/useProjectMessageActions";

const toMessage = (m: ApiMessage): Message => ({
  id: m.id,
  author: m.sender.name,
  text: m.message,
  avatar: m.sender.avatar_url ?? undefined,
  //  mine: m.sender.id === TEMP_MY_ID,
  edited: m.is_edited,
});

export default function ProjectChatPage() {
  const { projectId } = useParams();
  // const { edit } = useProjectMessageActions(id);
  const { channel, projects } = useOutletContext<ChatsOutletContext>();
  const [openMessage, setOpenMessage] = useState<Message | null>(null);

  const project = projects.find((p) => String(p.id) === projectId);
  const id = project ? String(project.id) : undefined;

  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, error } =
    useProjectMessages(id);
  const { mutate: send } = useSendProjectMessage(id);

  const messages = useMemo<Message[]>(() => {
    const all = data?.pages.flatMap((p) => p.data) ?? [];
    return all
      .slice()
      .sort((a, b) => +new Date(a.created_at) - +new Date(b.created_at))
      .map(toMessage);
  }, [data]);

  if (!project) return <Navigate to="/chats/projects" replace />;
  return (
    <>
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading…" : ""}
        </button>
      )}
     <ChatConversation
  variant="project"
  title={channel}
  messages={messages}
  onSend={(text) => send(text)}
   //onEdit={(m, text) => edit.mutate({ id: m.id, text })}
  onDelete={(m) => console.log("delete", m.id)}
  onTagClick={setOpenMessage}
/>
      {openMessage?.tag && (
        <EditChatModel
          tag={openMessage.tag}
          author={openMessage.author}
          onClose={() => setOpenMessage(null)}
        />
      )}
    </>
  );
}