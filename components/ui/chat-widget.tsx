"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useChat, type UIMessage } from "@ai-sdk/react";
import {
  clykurChatTransport,
  setChatTurnstileToken,
} from "@/lib/ai/chat-client-transport";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Trash2 } from "lucide-react";
import { ChatBrandIcon } from "@/components/chat/chat-brand-icon";
import { ChatActionButtons } from "@/components/chat/chat-action-buttons";
import { resolveChatTurn } from "@/lib/ai/chat-turn";
import {
  CHAT_OPENING_WELCOME,
  sanitizeAssistantCopy,
} from "@/lib/ai/chat-scope";
import {
  getDefaultQuickPrompts,
  getWelcomeExtras,
} from "@/lib/ai/chat-suggestions";
import { buildExtrasForTopic } from "@/lib/ai/chat-response-extras";
import {
  getAutoOpenDelayMs,
  shouldAutoOpenOnPath,
} from "@/lib/ai/chat-auto-open";
import {
  playChatOpenAttentionSynced,
  installChatAttentionUnlock,
  prefersReducedSensory,
} from "@/lib/ai/chat-attention";
import {
  hasPersistedChatState,
  loadChatState,
  markAutoOpenFiredThisSession,
  markChatDismissedThisSession,
  saveChatState,
  wasAutoOpenFiredThisSession,
  wasChatDismissedThisSession,
} from "@/lib/ai/chat-storage";
import type { ChatMessageExtras } from "@/lib/ai/chat-types";
import { cn } from "@/lib/utils";
import { Turnstile } from "@marsidev/react-turnstile";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

function messageText(message: UIMessage): string {
  return (
    message.parts
      ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("") ?? ""
  );
}

function newId() {
  return crypto.randomUUID();
}

function createWelcomeSeed(): {
  messages: UIMessage[];
  metaByMessageId: Record<string, ChatMessageExtras>;
} {
  const assistantId = newId();
  return {
    messages: [
      {
        id: assistantId,
        role: "assistant",
        parts: [{ type: "text", text: CHAT_OPENING_WELCOME }],
      },
    ],
    metaByMessageId: {
      [assistantId]: getWelcomeExtras(),
    },
  };
}

function closeChatPanel(setIsOpen: (open: boolean) => void) {
  markChatDismissedThisSession();
  setIsOpen(false);
}

