export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  role: MessageRole;
  content: string;
}

export interface Source {
  repo: string;
  content_preview: string;
}

export type SSEEvent =
  | { type: "sources"; sources: Source[] }
  | { type: "token"; token: string };

const BASE_URL =
  process.env.NEXT_PUBLIC_CHAT_API_URL ?? "https://readmerag.onrender.com";

const requestTimestamps: number[] = [];
const MAX_REQUESTS = 5;
const WINDOW_MS = 60_000;

function pruneTimestamps() {
  const now = Date.now();
  while (requestTimestamps.length > 0 && requestTimestamps[0] < now - WINDOW_MS) {
    requestTimestamps.shift();
  }
}

export function canSend(): boolean {
  pruneTimestamps();
  return requestTimestamps.length < MAX_REQUESTS;
}

export function nextAvailableIn(): number {
  pruneTimestamps();
  if (requestTimestamps.length < MAX_REQUESTS) return 0;
  const oldest = requestTimestamps[0];
  return Math.max(0, Math.ceil((oldest + WINDOW_MS - Date.now()) / 1000));
}

function trackRequest() {
  pruneTimestamps();
  requestTimestamps.push(Date.now());
}

export async function* sendStreamingMessage(
  query: string,
  history: ChatMessage[]
): AsyncGenerator<SSEEvent> {
  trackRequest();

  const res = await fetch(`${BASE_URL}/api/chat/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, history }),
  });

  if (!res.ok) {
    if (res.status === 429) {
      const retryAfter = res.headers.get("Retry-After");
      const seconds = retryAfter ? parseInt(retryAfter, 10) : 60;
      throw new RateLimitError(seconds);
    }
    throw new Error(`Server error: ${res.status}`);
  }

  const reader = res.body!.pipeThrough(new TextDecoderStream()).getReader();

  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += value;
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const payload = line.slice(6);
      if (payload === "[DONE]") return;
      const parsed = JSON.parse(payload);
      if (parsed.type === "sources") {
        yield { type: "sources", sources: parsed.sources };
      } else if (parsed.type === "token") {
        yield { type: "token", token: parsed.token };
      }
    }
  }
}

export class RateLimitError extends Error {
  retryAfterSeconds: number;
  constructor(seconds: number) {
    super(`Rate limited. Retry after ${seconds}s.`);
    this.retryAfterSeconds = seconds;
    this.name = "RateLimitError";
  }
}
