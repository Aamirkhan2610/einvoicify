import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Container";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { label: "Product", href: "/product" },
      { label: "Features", href: "/features" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Integrations", href: "/integrations" },
      { label: "Live demo", href: siteConfig.productUrl, external: true },
    ],
  },
  {
    title: "Insights",
    links: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "UBL 2.1 & MyInvois specs", href: "/#ubl-specs" },
      { label: "LHDN Compliance", href: "/compliance" },
      { label: "Implementation Phases", href: "/compliance#phases" },
      { label: "Request a Demo", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "CRM Login", href: "/crm/login" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-brand-navy text-slate-300">
      <Container className="py-10 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="Einvoicify"
                width={40}
                height={40}
                className="h-10 w-10 rounded-lg bg-white object-contain p-0.5"
              />
              <span className="text-lg font-bold tracking-tight text-white">
                <span className="text-brand-red">E</span>INVOICIFY
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              LHDN MyInvois-ready e-invoicing for Malaysian businesses. Automate
              validation, submission, and delivery — integrated with your ERP.
            </p>
            <a
              href={siteConfig.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 transition hover:text-white"
            >
              app.einvoicify.my
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                <span>{siteConfig.contact.address.full}</span>
              </li>
              <li>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="inline-flex items-center gap-2.5 transition hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand-blue" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center gap-2.5 transition hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand-blue" />
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:pl-8">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      {"external" in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-slate-400 transition hover:text-white"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-slate-400 transition hover:text-white"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved. Built for Malaysia
            LHDN e-Invoice compliance.
          </p>
          <p className="max-w-md sm:text-right">
            References IRBM MyInvois guidelines. Always verify current
            requirements on{" "}
            <a
              href="https://www.hasil.gov.my"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 underline-offset-2 hover:text-white hover:underline"
            >
              hasil.gov.my
            </a>
            .
          </p>
        </div>
      </Container>
    </footer>
  );
}
