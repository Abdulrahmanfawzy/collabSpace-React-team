import { useState } from "react";
import { MoreVertical, Paperclip, Search, Send, X } from "lucide-react";

type Props = {
  tag: string;      
  author: string;  
  onClose: () => void;
};

export default function TagModal({ tag, author, onClose }: Props) {
  const [replies, setReplies] = useState<string[]>([]);
  const [draft, setDraft] = useState("");

  const send = () => {
    if (!draft.trim()) return;
    setReplies([...replies, draft]);
    setDraft("");
  };

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      
      <div className="flex h-[480px] w-[560px] flex-col rounded-xl bg-gray-50 p-3">
      
        <div className="flex items-center justify-between rounded-lg bg-blue-600 px-4 py-2 text-white">
          <div>
            <p className="text-sm font-semibold">{tag}</p>
            <p className="text-[9px]">{author}</p>
          </div>
          <div className="flex items-center gap-4">
            <Search size={16} />
            <MoreVertical size={16} />
            <button onClick={onClose}>
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-2 overflow-y-auto py-4">
          {replies.map((text, i) => (
            <p key={i} className="w-fit rounded-lg bg-white px-3 py-1.5 text-[13px]">
              {text}
            </p>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-3">
          <div className="flex flex-1 items-center rounded-lg bg-white px-4 py-3">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write a message"
              className="flex-1 bg-transparent text-sm outline-none"
            />
            <Paperclip size={18} className="text-gray-600" />
          </div>
          <button onClick={send} className="flex h-11 w-14 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}