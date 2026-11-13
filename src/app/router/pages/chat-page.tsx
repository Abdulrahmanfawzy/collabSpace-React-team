import { useState } from "react";
import { Navigate, useOutletContext, useParams } from "react-router-dom";
import ChatConversation, {
  type Message,
} from "@/components/chat/chat-conversation";
import type { ChatsOutletContext } from "@/components/layout/chats-layout";

const START: Record<string, Message[]> = {
  "1": [
    {
      id: 1,
      author: "Mohamed Ahmed",
      text: "Yes, we can do this and edit screen",
    },
    {
      id: 2,
      author: "Me",
      text: "Ok, I want you to send it today",
      mine: true,
    },
  ],
  "2": [
    {
      id: 1,
      author: "Salah Ali",
      text: "Please try and do this and edit screen",
    },
  ],
};

export default function PersonChatPage() {
  const { id } = useParams();
  const { persons } = useOutletContext<ChatsOutletContext>();
  const [all, setAll] = useState<Record<string, Message[]>>(START);

  const person = persons.find((p) => String(p.id) === id);
  if (!person) return <Navigate to="/chats/inbox" replace />;

  const key = String(person.id);

  return (
    <ChatConversation
      variant="person"
      title={person.name}
      subtitle={person.role}
      avatar={person.avatar}
      dateLabel="Today 1:52 pm"
      messages={all[key] ?? []}
      onSend={(text) =>
        setAll((m) => ({
          ...m,
          [key]: [
            ...(m[key] ?? []),
            { id: Date.now(), author: "Me", text, mine: true },
          ],
        }))
      }
    />
  );
}
