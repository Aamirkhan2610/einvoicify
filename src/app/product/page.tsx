import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  LayoutDashboard,
  Mail,
  Plug,
  Shield,
  Workflow,
} from "lucide-react";
import { productHighlights, siteConfig } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Product — Einvoicify e-Invoice Platform",
  description:
    "Explore the Einvoicify product at app.einvoicify.my — LHDN MyInvois e-invoicing, ERP connectors, automation, and customer delivery for Malaysian businesses.",
};

const capabilities = [
  {
    icon: LayoutDashboard,
    title: "Operations dashboard",
    body: "Monitor submission status, validation outcomes, exception queues, and delivery metrics in one place.",
  },
  {
    icon: FileCheck2,
    title: "Document lifecycle",
    body: "Invoice, credit note, debit note, refund note, and self-billed scenarios aligned with IRBM taxonomy.",
  },
  {
    icon: Plug,
    title: "ERP connectors",
    body: "SAP, Microsoft Dynamics, Oracle NetSuite, Sage, SQL Accounting, Tally, Medic, and more — plus API/CSV.",
  },
  {
    icon: Workflow,
    title: "Configurable automation",
    body: "Full hands-free pipeline or staged approvals with retries and audit-friendly exception handling.",
  },
  {
    icon: Mail,
    title: "Customer delivery",
    body: "Email validated e-invoices automatically with UUID/QR references buyers and auditors expect.",
  },
  {
    icon: Shield,
    title: "Continuous compliance",
    body: "Schema and submission flows kept current with LHDN MyInvois guideline updates.",
  },
];

export default function ProductPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
        <Container className="relative py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-blue">
              Product · app.einvoicify.my
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
              The e-invoice platform Malaysian businesses run on
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Einvoicify streamlines e-invoice with full LHDN MyInvois compliance,
              seamless ERP integration, and automation from capture through
              validation, submission, and customer delivery.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href={siteConfig.productUrl} size="lg">
                Open live demo
                <ExternalLink className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/contact" size="lg" variant="outline">
                Talk pricing & onboarding
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <Section className="bg-slate-50/80">
        <Container>
          <SectionHeading
            eyebrow="What you get"
            title="Everything you need for MyInvois operations"
            description="Whether you connect an ERP or start with our built-in invoicing module, Einvoicify keeps documents compliant and operations quiet."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <article
                key={c.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-rose-50 to-blue-50 text-brand-blue ring-1 ring-slate-100">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-brand-navy">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {c.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Live product"
                title="Try Einvoicify at app.einvoicify.my"
                description="See how invoices move from draft to validated MyInvois documents with operational visibility finance and IT can share."
              />
              <ul className="mt-6 space-y-3">
                {productHighlights.map((h) => (
                  <li key={h.title} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                    <div>
                      <p className="font-semibold text-brand-navy">{h.title}</p>
                      <p className="text-sm text-slate-600">{h.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <ButtonLink href={siteConfig.productUrl} size="lg" variant="secondary">
                  Launch product demo
                  <ExternalLink className="h-4 w-4" />
                </ButtonLink>
              </div>
            </div>
            <div className="product-frame shine-border rounded-2xl p-6 text-white sm:p-8">
              <p className="text-sm font-semibold text-sky-300">Demo link</p>
              <p className="mt-2 break-all text-2xl font-bold tracking-tight">
                app.einvoicify.my
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                Use the live product to explore e-invoice workflows. For ERP
                mapping, volume-based pricing, or a guided pilot, start a chat
                on this site or request a consultation — our CRM captures every
                inquiry for the team.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Pricing inquiry", "ERP integration", "Pilot rollout"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
