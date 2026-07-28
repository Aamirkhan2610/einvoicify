"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  sender: "CUSTOMER" | "AGENT" | "SYSTEM";
  body: string;
  agentName?: string | null;
  createdAt: string;
};

type Conversation = {
  id: string;
  visitorName: string | null;
  visitorEmail: string | null;
  visitorPhone: string | null;
  company: string | null;
  topic: string | null;
  status: string;
  lastMessageAt: string;
  messages?: Message[];
  _count?: { messages: number };
};

const statuses = ["OPEN", "PENDING", "RESOLVED", "CLOSED"];

export function ChatsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("id");

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [active, setActive] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const loadList = useCallback(async () => {
    const res = await fetch("/api/crm/conversations");
    if (res.status === 401) {
      router.push("/crm/login");
      return;
    }
    const data = await res.json();
    setConversations(data.conversations ?? []);
  }, [router]);

  const loadOne = useCallback(
    async (id: string) => {
      const res = await fetch(`/api/crm/conversations?id=${id}`);
      if (res.status === 401) {
        router.push("/crm/login");
        return;
      }
      if (!res.ok) return;
      const data = await res.json();
      setActive(data.conversation);
    },
    [router]
  );

  useEffect(() => {
    void (async () => {
      setLoading(true);
      await loadList();
      setLoading(false);
    })();
  }, [loadList]);

  useEffect(() => {
    if (selectedId) {
      void loadOne(selectedId);
    } else {
      setActive(null);
    }
  }, [selectedId, loadOne]);

  useEffect(() => {
    if (!selectedId) return;
    const t = setInterval(() => void loadOne(selectedId), 4000);
    return () => clearInterval(t);
  }, [selectedId, loadOne]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [active?.messages]);

  function selectChat(id: string) {
    router.push(`/crm/chats?id=${id}`);
  }

  async function sendReply(e: React.FormEvent) {
    e.preventDefault();
    if (!active || !reply.trim()) return;
    setSending(true);
    try {
      const res = await fetch("/api/crm/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: active.id,
          body: reply.trim(),
        }),
      });
      if (res.ok) {
        setReply("");
        await loadOne(active.id);
        await loadList();
      }
    } finally {
      setSending(false);
    }
  }

  async function setStatus(status: string) {
    if (!active) return;
    await fetch("/api/crm/conversations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: active.id, status }),
    });
    await loadOne(active.id);
    await loadList();
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-brand-navy">Chats</h1>
        <p className="mt-1 text-sm text-slate-500">
          Live website conversations — product questions, pricing, and support.
        </p>
      </div>

      <div className="grid h-[calc(100vh-12rem)] min-h-[480px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-5">
        <div className="chat-scroll overflow-y-auto border-r border-slate-100 lg:col-span-2">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
            </div>
          ) : conversations.length === 0 ? (
            <p className="px-4 py-12 text-center text-sm text-slate-500">
              No conversations yet. They appear when visitors use the chat
              widget.
            </p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {conversations.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => selectChat(c.id)}
                    className={cn(
                      "w-full px-4 py-3.5 text-left transition hover:bg-slate-50",
                      selectedId === c.id && "bg-blue-50/60"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate text-sm font-semibold text-brand-navy">
                        {c.visitorName || "Visitor"}
                      </p>
                      <span className="shrink-0 text-[10px] font-semibold text-slate-400">
                        {c.status}
                      </span>
                    </div>
                    <p className="truncate text-xs text-slate-500">
                      {c.topic || "General"} · {c.visitorEmail}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-400">
                      {new Date(c.lastMessageAt).toLocaleString("en-MY")}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col lg:col-span-3">
          {!active ? (
            <div className="flex flex-1 items-center justify-center p-8 text-center text-sm text-slate-500">
              Select a conversation to reply.
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
                <div>
                  <p className="font-semibold text-brand-navy">
                    {active.visitorName}
                    {active.company ? ` · ${active.company}` : ""}
                  </p>
                  <p className="text-xs text-slate-500">
                    {active.visitorEmail}
                    {active.visitorPhone ? ` · ${active.visitorPhone}` : ""} ·{" "}
                    {active.topic}
                  </p>
                </div>
                <select
                  value={active.status}
                  onChange={(e) => void setStatus(e.target.value)}
                  className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs font-medium"
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="chat-scroll flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
                {(active.messages ?? []).map((m) => (
                  <div
                    key={m.id}
                    className={cn(
                      "flex",
                      m.sender === "AGENT" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm",
                        m.sender === "AGENT" &&
                          "rounded-br-md bg-brand-blue text-white",
                        m.sender === "CUSTOMER" &&
                          "rounded-bl-md border border-slate-200 bg-white text-slate-800",
                        m.sender === "SYSTEM" &&
                          "rounded-bl-md bg-slate-200 text-slate-600"
                      )}
                    >
                      {m.sender === "AGENT" && m.agentName ? (
                        <p className="mb-0.5 text-[10px] font-semibold opacity-80">
                          {m.agentName}
                        </p>
                      ) : null}
                      {m.body}
                      <p
                        className={cn(
                          "mt-1 text-[10px]",
                          m.sender === "AGENT"
                            ? "text-white/70"
                            : "text-slate-400"
                        )}
                      >
                        {new Date(m.createdAt).toLocaleString("en-MY")}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              <form
                onSubmit={sendReply}
                className="flex items-end gap-2 border-t border-slate-100 p-3"
              >
                <textarea
                  rows={2}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Reply as agent…"
                  className="flex-1 resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-blue"
                />
                <button
                  type="submit"
                  disabled={sending || !reply.trim()}
                  className="inline-flex h-10 items-center gap-2 rounded-xl bg-brand-red px-4 text-sm font-semibold text-white hover:bg-brand-red-dark disabled:opacity-50"
                >
                  {sending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Send
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
