import { useEffect, useRef, useState } from "react";
import { MoreVertical, Paperclip, Phone, Search, Send, Video } from "lucide-react";
import { Avatar } from "./chat-row";

export type Message = {
  id: number;
  author: string;
  text: string;
  mine?: boolean; // sent by me -> right side, blue
  avatar?: string;
  tag?: string;
};

type Props = {
  variant: "person" | "project";
  title: string;
  subtitle?: string; // person role, e.g. "Senior UI/UX"
  avatar?: string; // person header avatar
  dateLabel?: string; // e.g. "Today 1:52 pm"
  messages: Message[];
  onSend: (text: string) => void;
  onTagClick?: (m: Message) => void;
};

export default function ChatConversation({
  variant,
  title,
  subtitle,
  avatar,
  dateLabel,
  messages,
  onSend,
  onTagClick,
}: Props) {
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const submit = () => {
    const text = draft.trim();
    if (!text) return;
    onSend(text);
    setDraft("");
  };

  return (
    <main className="flex min-w-0 flex-1 flex-col">
      {/* Header */}
      <header className="flex items-center justify-between rounded-xl bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          {variant === "person" && <Avatar src={avatar} />}
          <div>
            <h2 className="text-[15px] font-semibold">{title}</h2>
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center gap-5 text-gray-700">
          <Search size={20} />
          <Phone size={20} />
          <Video size={20} />
          <MoreVertical size={20} />
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6">
        {dateLabel && <p className="text-center text-[10px] text-gray-400">{dateLabel}</p>}
        {messages.length === 0 && (
          <p className="pt-10 text-center text-sm text-gray-500">No messages yet</p>
        )}

        {messages.map((m) => (
          <div key={m.id} className={`flex items-center gap-3 ${m.mine ? "justify-end" : ""}`}>
            {variant === "project" &&
              !m.mine &&
              (m.avatar ? (
                <Avatar src={m.avatar} size="h-9 w-9" />
              ) : (
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-700 text-sm font-semibold text-white">
                  {m.author[0]}
                </span>
              ))}
            <div
              className={`max-w-[70%] rounded-lg px-3 py-1.5 ${
                m.mine ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              {variant === "project" && !m.mine && (
                <p className="text-[9px] text-gray-500">{m.author}</p>
              )}
              <p className="text-[13px]">{m.text}</p>
              {m.tag && (
                <button
                  type="button"
                  onClick={() => onTagClick?.(m)}
                  className="mt-1 inline-block rounded bg-blue-600 px-2 py-0.5 text-[11px] text-white"
                >
                  {m.tag}
                </button>
              )}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="flex items-center gap-3 pb-1"
      >
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
  );
}