"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatMessage from "./ChatMessage";
import ChatToggle from "./ChatToggle";
import {
  sendStreamingMessage,
  canSend,
  nextAvailableIn,
  RateLimitError,
  type ChatMessage as ChatMessageType,
  type Source,
} from "@/lib/chat-api";

interface DisplayMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
}

let nextId = 1;

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [history, setHistory] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [rateLimitedUntil, setRateLimitedUntil] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [hasUnread, setHasUnread] = useState(false);
  const [streamError, setStreamError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!rateLimitedUntil) return;
    const tick = () => {
      const remaining = Math.max(0, Math.ceil((rateLimitedUntil - Date.now()) / 1000));
      setCountdown(remaining);
      if (remaining <= 0) setRateLimitedUntil(null);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [rateLimitedUntil]);

  const toggleOpen = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = useCallback(async () => {
    const query = input.trim();
    if (!query || isStreaming) return;

    if (!canSend()) {
      const secs = nextAvailableIn();
      setRateLimitedUntil(Date.now() + secs * 1000);
      return;
    }

    setStreamError(null);
    setInput("");

    const userId = nextId++;
    const botId = nextId++;
    setMessages((prev) => [
      ...prev,
      { id: userId, role: "user", content: query },
      { id: botId, role: "assistant", content: "" },
    ]);
    setIsStreaming(true);

    let botContent = "";

    try {
      const gen = sendStreamingMessage(query, history);
      for await (const event of gen) {
        if (event.type === "token") {
          botContent += event.token;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === botId ? { ...m, content: botContent } : m
            )
          );
        } else if (event.type === "sources") {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === botId ? { ...m, sources: event.sources } : m
            )
          );
        }
      }
      setHistory((prev) =>
        [
          ...prev,
          { role: "user" as const, content: query },
          { role: "assistant" as const, content: botContent },
        ].slice(-20)
      );
      if (!isOpenRef.current) setHasUnread(true);
    } catch (err) {
      if (err instanceof RateLimitError) {
        setRateLimitedUntil(Date.now() + err.retryAfterSeconds * 1000);
      } else {
        setStreamError("Connection failed. Please try again.");
        setMessages((prev) => prev.filter((m) => m.id !== botId));
      }
    } finally {
      setIsStreaming(false);
    }
  }, [input, isStreaming, history]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{
              opacity: { duration: 0.2 },
              y: { type: "spring", stiffness: 400, damping: 25 },
              scale: { type: "spring", stiffness: 400, damping: 25 },
            }}
            className="glass-panel w-[380px] max-w-[calc(100vw-2rem)] max-h-[520px] flex flex-col overflow-hidden origin-bottom-right"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05] shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-accent"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div>
                  <p
                    className="text-sm font-semibold text-foreground"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    Rchat
                  </p>
                  <p
                    className="text-[10px] text-[#737373]"
                    style={{ fontFamily: "var(--font-jetbrains)" }}
                  >
                    Ask me anything about Ridhwan
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1 scroll-smooth">
              {messages.length === 0 && (
                <ChatMessage
                  role="assistant"
                  content={"Hi there \u{1F44B}\nHow can I help?"}
                />
              )}
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  role={msg.role}
                  content={msg.content}
                  sources={msg.sources}
                  isStreaming={
                    isStreaming &&
                    msg === messages[messages.length - 1] &&
                    msg.role === "assistant"
                  }
                />
              ))}
              {streamError && (
                <div className="flex justify-center">
                  <span className="px-3 py-1.5 rounded-full text-xs bg-red-500/10 text-red-400 border border-red-500/20">
                    {streamError}
                  </span>
                </div>
              )}
              {rateLimitedUntil && countdown > 0 && (
                <div className="flex justify-center">
                  <span
                    className="px-3 py-1.5 rounded-full text-xs bg-accent/10 text-accent/80 border border-accent/20"
                    style={{ fontFamily: "var(--font-jetbrains)" }}
                  >
                    Rate limit — try again in {countdown}s
                  </span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="shrink-0 border-t border-white/[0.05] px-4 py-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question..."
                  disabled={isStreaming || (rateLimitedUntil !== null && countdown > 0)}
                  className="flex-1 bg-white/[0.06] border border-white/[0.08] rounded-xl px-3.5 py-2 text-sm text-foreground placeholder-[#737373] outline-none focus:border-accent/40 focus:bg-white/[0.08] transition-colors disabled:opacity-50"
                />
                <button
                  onClick={handleSubmit}
                  disabled={!input.trim() || isStreaming || (rateLimitedUntil !== null && countdown > 0)}
                  className="w-9 h-9 rounded-xl bg-accent/20 flex items-center justify-center text-accent hover:bg-accent/30 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-[0_0_15px_var(--accent-glow)] disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                  aria-label="Send"
                >
                  {isStreaming ? (
                    <svg
                      className="animate-spin w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ChatToggle
        isOpen={isOpen}
        onClick={toggleOpen}
        hasUnread={hasUnread}
      />
    </div>
  );
}
