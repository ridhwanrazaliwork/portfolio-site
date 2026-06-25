"use client";

import { Source } from "@/lib/chat-api";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  isStreaming?: boolean;
}

export default function ChatMessage({
  role,
  content,
  sources,
  isStreaming,
}: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
          isUser
            ? "bg-accent/15 text-foreground rounded-br-md"
            : "glass-panel rounded-bl-md"
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {content}
          {isStreaming && (
            <span className="inline-block w-[2px] h-4 bg-accent ml-0.5 animate-pulse" />
          )}
        </p>
        {sources && sources.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-white/[0.06]">
            <span
              className="text-[10px] text-[#737373] uppercase tracking-wider mr-0.5"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              Sources:
            </span>
            {sources.map((s, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-accent/10 text-accent/90 border border-accent/20"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                {s.repo}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
