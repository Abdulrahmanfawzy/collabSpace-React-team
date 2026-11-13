import { useMemo, useState } from "react";
import { Navigate, useOutletContext, useParams } from "react-router-dom";
import ChatConversation, { type Message } from "@/components/chat/chat-conversation";
import EditChatModel from "@/components/chat/edit-chat-model";
import type { ChatsOutletContext } from "@/components/layout/chats-layout";
import { useProjectMessages } from "@/components/chat/useProjectMessages";
import type { ApiMessage } from "@/components/chat/message.api";

const toMessage = (m: ApiMessage): Message => ({

  id: m.id,
  author: m.sender.name,
  text: m.message,
  
});

export default function ProjectChatPage() {

  const { projectId } = useParams();
  const { channel, projects } = useOutletContext<ChatsOutletContext>();
  const [openMessage, setOpenMessage] = useState<Message | null>(null);

  const project = projects.find((p) => String(p.id) === projectId);
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useProjectMessages(project ? String(project.id) : undefined);

  const messages = useMemo<Message[]>(() => {
    const all = data?.pages.flatMap((p) => p.data) ?? [];
    return all
      .slice()
      .sort((a, b) => +new Date(a.created_at) - +new Date(b.created_at))
      .map(toMessage);
  }, [data]);

  if (!project) return <Navigate to="/chats/projects" replace />;
  if (isLoading) return <div className="p-4">Loading messages…</div>;
  if (isError) return <div className="p-4">Failed to load messages.</div>;

  return (
    <>
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading…" : "Load older messages"}
        </button>
      )}
      <ChatConversation
        variant="project"
        title={channel}
        messages={messages}
        onSend={(text) => {
          // Send Message API comes next
        }}
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