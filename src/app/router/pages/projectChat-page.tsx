import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { MoreVertical, Paperclip, Phone, Search, Send, Video } from "lucide-react";
import { CHATS } from "./projects-chat-page";
import EditChatModel from "@/components/edit-chat-model";

const CHANNELS = ["Public Channel", "Frontend Team Channel", "Backend Team Channel", "UI/UX Team Channel"];

type Message = { id: number; author: string; text: string; tag?: string };


const START: Record<string, Message[]> = {
  "1-Public Channel": [
    { id: 1, author: "Mohamed Ahmed", text: "Yes, we can do this are" },
    { id: 2, author: "Salah Ali", text: "You should do it early" },
    { id: 3, author: "Mohamed Ahmed", text: "I edit it and now you can see it", tag: "#Screen edit" },
  ],
};

export default function ProjectChatPage() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [messages, setMessages] = useState(START);
  const [draft, setDraft] = useState("");
 
const [openMessage, setOpenMessage] = useState<Message | null>(null); 

  const project = CHATS.find((c) => String(c.id) === chatId);
  if (!project) return <Navigate to="/chats" replace />;

  const key = `${project.id}-${channel}`;
  const list = messages[key] ?? [];

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages({ ...messages, [key]: [...list, { id: Date.now(), author: "Mohamed Salah", text }] });
    setDraft("");
  };

  return (
    <div className="flex h-screen w-full gap-2 bg-[#f6f6f7] p-2 font-sans text-gray-900">
      {/* ---------- Sidebar ---------- */}
      <aside className="flex w-[300px] shrink-0 flex-col rounded-xl bg-white px-4 pt-4">
        <h1 className="text-[28px] font-semibold tracking-tight">Chats</h1>
        <div className="mt-3 rounded-lg bg-gray-100/70 px-2 py-2 text-[15px] font-semibold">Project Chats</div>

        <ul className="mt-2 flex-1 space-y-1 overflow-y-auto pb-4">
          {CHATS.map((c) =>
            c.id === project.id ? (
              // Open project: gray box with its channels
              <li key={c.id} className="rounded-lg bg-gray-100/70 p-3">
                <button onClick={() => navigate("/chats")} className="w-full text-left text-[15px] font-medium">
                  {c.project}
                </button>
                <ul className="mt-2 space-y-2">
                  {CHANNELS.map((name) => (
                    <li key={name}>
                      <button
                        onClick={() => setChannel(name)}
                        className={`w-full rounded-md px-1 py-1 text-left ${name === channel ? "bg-white shadow-sm" : ""}`}
                      >
                        <div className="flex justify-between">
                          <span className="text-xs font-medium">{name}</span>
                          <span className="text-[9px] text-gray-400">{c.time}</span>
                        </div>
                        <p className="mt-1 truncate text-[9px] text-gray-500">{c.lastMessage}</p>
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              // Other projects: click to open
              <li key={c.id}>
                <button
                  onClick={() => navigate(`/chats/${c.id}`)}
                  className="w-full rounded-lg px-2 py-3 text-left hover:bg-gray-50"
                >
                  <div className="flex justify-between">
                    <span className="text-[15px] font-medium">{c.project}</span>
                    <span className="text-[9px] text-gray-400">{c.time}</span>
                  </div>
                  <p className="mt-1 text-xs font-medium">{c.channel}</p>
                  <p className="mt-1 truncate text-[9px] text-gray-500">{c.lastMessage}</p>
                </button>
              </li>
            )
          )}
        </ul>
      </aside>

      {/* ---------- Chat ---------- */}
      <main className="flex min-w-0 flex-1 flex-col">
        {/* Header card */}
        <header className="flex items-center justify-between rounded-xl bg-white px-4 py-3">
          <h2 className="text-[15px] font-semibold">{channel}</h2>
          <div className="flex items-center gap-5 text-gray-700">
            <Search size={20} />
            <Phone size={20} />
            <Video size={20} />
            <MoreVertical size={20} />
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6">
          {list.length === 0 && <p className="pt-10 text-center text-sm text-gray-500">No messages yet</p>}
          {list.map((m) => (
            <div key={m.id} className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-700 text-sm font-semibold text-white">
                {m.author[0]}
              </span>
              <div className="max-w-[70%] rounded-lg bg-white px-3 py-1.5">
                <p className="text-[9px] text-gray-500">{m.author}</p>
                <p className="text-[13px]">{m.text}</p>
                {m.tag && (
  <button
    type="button"
    onClick={() => setOpenMessage(m)}
    className="mt-1 inline-block rounded bg-blue-600 px-2 py-0.5 text-[11px] text-white"
  >
    {m.tag}
  </button>
)}
              </div>
            </div>
          ))}
        </div>

        {/* Message input */}
        <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex items-center gap-3 pb-1">
          <div className="flex flex-1 items-center rounded-lg bg-white px-4 py-3">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write a message"
              className="flex-1 bg-transparent text-sm outline-none"
            />
            <Paperclip size={20} className="text-gray-600" />
          </div>
          <button
            type="submit"
            aria-label="Send message"
            className="flex h-11 w-16 items-center justify-center rounded-lg bg-blue-600 text-white"
          >
            <Send size={20} />
          </button>
        </form>
      </main>
       {openMessage && openMessage.tag && (
        <EditChatModel
          tag={openMessage.tag}
          author={openMessage.author}
          onClose={() => setOpenMessage(null)}
        />
      )}
    </div>
  );
}