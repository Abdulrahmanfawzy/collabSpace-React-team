import { useEffect, useRef, useState } from "react";
import {
  Check,
  MoreVertical,
  Paperclip,
  Pencil,
  Phone,
  Search,
  Send,
  Trash2,
  Video,
  X,
} from "lucide-react";
import { Avatar } from "./chat-row";

export type Message = {
  id: number;
  author: string;
  text: string;
  mine?: boolean; // sent by me -> right side, blue
  avatar?: string;
  tag?: string;
  edited?: boolean;
};

type Props = {
  variant: "person" | "project";
  title: string;
  subtitle?: string; // person role, e.g. "Senior UI/UX"
  avatar?: string; // person header avatar
  dateLabel?: string; // e.g. "Today 1:52 pm"
  messages: Message[];
  onSend: (text: string) => void;
  onEdit?: (m: Message, text: string) => void;
  onDelete?: (m: Message) => void;
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
  onEdit,
  onDelete,
  onTagClick,
}: Props) {
  const [draft, setDraft] = useState("");
  const [menuId, setMenuId] = useState<number | null>(null); // which message menu is open
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDraft, setEditDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  // close the menu when clicking anywhere outside it
  useEffect(() => {
    if (menuId === null) return;
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-msg-menu]")) setMenuId(null);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [menuId]);

  const submit = () => {
    const text = draft.trim();
    if (!text) return;
    onSend(text);
    setDraft("");
  };

  const startEdit = (m: Message) => {
    setMenuId(null);
    setEditingId(m.id);
    setEditDraft(m.text);
  };

  const saveEdit = (m: Message) => {
    const text = editDraft.trim();
    if (text && text !== m.text) onEdit?.(m, text);
    setEditingId(null);
  };

  const hasMenu = Boolean(onEdit || onDelete);

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
          <div
            key={m.id}
            className={`group flex items-center gap-3 ${m.mine ? "justify-end" : ""}`}
          >
            {variant === "project" &&
              !m.mine &&
              (m.avatar ? (
                <Avatar src={m.avatar} size="h-9 w-9" />
              ) : (
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-700 text-sm font-semibold text-white">
                  {m.author[0]}
                </span>
              ))}

            {/* Small menu: Edit / Delete (own messages only) */}
            {m.mine && hasMenu && editingId !== m.id && (
              <div data-msg-menu className="relative">
                <button
                  type="button"
                  aria-label="Message options"
                  aria-haspopup="menu"
                  aria-expanded={menuId === m.id}
                  onClick={() => setMenuId(menuId === m.id ? null : m.id)}
                  className={`rounded-full p-1 text-gray-500 transition-opacity hover:bg-gray-200 hover:text-gray-800 focus:opacity-100 group-hover:opacity-100 ${
                    menuId === m.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <MoreVertical size={16} />
                </button>

                {menuId === m.id && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full z-20 mt-1 w-28 overflow-hidden rounded-lg border border-gray-100 bg-white py-1 shadow-lg"
                  >
                    {onEdit && (
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => startEdit(m)}
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-100"
                      >
                        <Pencil size={13} />
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setMenuId(null);
                          onDelete(m);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={13} />
                        Delete
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            <div
              className={`max-w-[70%] rounded-lg px-3 py-1.5 ${
                m.mine ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              {variant === "project" && !m.mine && (
                <p className="text-[9px] text-gray-500">{m.author}</p>
              )}

              {editingId === m.id ? (
                <div className="flex items-center gap-1">
                  <input
                    autoFocus
                    value={editDraft}
                    onChange={(e) => setEditDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit(m);
                      if (e.key === "Escape") setEditingId(null);
                    }}
                    className="min-w-0 flex-1 rounded bg-white px-2 py-0.5 text-[13px] text-gray-900 outline-none"
                  />
                  <button type="button" aria-label="Save" onClick={() => saveEdit(m)}>
                    <Check size={14} />
                  </button>
                  <button type="button" aria-label="Cancel" onClick={() => setEditingId(null)}>
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <p className="text-[13px]">
                  {m.text}
                  {m.edited && <span className="ml-1 text-[10px] opacity-70">(edited)</span>}
                </p>
              )}

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