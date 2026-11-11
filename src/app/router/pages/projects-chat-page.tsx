import { SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";


export type Chat = {
  id: number;
  project: string;
  channel: string;
  lastMessage: string;
  time: string;
  avatar: string; 
  color: string; 
};

export const CHATS: Chat[] = [
  { id: 1, project: "UI Dashboard Project", channel: "Public Channel", lastMessage: "We need to improve performance", time: "5:22 pm", avatar: "", color: "#8d6e63" },
  { id: 2, project: "Pet website Project", channel: "Frontend Team Channel", lastMessage: "We need to improve performance", time: "5:22 pm", avatar: "", color: "#546e7a" },
  { id: 3, project: "SAAS UI/UX Project", channel: "Backend Team Channel", lastMessage: "We need to improve performance", time: "5:22 pm", avatar: "", color: "#a1887f" },
  { id: 4, project: "Food delivery Project", channel: "UI/UX Team Channel", lastMessage: "We need to improve performance", time: "5:22 pm", avatar: "", color: "#6d4c41" },
  { id: 5, project: "Hotels booking Project", channel: "Marketing Team Channel", lastMessage: "We need to improve performance", time: "5:22 pm", avatar: "", color: "#424242" },
  { id: 6, project: "Events website Project", channel: "Public Channel", lastMessage: "We need to improve performance", time: "5:22 pm", avatar: "", color: "#8d6e63" },
  { id: 7, project: "Events website Project", channel: "Public Channel", lastMessage: "We need to improve performance", time: "5:22 pm", avatar: "", color: "#607d8b" },
];



function MiniAvatar({ chat }: { chat: Chat }) {
  return chat.avatar ? (
    <img src={chat.avatar} alt="" className="h-3 w-3 rounded-full object-cover" />
  ) : (
    <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: chat.color }} />
  );
}

function ChatItem({ chat, active, onSelect }: { chat: Chat; active: boolean; onSelect: () => void }) {
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        className={`w-full rounded-lg px-2 py-3 text-left transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600 ${
          active ? "bg-gray-100" : ""
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-medium text-gray-900">{chat.project}</h3>
          <span className="shrink-0 text-[9px] text-gray-400">{chat.time}</span>
        </div>
        <p className="mt-1 text-xs font-medium text-gray-800">{chat.channel}</p>
        <div className="mt-1 flex items-center gap-1.5">
          <MiniAvatar chat={chat} />
          <span className="truncate text-[9px] text-gray-500">{chat.lastMessage}</span>
        </div>
      </button>
    </li>
  );
}

export default function ProjectsChatsPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const naigate = useNavigate();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CHATS;
    return CHATS.filter(
      (c) => c.project.toLowerCase().includes(q) || c.channel.toLowerCase().includes(q)
    );
  }, [query]);

  const selected = CHATS.find((c) => c.id === selectedId) ?? null;

  return (
    <div className="flex h-screen w-full bg-[#f6f6f7] p-2 font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="flex w-[300px] shrink-0 flex-col rounded-xl bg-white px-4 pt-4">
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] font-semibold tracking-tight">Chats</h1>
          <button
            type="button"
            aria-label="Search chats"
            aria-expanded={searchOpen}
            onClick={() => {
              setSearchOpen((o) => !o);
              setQuery("");
            }}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
          >
            <SearchIcon />
          </button>
        </div>

        {searchOpen && (
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chats"
            className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-teal-600"
          />
        )}

        <div className="mt-3 rounded-lg bg-gray-100/70 px-2 py-2 text-[15px] font-semibold text-gray-800">
          Project Chats
        </div>

        <ul className="mt-1 flex-1 divide-y divide-transparent overflow-y-auto pb-4">
          {filtered.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              active={chat.id === selectedId}
              onSelect={() => naigate(`/chats/${chat.id}`)}
            />
          ))}
          {filtered.length === 0 && (
            <li className="px-2 py-6 text-center text-sm text-gray-500">No chats found</li>
          )}
        </ul>
      </aside>
 <main className="flex flex-1 items-center justify-center">
        {selected ? (
          <div className="text-center">
            <h2 className="text-lg font-semibold">{selected.project}</h2>
            <p className="text-sm text-gray-500">{selected.channel}</p>
          </div>
        ) : (
          <p className="text-base text-xl  text-gray-900 font-semibold">Select Chat</p>
        )}
      </main>
      
    </div>
  );
}