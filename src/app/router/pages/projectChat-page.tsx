import { useState } from "react";
import { Navigate, useOutletContext, useParams } from "react-router-dom";
import ChatConversation, { type Message } from "@/components/chat/chat-conversation";
import EditChatModel from "@/components/chat/edit-chat-model";
import type { ChatsOutletContext } from "@/components/layout/chats-layout";

const START: Record<string, Message[]> = {
  "1-Public Channel": [
    { id: 1, author: "Mohamed Ahmed", text: "Yes, we can do this are" },
    { id: 2, author: "Salah Ali", text: "You should do it early" },
    { id: 3, author: "Mohamed Ahmed", text: "I edit it and now you can see it", tag: "#Screen edit" },
  ],
};

export default function ProjectChatPage() {
  const { projectId } = useParams();
  const { channel, projects } = useOutletContext<ChatsOutletContext>();
  const [all, setAll] = useState(START);
  const [openMessage, setOpenMessage] = useState<Message | null>(null);

  const project = projects.find((p) => String(p.id) === projectId);
  if (!project) return <Navigate to="/chats/projects" replace />;

  const key = `${project.id}-${channel}`;

  return (
    <>
      <ChatConversation
        variant="project"
        title={channel}
        messages={all[key] ?? []}
        onSend={(text) =>
          setAll((m) => ({
            ...m,
            [key]: [...(m[key] ?? []), { id: Date.now(), author: "Me", text, mine: true }],
          }))
        }
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














