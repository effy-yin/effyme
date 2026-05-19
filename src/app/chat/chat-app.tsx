"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import {
  createConversationId,
  createMessageId,
  loadConversations,
  saveConversations,
  titleFromMessage,
} from "./chat-storage";
import { STARTER_PROMPTS, type ChatMessage, type Conversation } from "./types";

function createEmptyConversation(): Conversation {
  const id = createConversationId();
  const now = Date.now();
  return {
    id,
    title: "New chat",
    messages: [],
    createdAt: now,
    updatedAt: now,
  };
}

async function readChatStream(
  response: Response,
  onChunk: (text: string) => void,
): Promise<void> {
  const reader = response.body?.getReader();
  if (!reader) throw new Error("No response stream");

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const payload = trimmed.slice(5).trim();
      if (payload === "[DONE]") return;

      try {
        const json = JSON.parse(payload) as { content?: string };
        if (json.content) onChunk(json.content);
      } catch {
        // ignore malformed chunks
      }
    }
  }
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-3 ${isUser ? "bg-transparent" : "bg-[#f7f7f8] px-4 py-6 sm:px-6"}`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-sm text-xs font-semibold ${
          isUser
            ? "bg-[#5436da] text-white"
            : "bg-[#19c37d] text-white"
        }`}
        aria-hidden
      >
        {isUser ? "Y" : "AI"}
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="mb-1 text-xs font-semibold text-[#6e6e80]">
          {isUser ? "You" : "Assistant"}
        </p>
        <div className="whitespace-pre-wrap text-[15px] leading-7 text-[#353740]">
          {message.content}
        </div>
      </div>
    </div>
  );
}

