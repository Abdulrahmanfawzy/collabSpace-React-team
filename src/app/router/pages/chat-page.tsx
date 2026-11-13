
import { Navigate, useOutletContext, useParams } from "react-router-dom";
import ChatConversation, {
  type Message,
} from "@/components/chat/chat-conversation";
import type { ChatsOutletContext } from "@/components/layout/chats-layout";
import { useProjectMessages } from "@/components/chat/useProjectMessages";
import { getStoredUser } from "@/lib/auth";




export default function PersonChatPage() {
  const { id } = useParams();
  const { persons } = useOutletContext<ChatsOutletContext>();

  const person = persons.find((p) => String(p.id) === id);
 const me = getStoredUser() as { id?: number } | null;
const { messages, isLoading, isError } = useProjectMessages(Number(id), me?.id);

  if (!id) return <Navigate to="/chats/inbox" replace />;
  if (isLoading) return <p className="p-4 text-gray-500">Loading messages...</p>;
  if (isError) return <p className="p-4 text-red-500">Could not load messages.</p>;

  return (
    <ChatConversation
      variant="person"
      title={person?.name ?? `Project ${id}`}
      subtitle={person?.role}
      avatar={person?.avatar}
      dateLabel="Today"
      messages={messages}
      onSend={() => {}} // temporary: sending comes with the next API (Send Message)
    />
  );
}