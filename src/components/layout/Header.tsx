"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Phone, ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-200",
        scrolled
          ? "border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md"
          : "border-slate-200/60 bg-white/90 backdrop-blur-md"
      )}
    >
      <Container className="flex h-14 items-center gap-3 lg:h-16 lg:gap-4">
        {/* Brand */}
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-2"
          aria-label="Einvoicify home"
        >
          <Image
            src="/logo.png"
            alt=""
            width={36}
            height={36}
            className="h-8 w-8 object-contain lg:h-9 lg:w-9"
            priority
          />
          <span className="whitespace-nowrap text-[15px] font-bold tracking-tight text-brand-navy lg:text-base">
            <span className="text-brand-red">E</span>INVOICIFY
          </span>
        </Link>

        {/* Desktop nav — single line, no wrap */}
        <nav className="ml-2 hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex">
          {siteConfig.nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap rounded-md px-2 py-1.5 text-[13px] font-medium transition-colors xl:px-2.5 xl:text-sm",
                  active
                    ? "bg-slate-100 text-brand-navy"
                    : "text-slate-600 hover:bg-slate-50 hover:text-brand-navy"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop actions — compact, no wrap */}
        <div className="ml-auto hidden shrink-0 items-center gap-1.5 lg:flex xl:gap-2">
          <a
            href={siteConfig.contact.phoneHref}
            title={siteConfig.contact.phone}
            className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-lg px-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-brand-blue"
          >
            <Phone className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden 2xl:inline">{siteConfig.contact.phone}</span>
          </a>
          <ButtonLink
            href={siteConfig.productUrl}
            size="sm"
            variant="outline"
            className="h-9 whitespace-nowrap px-3 text-xs xl:text-sm"
          >
            Demo
            <ExternalLink className="h-3 w-3" />
          </ButtonLink>
          <ButtonLink
            href="/contact"
            size="sm"
            variant="primary"
            className="h-9 whitespace-nowrap px-3 text-xs xl:text-sm"
          >
            Request demo
          </ButtonLink>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-brand-navy lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {/* Mobile drawer */}
      {open ? (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <Container className="flex max-h-[calc(100vh-3.5rem)] flex-col gap-0.5 overflow-y-auto py-3">
            {siteConfig.nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm font-medium",
                    active
                      ? "bg-slate-100 text-brand-navy"
                      : "text-slate-700 hover:bg-slate-50"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-2 flex flex-col gap-2 border-t border-slate-100 pt-3">
              <a
                href={siteConfig.contact.phoneHref}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.contact.phone}
              </a>
              <ButtonLink
                href={siteConfig.productUrl}
                variant="outline"
                className="w-full"
              >
                Live product demo
              </ButtonLink>
              <ButtonLink href="/contact" className="w-full">
                Request a demo
              </ButtonLink>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
