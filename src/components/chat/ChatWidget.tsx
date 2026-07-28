"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  Minimize2,
  Headphones,
} from "lucide-react";
import { chatTopics } from "@/lib/site";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  sender: "CUSTOMER" | "AGENT" | "SYSTEM";
  body: string;
  agentName?: string | null;
  createdAt: string;
};

const STORAGE_KEY = "einvoicify_chat_session";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"intro" | "chat">("intro");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [reply, setReply] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    topic: "Pricing inquiry",
    message: "",
  });

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setSessionId(saved);
  }, []);

  useEffect(() => {
    if (!open || !sessionId) return;

    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch(`/api/chat?sessionId=${sessionId}`);
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) {
          setMessages(data.messages ?? []);
          setStep("chat");
        }
      } catch {
        /* ignore poll errors */
      }
    };

    load();
    const t = setInterval(load, 5000);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, [open, sessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, open, scrollToBottom]);

  async function startChat(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sessionId: sessionId ?? undefined }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Unable to start chat");
        return;
      }
      setSessionId(data.sessionId);
      localStorage.setItem(STORAGE_KEY, data.sessionId);
      setMessages(data.messages ?? []);
      setStep("chat");
      setForm((f) => ({ ...f, message: "" }));
    } catch {
      setError("Network error. Please try again or email info@einvoicify.my");
    } finally {
      setLoading(false);
    }
  }

  async function sendReply(e: React.FormEvent) {
    e.preventDefault();
    if (!sessionId || !reply.trim()) return;
    setSending(true);
    setError(null);
    const body = reply.trim();
    setReply("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, body }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to send");
        setReply(body);
        return;
      }
      // optimistic refresh
      const poll = await fetch(`/api/chat?sessionId=${sessionId}`);
      if (poll.ok) {
        const d = await poll.json();
        setMessages(d.messages ?? []);
      } else if (data.message) {
        setMessages((m) => [...m, data.message]);
      }
    } catch {
      setError("Failed to send message");
      setReply(body);
    } finally {
      setSending(false);
    }
  }

  function newChat() {
    localStorage.removeItem(STORAGE_KEY);
    setSessionId(null);
    setMessages([]);
    setStep("intro");
    setError(null);
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open ? (
        <div className="flex h-[min(560px,calc(100vh-6rem))] w-[min(100vw-2rem,380px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15">
          <div className="gradient-brand flex items-center justify-between px-4 py-3 text-white">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                <Headphones className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">Chat with Einvoicify</p>
                <p className="text-[11px] text-white/80">
                  Product · pricing · e-invoice help
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {step === "chat" ? (
                <button
                  type="button"
                  onClick={newChat}
                  className="rounded-lg px-2 py-1 text-[11px] font-medium text-white/90 hover:bg-white/15"
                >
                  New
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 hover:bg-white/15"
                aria-label="Minimize chat"
              >
                <Minimize2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {step === "intro" ? (
            <form
              onSubmit={startChat}
              className="chat-scroll flex flex-1 flex-col gap-3 overflow-y-auto p-4"
            >
              <p className="text-sm text-slate-600">
                Ask about the product, pricing, ERP integration, or LHDN
                compliance. Our team will respond in this chat and in CRM.
              </p>
              <input
                required
                placeholder="Your name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-blue"
              />
              <input
                required
                type="email"
                placeholder="Work email *"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-blue"
              />
              <input
                placeholder="Phone (optional)"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-blue"
              />
              <input
                placeholder="Company (optional)"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-blue"
              />
              <select
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-blue"
              >
                {chatTopics.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <textarea
                required
                rows={3}
                placeholder="How can we help? *"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-blue"
              />
              {error ? (
                <p className="text-xs text-red-600">{error}</p>
              ) : null}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-red px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-red-dark disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Start conversation
              </button>
            </form>
          ) : (
            <>
              <div className="chat-scroll flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={cn(
                      "flex",
                      m.sender === "CUSTOMER" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                        m.sender === "CUSTOMER" &&
                          "rounded-br-md bg-brand-blue text-white",
                        m.sender === "AGENT" &&
                          "rounded-bl-md border border-slate-200 bg-white text-slate-800 shadow-sm",
                        m.sender === "SYSTEM" &&
                          "rounded-bl-md bg-slate-200/80 text-slate-600"
                      )}
                    >
                      {m.sender === "AGENT" && m.agentName ? (
                        <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-blue">
                          {m.agentName}
                        </p>
                      ) : null}
                      {m.body}
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
              <form
                onSubmit={sendReply}
                className="flex items-end gap-2 border-t border-slate-200 p-3"
              >
                <textarea
                  rows={1}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type a message…"
                  className="max-h-24 min-h-[40px] flex-1 resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-blue"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void sendReply(e as unknown as React.FormEvent);
                    }
                  }}
                />
                <button
                  type="submit"
                  disabled={sending || !reply.trim()}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-red text-white hover:bg-brand-red-dark disabled:opacity-50"
                  aria-label="Send"
                >
                  {sending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </form>
              {error ? (
                <p className="px-3 pb-2 text-xs text-red-600">{error}</p>
              ) : null}
            </>
          )}
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-14 items-center gap-2 rounded-full gradient-brand px-5 text-sm font-semibold text-white shadow-lg shadow-brand-blue/30 transition hover:scale-[1.02] hover:shadow-xl"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <>
            <MessageCircle className="h-5 w-5" />
            <span className="hidden sm:inline">Chat · pricing & product</span>
          </>
        )}
      </button>
    </div>
  );
}
