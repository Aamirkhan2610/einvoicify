"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isCrm = pathname?.startsWith("/crm") ?? false;
  // Mount client-only widgets after hydration to avoid extension/localStorage mismatches
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (isCrm) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      {mounted ? <ChatWidget /> : null}
    </>
  );
}
