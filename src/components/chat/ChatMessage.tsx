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
      </div>
    </div>
  );
}