export function ChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [attentionPulse, setAttentionPulse] = useState(false);
  const [input, setInput] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [metaByMessageId, setMetaByMessageId] = useState<
    Record<string, ChatMessageExtras>
  >({});
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesScrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevStatus = useRef<string>("ready");
  const initDone = useRef(false);
  const autoOpenAttentionPending = useRef(false);
  const [openEnterVariant, setOpenEnterVariant] = useState<"manual" | "auto">(
    "manual",
  );

  const { messages, setMessages, sendMessage, status, error } = useChat({
    id: "clykur-chat",
    transport: clykurChatTransport,
  });

  const isLoading = status === "submitted" || status === "streaming";

  const lastAssistantText = (() => {
    const last = [...messages].reverse().find((m) => m.role === "assistant");
    return last ? messageText(last) : "";
  })();

  const scrollMessagesToBottom = useCallback((instant = false) => {
    const el = messagesScrollRef.current;
    if (!el) return;
    const useInstant =
      instant ||
      (typeof window !== "undefined" &&
        window.matchMedia("(max-width: 639px)").matches);

    const apply = () => {
      const top = el.scrollHeight - el.clientHeight;
      if (useInstant) {
        el.scrollTop = top > 0 ? top : 0;
      } else {
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      }
    };

    requestAnimationFrame(() => {
      apply();
      if (useInstant) {
        requestAnimationFrame(apply);
      }
    });
  }, []);

  const scrollMessagesToTop = useCallback(() => {
    const el = messagesScrollRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollTop = 0;
    });
  }, []);

  useEffect(() => {
    if (initDone.current) return;
    initDone.current = true;

    const state = loadChatState();
    const persisted = hasPersistedChatState();
    queueMicrotask(() => {
      setIsClient(true);
      if (persisted) {
        setMessages(state.messages as UIMessage[]);
        setMetaByMessageId(state.metaByMessageId ?? {});
      } else {
        const seed = createWelcomeSeed();
        setMessages(seed.messages);
        setMetaByMessageId(seed.metaByMessageId);
      }
    });
  }, [setMessages]);

  useEffect(() => installChatAttentionUnlock(), []);

  useEffect(() => {
    if (!isClient) return;
    const path = pathname ?? "/";
    if (wasChatDismissedThisSession()) return;
    if (wasAutoOpenFiredThisSession()) return;
    if (!shouldAutoOpenOnPath(path)) return;

    const delay = getAutoOpenDelayMs(path);
    const timer = window.setTimeout(() => {
      if (wasChatDismissedThisSession()) return;
      if (wasAutoOpenFiredThisSession()) return;

      markAutoOpenFiredThisSession();
      autoOpenAttentionPending.current = true;
      setOpenEnterVariant("auto");
      setIsOpen(true);
      setAttentionPulse(true);
      window.setTimeout(() => setAttentionPulse(false), 1400);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [isClient, pathname]);

  useLayoutEffect(() => {
    if (!isOpen || !autoOpenAttentionPending.current) return;
    const fallbackMs = prefersReducedSensory() ? 0 : 120;
    const timer = window.setTimeout(() => {
      if (!autoOpenAttentionPending.current) return;
      autoOpenAttentionPending.current = false;
      playChatOpenAttentionSynced();
    }, fallbackMs);
    return () => window.clearTimeout(timer);
  }, [isOpen, openEnterVariant]);

  useEffect(() => {
    if (!isClient) return;
    saveChatState({
      messages,
      metaByMessageId,
    });
  }, [messages, metaByMessageId, isClient]);

  useLayoutEffect(() => {
    if (!isOpen) return;
    const onlyWelcome =
      messages.length === 1 && messages[0]?.role === "assistant";
    if (onlyWelcome) {
      scrollMessagesToTop();
      return;
    }
    scrollMessagesToBottom(isLoading);
  }, [
    messages,
    lastAssistantText,
    isLoading,
    isOpen,
    scrollMessagesToBottom,
    scrollMessagesToTop,
  ]);

  useEffect(() => {
    if (prevStatus.current !== "ready" && status === "ready") {
      const lastAssistant = [...messages]
        .reverse()
        .find((m) => m.role === "assistant");
      if (lastAssistant && !metaByMessageId[lastAssistant.id]) {
        const lastUser = [...messages].reverse().find((m) => m.role === "user");
        const userQ = lastUser ? messageText(lastUser) : "";
        const assistantText = messageText(lastAssistant);
        const assistantId = lastAssistant.id;
        const extras = buildExtrasForTopic({
          userQuestion: userQ,
          assistantText,
        });
        queueMicrotask(() => {
          setMetaByMessageId((prev) => ({
            ...prev,
            [assistantId]: extras,
          }));
        });
      }
    }
    prevStatus.current = status;
  }, [status, messages, metaByMessageId]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        closeChatPanel(setIsOpen);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) closeChatPanel(setIsOpen);
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const submitText = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const turn = resolveChatTurn(trimmed);
      if (!turn) return;

      if (turn.mode === "off_topic" || turn.mode === "canonical") {
        const userMsg: UIMessage = {
          id: newId(),
          role: "user",
          parts: [{ type: "text", text: trimmed }],
        };
        const assistantId = newId();
        const assistantMsg: UIMessage = {
          id: assistantId,
          role: "assistant",
          parts: [{ type: "text", text: turn.text }],
        };
        setMessages((prev) => [...prev, userMsg, assistantMsg]);
        setMetaByMessageId((prev) => ({
          ...prev,
          [assistantId]: turn.extras,
        }));
        setInput("");
        return;
      }

      sendMessage({ text: trimmed });
      setInput("");
    },
    [isLoading, sendMessage, setMessages],
  );

  useEffect(() => {
    if (!isOpen || typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 639px)");
    if (!mq.matches) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitText(input);
  };

  const clearChat = () => {
    setMessages([]);
    setMetaByMessageId({});
    setIsOpen(true);
    scrollMessagesToTop();
  };

  const hasChatContent = messages.length > 0;

  const quickPrompts = getDefaultQuickPrompts();

  return (
    <div
      ref={chatRef}
      className={cn(
        "fixed z-[90]",
        isOpen
          ? cn(
              "inset-x-0 flex items-end justify-end px-3 pt-1",
              "bottom-[max(0.75rem,env(safe-area-inset-bottom))]",
              "pointer-events-none sm:inset-auto sm:right-6 sm:top-auto sm:px-0 sm:bottom-6",
            )
          : cn(
              "right-3 flex flex-col items-end sm:right-6",
              "bottom-[max(0.75rem,env(safe-area-inset-bottom))] sm:bottom-6",
            ),
      )}
      data-lenis-prevent
    >
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={
              openEnterVariant === "auto"
                ? { opacity: 0.92, y: 10, scale: 0.98 }
                : { opacity: 0, y: 20, scale: 0.94 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={
              openEnterVariant === "auto"
                ? { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
                : { type: "spring", stiffness: 380, damping: 28 }
            }
            style={{ transformOrigin: "100% 100%" }}
            onAnimationStart={() => {
              if (!autoOpenAttentionPending.current) return;
              autoOpenAttentionPending.current = false;
              playChatOpenAttentionSynced();
            }}
            className={cn(
              "pointer-events-auto flex w-full max-w-[400px] flex-col overflow-hidden rounded-2xl border border-foreground/[0.08] bg-white shadow-[0_24px_64px_-16px_rgba(15,15,15,0.35)]",
              "h-[min(440px,calc(100dvh-5rem-env(safe-area-inset-top)-env(safe-area-inset-bottom)))]",
              "max-h-[calc(100dvh-5rem-env(safe-area-inset-top)-env(safe-area-inset-bottom))]",
              "sm:mb-4 sm:h-[min(520px,calc(100dvh-6.5rem))] sm:max-h-[calc(100dvh-6.5rem)] sm:max-w-[420px] sm:border-white/50 sm:bg-white/95 sm:shadow-[0_32px_96px_-32px_rgba(15,15,15,0.35)] sm:backdrop-blur-xl",
              attentionPulse &&
                "ring-2 ring-[#ff3b1f]/50 ring-offset-2 ring-offset-transparent animate-[pulse_1.2s_ease-in-out_1]",
            )}
            data-lenis-prevent
          >
            <div className="flex shrink-0 items-center justify-between border-b border-[#ff3b1f]/[0.08] bg-white px-3 py-2.5 sm:px-4 sm:py-3">
              <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                <ChatBrandIcon size={26} className="shrink-0 sm:hidden" />
                <ChatBrandIcon size={28} className="hidden shrink-0 sm:block" />
                <div className="min-w-0">
                  <h3 className="truncate font-poppins text-[13px] font-semibold tracking-[-0.02em] sm:text-sm">
                    Clykur Assistant
                  </h3>
                  <p className="flex items-center gap-1.5 text-[10px] text-foreground/45 sm:text-[11px]">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    Sales & support
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {hasChatContent ? (
                  <button
                    type="button"
                    onClick={clearChat}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-foreground/45 hover:bg-foreground/[0.05] hover:text-foreground sm:w-auto sm:gap-1 sm:px-2"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span className="hidden text-[11px] font-medium sm:inline">
                      Clear
                    </span>
                    <span className="sr-only sm:hidden">Clear chat</span>
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => closeChatPanel(setIsOpen)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-foreground/50 hover:bg-foreground/[0.05]"
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </button>
              </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <div
                ref={messagesScrollRef}
                className="min-h-0 flex-1 space-y-4 overflow-y-auto overflow-x-hidden overscroll-y-contain px-4 pb-4 pt-3 [-webkit-overflow-scrolling:touch] [overscroll-behavior-y:contain] touch-pan-y"
                data-lenis-prevent
              >
                {messages.length === 0 && !isLoading ? (
                  <p className="px-1 py-4 text-center text-[11px] leading-relaxed text-foreground/45 sm:py-6 sm:text-[12px]">
                    Ask anything about Clykur, or pick a prompt below.
                  </p>
                ) : null}
                {messages.map((message) => {
                  const isUser = message.role === "user";
                  const extras = metaByMessageId[message.id];
                  return (
                    <div
                      key={message.id}
                      className={cn(
                        "flex max-w-[92%] flex-col scroll-mt-2",
                        isUser ? "ml-auto items-end" : "items-start",
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm",
                          isUser
                            ? "rounded-br-md bg-[#ff3b1f] text-white"
                            : "rounded-bl-md border border-foreground/[0.06] bg-white/90 text-foreground/80",
                        )}
                      >
                        <div className="mb-1 flex items-center gap-1.5 opacity-70">
                          {isUser ? (
                            <User className="h-3 w-3" />
                          ) : (
                            <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                              <ChatBrandIcon size={14} />
                            </span>
                          )}
                          <span className="text-[9px] font-semibold uppercase tracking-wider">
                            {isUser ? "You" : "Clykur"}
                          </span>
                        </div>
                        <div className="prose-chat">
                          {message.parts?.map((part, i) =>
                            part.type === "text" ? (
                              <ReactMarkdown
                                key={i}
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  p: ({ ...props }) => (
                                    <p className="mb-2 last:mb-0" {...props} />
                                  ),
                                  h3: ({ ...props }) => (
                                    <p
                                      className="mb-1.5 mt-2 text-[12px] font-semibold text-foreground/90 first:mt-0"
                                      {...props}
                                    />
                                  ),
                                  strong: ({ ...props }) => (
                                    <strong
                                      className="font-semibold text-foreground/90"
                                      {...props}
                                    />
                                  ),
                                  ul: ({ ...props }) => (
                                    <ul
                                      className="mb-2 list-disc space-y-1.5 pl-4 last:mb-0"
                                      {...props}
                                    />
                                  ),
                                  ol: ({ ...props }) => (
                                    <ol
                                      className="mb-2 list-decimal space-y-1.5 pl-4 last:mb-0"
                                      {...props}
                                    />
                                  ),
                                  li: ({ ...props }) => (
                                    <li className="leading-snug" {...props} />
                                  ),
                                  a: ({ href, children, ...props }) =>
                                    href?.startsWith("/") ? (
                                      <Link
                                        href={href}
                                        className="font-medium underline underline-offset-2"
                                      >
                                        {children}
                                      </Link>
                                    ) : (
                                      <a
                                        href={href}
                                        className="font-medium underline underline-offset-2"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        {...props}
                                      >
                                        {children}
                                      </a>
                                    ),
                                }}
                              >
                                {sanitizeAssistantCopy(part.text)}
                              </ReactMarkdown>
                            ) : null,
                          )}
                        </div>
                        {!isUser && extras ? (
                          <ChatActionButtons
                            actions={extras.actions}
                            relatedPages={extras.relatedPages}
                            followUps={extras.followUps}
                            onQuickReply={submitText}
                          />
                        ) : null}
                      </div>
                    </div>
                  );
                })}

                {error ? (
                  <div className="rounded-2xl border border-red-200/80 bg-red-50/90 px-3.5 py-3 text-[13px] text-red-800">
                    {error.message.includes("Too many requests") ||
                    error.message.includes("quickly")
                      ? "You're sending messages quickly. Please wait a moment."
                      : error.message.includes("quota") ||
                          error.message.includes("429")
                        ? "High demand right now. Answers may come from our site index. Try again in a minute or use the links below."
                        : "Connection issue. Try again or visit our contact page."}
                    <button
                      type="button"
                      className="ml-2 font-semibold underline"
                      onClick={() => {
                        const lastUser = [...messages]
                          .reverse()
                          .find((m) => m.role === "user");
                        if (lastUser) {
                          sendMessage({ text: messageText(lastUser) });
                        }
                      }}
                    >
                      Retry
                    </button>
                  </div>
                ) : null}

                {isLoading ? (
                  <div className="flex items-start gap-2">
                    <div className="rounded-2xl rounded-bl-md border border-foreground/[0.06] bg-white/90 px-3.5 py-3">
                      <div className="mb-2 flex items-center gap-1.5 opacity-70">
                        <ChatBrandIcon size={14} />
                        <span className="text-[9px] font-semibold uppercase tracking-wider">
                          Clykur
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/35 [animation-delay:-0.2s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/35 [animation-delay:-0.1s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/35" />
                      </div>
                    </div>
                  </div>
                ) : null}
                <div ref={messagesEndRef} />
              </div>

              <div className="shrink-0 border-t border-foreground/[0.06] bg-white px-2.5 py-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] sm:px-3 sm:py-3 sm:pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                <div className="mb-2 flex gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {quickPrompts.map((q) => (
                    <button
                      key={q}
                      type="button"
                      disabled={isLoading}
                      onClick={() => submitText(q)}
                      className="shrink-0 rounded-full border border-foreground/[0.08] bg-white/90 px-3 py-1 text-[11px] font-medium text-foreground/60 hover:border-[#ff3b1f]/25 hover:text-[#ff3b1f] disabled:opacity-50"
                    >
                      {q}
                    </button>
                  ))}
                </div>
                <form onSubmit={handleSubmit} className="flex min-w-0 gap-2">
                  {turnstileSiteKey ? (
                    <div className="sr-only" aria-hidden>
                      <Turnstile
                        siteKey={turnstileSiteKey}
                        options={{ size: "invisible" }}
                        onSuccess={(token) => {
                          setChatTurnstileToken(token);
                        }}
                        onExpire={() => {
                          setChatTurnstileToken(null);
                        }}
                      />
                    </div>
                  ) : null}
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything about Clykur…"
                    className="min-h-[44px] min-w-0 flex-1 rounded-xl border border-foreground/[0.1] bg-white px-3 text-[16px] outline-none ring-[#ff3b1f]/20 placeholder:text-foreground/35 focus:ring-2 sm:px-3.5 sm:text-[13px]"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-xl bg-[#ff3b1f] px-3.5 text-[13px] font-semibold text-white hover:bg-[#e6351c] disabled:opacity-45 sm:px-4"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {!isOpen ? (
        <motion.button
          type="button"
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setOpenEnterVariant("manual");
            setIsOpen(true);
          }}
          className="group relative flex h-[3.25rem] w-[3.25rem] items-center justify-center bg-transparent p-0 sm:h-16 sm:w-16"
        >
          <ChatBrandIcon
            size={40}
            className="drop-shadow-[0_8px_28px_rgba(255,59,31,0.45)] transition-transform group-hover:scale-105 sm:hidden"
          />
          <ChatBrandIcon
            size={44}
            className="hidden drop-shadow-[0_8px_28px_rgba(255,59,31,0.45)] transition-transform group-hover:scale-105 sm:block"
          />
          <span className="sr-only">Open chat</span>
        </motion.button>
      ) : null}
    </div>
  );
}
