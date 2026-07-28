"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

const nav = [
  { href: "/crm", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/crm/leads", label: "Leads", icon: Users },
  { href: "/crm/chats", label: "Chats", icon: MessageSquare },
];

export function CrmShell({
  children,
  adminName,
}: {
  children: React.ReactNode;
  adminName: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/crm/logout", { method: "POST" });
    router.push("/crm/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-brand-navy text-slate-300 md:flex">
        <div className="flex items-center gap-2.5 border-b border-white/10 px-5 py-5">
          <Image
            src="/logo.png"
            alt="Einvoicify"
            width={36}
            height={36}
            className="h-9 w-9 rounded-lg bg-white object-contain p-0.5"
          />
          <div>
            <p className="text-sm font-bold text-white">Einvoicify CRM</p>
            <p className="text-[10px] uppercase tracking-wide text-slate-400">
              Sales & support
            </p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                  active
                    ? "bg-white/10 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-4">
          <p className="truncate text-xs text-slate-400">{adminName}</p>
          <div className="mt-3 flex flex-col gap-1">
            <a
              href={siteConfig.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-slate-400 hover:bg-white/5 hover:text-white"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Product app
            </a>
            <button
              type="button"
              onClick={() => void logout()}
              className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs text-slate-400 hover:bg-white/5 hover:text-white"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:px-6">
          <div className="flex items-center gap-3 md:hidden">
            <Image
              src="/logo.png"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7"
            />
            <span className="text-sm font-bold text-brand-navy">CRM</span>
          </div>
          <nav className="flex gap-1 md:hidden">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-2.5 py-1.5 text-xs font-medium",
                  pathname === item.href ||
                    (!item.exact && pathname.startsWith(item.href))
                    ? "bg-slate-100 text-brand-navy"
                    : "text-slate-500"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden text-sm text-slate-500 md:block">
            Website leads, price inquiries & live chat
          </div>
          <button
            type="button"
            onClick={() => void logout()}
            className="text-xs font-medium text-slate-500 hover:text-brand-navy md:hidden"
          >
            Sign out
          </button>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
