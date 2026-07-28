import { redirect } from "next/navigation";
import Link from "next/link";
import {
  MessageSquare,
  Users,
  Inbox,
  CalendarClock,
} from "lucide-react";
import { getCrmSession } from "@/lib/auth";
import { prisma, ensureDatabase } from "@/lib/prisma";
import { CrmShell } from "@/components/crm/CrmShell";

export default async function CrmDashboardPage() {
  const session = await getCrmSession();
  if (!session) redirect("/crm/login");

  let enquiriesNew = 0;
  let enquiriesTotal = 0;
  let demosNew = 0;
  let demosTotal = 0;
  let chatsOpen = 0;
  let chatsTotal = 0;
  let messagesToday = 0;
  let recentEnquiries: Awaited<
    ReturnType<typeof prisma.contactEnquiry.findMany>
  > = [];
  let recentChats: Awaited<
    ReturnType<typeof prisma.conversation.findMany>
  > = [];

  try {
    await ensureDatabase();
    [
      enquiriesNew,
      enquiriesTotal,
      demosNew,
      demosTotal,
      chatsOpen,
      chatsTotal,
      messagesToday,
      recentEnquiries,
      recentChats,
    ] = await Promise.all([
      prisma.contactEnquiry.count({ where: { status: "NEW" } }),
      prisma.contactEnquiry.count(),
      prisma.demoRequest.count({ where: { status: "NEW" } }),
      prisma.demoRequest.count(),
      prisma.conversation.count({
        where: { status: { in: ["OPEN", "PENDING"] } },
      }),
      prisma.conversation.count(),
      prisma.message.count({
        where: {
          createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
        },
      }),
      prisma.contactEnquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
      }),
      prisma.conversation.findMany({
        orderBy: { lastMessageAt: "desc" },
        take: 6,
        include: {
          messages: { orderBy: { createdAt: "desc" }, take: 1 },
        },
      }),
    ]);
  } catch (e) {
    console.error("[crm/dashboard]", e);
  }

  const cards = [
    {
      label: "New enquiries",
      value: enquiriesNew,
      sub: `${enquiriesTotal} total`,
      icon: Inbox,
      tone: "from-rose-500 to-brand-red",
    },
    {
      label: "Demo requests",
      value: demosNew,
      sub: `${demosTotal} total`,
      icon: Users,
      tone: "from-blue-500 to-brand-blue",
    },
    {
      label: "Open chats",
      value: chatsOpen,
      sub: `${chatsTotal} conversations`,
      icon: MessageSquare,
      tone: "from-violet-500 to-indigo-600",
    },
    {
      label: "Messages today",
      value: messagesToday,
      sub: "Customer + agent",
      icon: CalendarClock,
      tone: "from-emerald-500 to-teal-600",
    },
  ];

  return (
    <CrmShell adminName={session.admin.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            Welcome back, {session.admin.name}. Website leads and chats.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((c) => (
            <div
              key={c.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {c.label}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-brand-navy">
                    {c.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{c.sub}</p>
                </div>
                <div
                  className={`rounded-xl bg-gradient-to-br ${c.tone} p-2.5 text-white shadow-sm`}
                >
                  <c.icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h2 className="font-semibold text-brand-navy">Recent leads</h2>
              <Link
                href="/crm/leads"
                className="text-xs font-semibold text-brand-blue hover:underline"
              >
                View all
              </Link>
            </div>
            <ul className="divide-y divide-slate-100">
              {recentEnquiries.length === 0 ? (
                <li className="px-5 py-8 text-center text-sm text-slate-500">
                  No enquiries yet. They appear from the contact form or chat.
                </li>
              ) : (
                recentEnquiries.map((e) => (
                  <li key={e.id} className="px-5 py-3.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-brand-navy">
                          {e.name}
                          {e.company ? (
                            <span className="font-normal text-slate-500">
                              {" "}
                              · {e.company}
                            </span>
                          ) : null}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {e.email} · {e.type}
                        </p>
                        <p className="mt-1 line-clamp-1 text-xs text-slate-600">
                          {e.message}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                        {e.status}
                      </span>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h2 className="font-semibold text-brand-navy">Recent chats</h2>
              <Link
                href="/crm/chats"
                className="text-xs font-semibold text-brand-blue hover:underline"
              >
                View all
              </Link>
            </div>
            <ul className="divide-y divide-slate-100">
              {recentChats.length === 0 ? (
                <li className="px-5 py-8 text-center text-sm text-slate-500">
                  No chats yet. Visitors use the chat widget on the website.
                </li>
              ) : (
                recentChats.map((c) => {
                  const lastMsg =
                    "messages" in c && Array.isArray(c.messages)
                      ? (c.messages as { body?: string }[])[0]?.body
                      : undefined;
                  return (
                    <li key={c.id}>
                      <Link
                        href={`/crm/chats?id=${c.id}`}
                        className="block px-5 py-3.5 transition hover:bg-slate-50"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-brand-navy">
                              {c.visitorName || "Visitor"}
                              {c.company ? (
                                <span className="font-normal text-slate-500">
                                  {" "}
                                  · {c.company}
                                </span>
                              ) : null}
                            </p>
                            <p className="truncate text-xs text-slate-500">
                              {c.topic || "General"} · {c.visitorEmail}
                            </p>
                            <p className="mt-1 line-clamp-1 text-xs text-slate-600">
                              {lastMsg}
                            </p>
                          </div>
                          <span className="shrink-0 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-brand-blue">
                            {c.status}
                          </span>
                        </div>
                      </Link>
                    </li>
                  );
                })
              )}
            </ul>
          </section>
        </div>
      </div>
    </CrmShell>
  );
}
