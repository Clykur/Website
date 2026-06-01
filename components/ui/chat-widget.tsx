"use client";

import { useState, useRef, useEffect } from "react";
import { useChat, type UIMessage } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MessageCircle, X, Send, Bot, User, ChevronLeft, AlertCircle, RefreshCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isClient, setIsClient] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const { messages, setMessages, sendMessage, status, error } = useChat({
    id: "clykur-chat",
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const isLoading = status === "submitted" || status === "streaming";

  // Conversation Persistence
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("clykur-chat-messages");
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse chat history");
      }
    }
  }, [setMessages]);

  useEffect(() => {
    if (isClient && messages.length > 0) {
      localStorage.setItem("clykur-chat-messages", JSON.stringify(messages));
    } else if (isClient && messages.length === 0) {
      localStorage.removeItem("clykur-chat-messages");
    }
  }, [messages, isClient]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Handle click outside and Escape key to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
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

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("clykur-chat-messages");
  };

  return (
    <div ref={chatRef} className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div
          className={cn(
            // FIX: Use explicit height instead of h-[500px] so flex children can calculate scroll correctly
            "mb-4 w-[350px] sm:w-[400px] flex flex-col bg-background border rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ease-in-out transform origin-bottom-right",
            // FIX: Added explicit max-height and height for proper flex/scroll layout
            "h-[500px] max-h-[calc(100vh-120px)]",
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
          )}
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between p-4 border-b bg-primary/5">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full md:hidden mr-1"
                onClick={() => setIsOpen(false)}
              >
                <ChevronLeft className="w-5 h-5 text-foreground/70" />
                <span className="sr-only">Back</span>
              </Button>
              {/* FIX: Ensure icon container has explicit sizing and flex-shrink-0 */}
              <div className="w-8 h-8 shrink-0 rounded-full bg-primary flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-sm font-calegar">Clykur Assistant</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Ask me anything about Clykur
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <Button
                  variant="ghost"
                  onClick={clearChat}
                  title="Clear conversation"
                >
                  <h3>Clear</h3>
                </Button>
              )}

              <Button
                variant="ghost"
                onClick={() => setIsOpen(false)}
                title="Close chat"
              >
                <h3>X</h3>
              </Button>
            </div>
          </div>

          {/* Messages Area — FIX: flex-1 + min-h-0 is the key combo for scroll inside flex column */}
          <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground space-y-3">
                {/* FIX: Explicit size on icon wrapper */}
                <div className="w-12 h-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm">
                  Hi there! 👋 I'm the Clykur AI assistant. How can I help you today?
                </p>
              </div>
            ) : (
              messages.map((message: UIMessage) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex w-max max-w-[85%] flex-col gap-2 rounded-2xl px-4 py-3 text-sm",
                    message.role === "user"
                      ? "ml-auto bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-muted rounded-tl-sm"
                  )}
                >
                  <div className="flex items-center gap-2 mb-1 opacity-70">
                    {/* FIX: Wrap icons in explicit-sized containers so they always render visibly */}
                    {message.role === "user" ? (
                      <span className="inline-flex items-center justify-center w-4 h-4 shrink-0">
                        <User className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-4 h-4 shrink-0">
                        <Bot className="w-3.5 h-3.5" />
                      </span>
                    )}
                    <span className="text-[10px] uppercase tracking-wider font-medium">
                      {message.role === "user" ? "You" : "Clykur"}
                    </span>
                    <span className="text-[9px] text-foreground/40 ml-auto">
                      {(message as any).createdAt ? new Date((message as any).createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </span>
                  </div>
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {message.parts?.map((part, i) => (
                      <span key={i}>
                        {part.type === "text" ? (
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                              ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2 last:mb-0 space-y-1" {...props} />,
                              ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2 last:mb-0 space-y-1" {...props} />,
                              li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                              strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
                              a: ({ node, ...props }) => <a className="underline underline-offset-2 decoration-primary/50 hover:decoration-primary transition-colors" {...props} />,
                            }}
                          >
                            {part.text}
                          </ReactMarkdown>
                        ) : (
                          ""
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}

            {error && (
              <div className="flex w-max max-w-[85%] flex-col gap-2 rounded-2xl px-4 py-3 text-sm bg-destructive/10 text-destructive rounded-tl-sm border border-destructive/20">
                <div className="flex items-center justify-between gap-4 mb-1 font-medium">
                  <div className="flex items-center gap-2">
                    {/* FIX: Explicit icon sizing */}
                    <span className="inline-flex items-center justify-center w-4 h-4 shrink-0">
                      <AlertCircle className="w-4 h-4" />
                    </span>
                    <span>Connection Error</span>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      const lastUserMessage = messages.filter(m => m.role === 'user').pop();
                      if (lastUserMessage) {
                        const content = (lastUserMessage as any).text || (lastUserMessage as any).content || "Retry";
                        sendMessage({ text: content });
                      }
                    }}
                  >
                    <h3>Retry</h3>
                  </Button>
                </div>
                <div className="whitespace-pre-wrap leading-relaxed opacity-90">
                  {error.message.includes('Too many requests')
                    ? "You're sending messages too fast! Please wait a moment."
                    : "I'm having trouble connecting right now. Please try again later."}
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex w-max max-w-[85%] flex-col gap-2 rounded-2xl px-4 py-3 text-sm bg-muted rounded-tl-sm">
                <div className="flex items-center gap-2 mb-1 opacity-70">
                  {/* FIX: Explicit icon sizing */}
                  <span className="inline-flex items-center justify-center w-4 h-4 shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-medium">Clykur</span>
                </div>
                <div className="flex space-x-1 items-center h-5">
                  <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="shrink-0 p-3 border-t bg-background">
            <form
              onSubmit={handleSubmit}
              className="flex w-full items-center space-x-2"
            >
              <Input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={handleInputChange}
                className="flex-1 rounded-full border-muted-foreground/20 focus-visible:ring-primary/20"
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
              >
                <h3 className="text-black">Send</h3>
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
        >
          {/* Outer solid chat bubble */}
          <MessageCircle
            className="w-16 h-16 text-primary drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
            fill="currentColor"
            strokeWidth={1}
          />
          {/* Inner robot icon positioned correctly inside the bubble */}
          <Bot className="w-7 h-7 text-primary-foreground absolute top-[42%] left-[50%] -translate-x-1/2 -translate-y-1/2" />

          <span className="sr-only">Open chat</span>
        </button>
      )}
    </div>
  );
}