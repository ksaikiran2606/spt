"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  CHAT_PRESETS,
  CHAT_WITH_US_ID,
  CHAT_WITH_US_ANSWER,
} from "@/lib/chatPresets";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  link?: { href: string; text: string };
};

const WELCOME_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Hi! I'm the SPT Solutions assistant. Choose a topic below or type your question—I'm here to help.",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const showQuickOptions = messages.length === 1 && messages[0].role === "assistant";

  function handlePresetClick(presetId: string) {
    if (presetId === CHAT_WITH_US_ID) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: CHAT_WITH_US_ANSWER },
      ]);
      return;
    }
    const preset = CHAT_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setMessages((m) => [
      ...m,
      { role: "user", content: preset.label },
      {
        role: "assistant",
        content: preset.answer,
        link: preset.link,
      },
    ]);
  }

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setLoading(true);
    try {
      const apiMessages = messages.map(({ role, content }) => ({ role, content }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...apiMessages, { role: "user", content: text }],
          sessionId:
            typeof window !== "undefined"
              ? sessionStorage.getItem("chatSessionId")
              : null,
        }),
      });
      const data = await res.json();
      if (data.message) {
        setMessages((m) => [...m, { role: "assistant", content: data.message }]);
      }
      if (data.sessionId && typeof window !== "undefined") {
        sessionStorage.setItem("chatSessionId", data.sessionId);
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't reach the server. Please try again or email us at hello@sptsolutions.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] rounded-2xl border border-[var(--border-light)] bg-white shadow-lg flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-[var(--border-light)]">
              <span className="font-semibold text-[var(--text-heading)]">
                SPT Assistant
              </span>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-heading)] rounded-lg"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="h-[360px] overflow-y-auto p-4 space-y-4 flex flex-col">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={
                    msg.role === "user"
                      ? "flex justify-end"
                      : "flex justify-start"
                  }
                >
                  <div
                    className={
                      msg.role === "user"
                        ? "rounded-2xl rounded-br-md bg-[var(--navy-primary)] text-white px-4 py-2 max-w-[85%]"
                        : "rounded-2xl rounded-bl-md bg-[var(--bg-alt)] text-[var(--text-heading)] px-4 py-2 max-w-[85%]"
                    }
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    {msg.role === "assistant" && msg.link && (
                      <Link
                        href={msg.link.href}
                        className="mt-2 inline-block text-sm font-medium text-[var(--purple-accent)] hover:underline"
                      >
                        {msg.link.text} →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
              {showQuickOptions && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide">
                    Quick options
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {CHAT_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handlePresetClick(preset.id)}
                        className="rounded-full border border-[var(--border-light)] bg-white px-3 py-1.5 text-sm text-[var(--text-body)] hover:bg-[var(--bg-alt)] hover:border-[var(--purple-accent)] transition-colors"
                      >
                        {preset.label}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => handlePresetClick(CHAT_WITH_US_ID)}
                      className="rounded-full bg-[var(--navy-primary)] px-3 py-1.5 text-sm text-white hover:bg-[var(--navy-light)] transition-colors"
                    >
                      Chat with us
                    </button>
                  </div>
                </div>
              )}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md bg-[var(--card-hover)] px-4 py-2">
                    <span className="animate-pulse">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
            <form
              className="p-4 border-t border-[var(--border-light)] flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our services..."
                className="flex-1 rounded-lg border border-[var(--border-light)] bg-white px-4 py-2.5 text-[var(--text-heading)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--purple-accent)]"
              />
              <Button
                type="submit"
                size="md"
                className="shrink-0"
                disabled={loading}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[var(--navy-primary)] text-white shadow-lg flex items-center justify-center hover:bg-[var(--navy-light)] hover:shadow-[0_4px_12px_rgba(106,90,205,0.3)]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </>
  );
}