export function ChatApp() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === activeId) ?? null,
    [conversations, activeId],
  );

  const sortedConversations = useMemo(
    () => [...conversations].sort((a, b) => b.updatedAt - a.updatedAt),
    [conversations],
  );

  useEffect(() => {
    const stored = loadConversations();
    if (stored.length > 0) {
      setConversations(stored);
      setActiveId(stored[0].id);
    } else {
      const initial = createEmptyConversation();
      setConversations([initial]);
      setActiveId(initial.id);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveConversations(conversations);
  }, [conversations, hydrated]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages, isLoading]);

  const resizeTextarea = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, []);

  useEffect(() => {
    resizeTextarea();
  }, [input, resizeTextarea]);

  const updateConversation = useCallback(
    (id: string, updater: (conversation: Conversation) => Conversation) => {
      setConversations((prev) =>
        prev.map((c) => (c.id === id ? updater(c) : c)),
      );
    },
    [],
  );

  const handleNewChat = useCallback(() => {
    const next = createEmptyConversation();
    setConversations((prev) => [next, ...prev]);
    setActiveId(next.id);
    setInput("");
    setSidebarOpen(false);
  }, []);

  const handleDeleteChat = useCallback(
    (id: string) => {
      setConversations((prev) => {
        const next = prev.filter((c) => c.id !== id);
        if (next.length === 0) {
          const fresh = createEmptyConversation();
          setActiveId(fresh.id);
          return [fresh];
        }
        if (activeId === id) {
          setActiveId(next[0].id);
        }
        return next;
      });
    },
    [activeId],
  );

  const stopGenerating = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsLoading(false);
  }, []);

  const sendMessage = useCallback(
    async (rawText: string) => {
      const text = rawText.trim();
      if (!text || !activeId || isLoading) return;

      const userMessage: ChatMessage = {
        id: createMessageId(),
        role: "user",
        content: text,
      };

      const assistantId = createMessageId();
      const assistantPlaceholder: ChatMessage = {
        id: assistantId,
        role: "assistant",
        content: "",
      };

      updateConversation(activeId, (conversation) => {
        const isFirst = conversation.messages.length === 0;
        return {
          ...conversation,
          title: isFirst ? titleFromMessage(text) : conversation.title,
          updatedAt: Date.now(),
          messages: [
            ...conversation.messages,
            userMessage,
            assistantPlaceholder,
          ],
        };
      });

      setInput("");
      setIsLoading(true);

      const conversation = conversations.find((c) => c.id === activeId);
      const history = [
        ...(conversation?.messages ?? []),
        userMessage,
      ].map((m) => ({ role: m.role, content: m.content }));

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`);
        }

        await readChatStream(response, (chunk) => {
          updateConversation(activeId, (c) => ({
            ...c,
            messages: c.messages.map((m) =>
              m.id === assistantId
                ? { ...m, content: m.content + chunk }
                : m,
            ),
          }));
        });
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
        const message =
          error instanceof Error ? error.message : "Something went wrong.";
        updateConversation(activeId, (c) => ({
          ...c,
          messages: c.messages.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content: `Sorry, I couldn't complete that request. ${message}`,
                }
              : m,
          ),
        }));
      } finally {
        setIsLoading(false);
        abortRef.current = null;
        updateConversation(activeId, (c) => ({ ...c, updatedAt: Date.now() }));
      }
    },
    [activeId, conversations, isLoading, updateConversation],
  );

  const handleSubmit = () => {
    void sendMessage(input);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  if (!hydrated) {
    return (
      <div className="flex h-dvh items-center justify-center bg-white text-sm text-[#6e6e80]">
        Loading chat…
      </div>
    );
  }

  const hasMessages = (activeConversation?.messages.length ?? 0) > 0;

  return (
    <div className="flex h-dvh overflow-hidden bg-white text-[#353740]">
      {sidebarOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] shrink-0 flex-col bg-[#171717] text-white transition-transform duration-200 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2 border-b border-white/10 p-3">
          <button
            type="button"
            onClick={handleNewChat}
            className="flex flex-1 items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-sm transition-colors hover:bg-white/10"
          >
            <span className="text-lg leading-none" aria-hidden>
              +
            </span>
            New chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-2">
          <p className="px-2 py-2 text-[11px] font-medium uppercase tracking-wider text-white/40">
            History
          </p>
          <ul className="space-y-0.5">
            {sortedConversations.map((conversation) => {
              const isActive = conversation.id === activeId;
              return (
                <li key={conversation.id} className="group relative">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveId(conversation.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full truncate rounded-lg px-3 py-2 pr-8 text-left text-sm transition-colors ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "text-white/80 hover:bg-white/10"
                    }`}
                  >
                    {conversation.title}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteChat(conversation.id)}
                    className="absolute right-1 top-1/2 hidden -translate-y-1/2 rounded p-1 text-white/50 hover:bg-white/10 hover:text-white group-hover:block"
                    aria-label={`Delete ${conversation.title}`}
                  >
                    ×
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="border-t border-white/10 p-3">
          <Link
            href="/"
            className="block rounded-lg px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            ← Back to portfolio
          </Link>
        </div>
      </aside>

      <div className="relative flex min-w-0 flex-1 flex-col">
        <header className="flex h-12 shrink-0 items-center gap-3 border-b border-[#ececf1] px-3 sm:px-4">
          <button
            type="button"
            className="rounded-lg p-2 text-[#353740] hover:bg-[#f7f7f8] md:hidden"
            aria-label="Open sidebar"
            onClick={() => setSidebarOpen(true)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <h1 className="text-sm font-medium text-[#353740]">Effy Chat</h1>
          <span className="ml-auto hidden rounded-full bg-[#f7f7f8] px-2 py-0.5 text-xs text-[#6e6e80] sm:inline">
            Chat
          </span>
        </header>

        <div className="flex-1 overflow-y-auto">
          {!hasMessages ? (
            <div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-4 pb-32 pt-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#19c37d] text-2xl font-bold text-white">
                AI
              </div>
              <h2 className="text-center text-2xl font-semibold text-[#202123]">
                How can I help you today?
              </h2>
              <p className="mt-2 max-w-md text-center text-sm text-[#6e6e80]">
                Ask about frontend work, projects, or collaboration. Press Enter
                to send, Shift+Enter for a new line.
              </p>
              <div className="mt-8 grid w-full max-w-2xl gap-2 sm:grid-cols-2">
                {STARTER_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    disabled={isLoading}
                    onClick={() => void sendMessage(prompt)}
                    className="rounded-xl border border-[#ececf1] bg-white px-4 py-3 text-left text-sm text-[#353740] transition-colors hover:bg-[#f7f7f8] disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl pb-36">
              {activeConversation?.messages.map((message) =>
                message.content || message.role === "user" ? (
                  <MessageBubble key={message.id} message={message} />
                ) : (
                  <div
                    key={message.id}
                    className="flex gap-3 bg-[#f7f7f8] px-4 py-6 sm:px-6"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-[#19c37d] text-xs font-semibold text-white">
                      AI
                    </div>
                    <div className="flex items-center gap-1 pt-2">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-[#6e6e80] [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-[#6e6e80] [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-[#6e6e80]" />
                    </div>
                  </div>
                ),
              )}
              <div ref={bottomRef} aria-hidden />
            </div>
          )}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white to-transparent pb-4 pt-10">
          <div className="pointer-events-auto mx-auto max-w-3xl px-4">
            <div className="relative flex items-end gap-2 rounded-3xl border border-[#d9d9e3] bg-white px-4 py-3 shadow-[0_0_15px_rgba(0,0,0,0.06)] focus-within:border-[#acacbe]">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Message Effy Chat…"
                disabled={isLoading}
                className="max-h-[200px] min-h-[24px] flex-1 resize-none bg-transparent text-[15px] leading-6 text-[#353740] outline-none placeholder:text-[#8e8ea0] disabled:opacity-60"
              />
              {isLoading ? (
                <button
                  type="button"
                  onClick={stopGenerating}
                  className="mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#353740] text-white transition-colors hover:bg-black"
                  aria-label="Stop generating"
                >
                  <span className="block h-2.5 w-2.5 bg-white" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!input.trim()}
                  className="mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#19c37d] text-white transition-colors hover:bg-[#1aa37a] disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Send message"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M12 19V5M5 12l7-7 7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
            <p className="mt-2 text-center text-xs text-[#8e8ea0]">
              AI can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
