import { useState } from "react";
import { Bot, Send } from "lucide-react";

function AskAICard() {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    // TODO: call your AI endpoint here
    console.log("ask:", text);
    setText("");
  };

  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-gradient-to-b from-blue-50/60 to-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">Ask AI</h3>

      <div className="flex flex-1 flex-col items-center justify-center gap-3 py-6">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <Bot size={26} />
        </span>
        <p className="text-sm text-gray-700">ask me anything about...</p>
      </div>

      <div className="relative rounded-xl bg-gray-50 p-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="ask me anything about..."
          rows={3}
          className="w-full resize-none bg-transparent pr-8 text-xs text-gray-700 outline-none placeholder:text-gray-500"
        />
        <button
          type="button"
          onClick={handleSend}
          aria-label="Send"
          className="absolute bottom-3 right-3 text-gray-600 hover:text-blue-600"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

export default AskAICard;