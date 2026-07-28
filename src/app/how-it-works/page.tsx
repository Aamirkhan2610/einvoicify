import type { Metadata } from "next";
import {
  MessageSquare,
  ClipboardList,
  PlugZap,
  FileJson2,
  ShieldCheck,
  LineChart,
  Headphones,
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { CTA } from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See how Einvoicify onboards Malaysian businesses: discovery, ERP connection, MyInvois automation, and ongoing operations.",
};

const timeline = [
  {
    icon: MessageSquare,
    title: "1. Discovery call",
    detail:
      "We review your LHDN phase (turnover band), invoice volumes, document mix (B2B/B2C), and systems of record. You receive a recommended architecture and timeline.",
  },
  {
    icon: ClipboardList,
    title: "2. Scope & readiness",
    detail:
      "Confirm MyInvois registration readiness, TIN/SST data quality, buyer master data, tax classification codes, and any self-billing or consolidated invoice scenarios.",
  },
  {
    icon: PlugZap,
    title: "3. Integration or module setup",
    detail:
      "Connect ERP/accounting via adapter or API — or configure the Einvoicify invoicing module. Map commercial fields to the MyInvois data model.",
  },
  {
    icon: FileJson2,
    title: "4. Mapping & dry runs",
    detail:
      "Sample invoices are transformed and validated against IRBM rules in a controlled environment. Gaps (missing buyer TIN, wrong codes) are fixed before go-live.",
  },
  {
    icon: ShieldCheck,
    title: "5. Production cutover",
    detail:
      "Credentials, schedules, and monitoring go live. Submission, UUID capture, retries, and optional customer email run under agreed automation levels.",
  },
  {
    icon: LineChart,
    title: "6. Operate & optimise",
    detail:
      "Teams use dashboards for daily control. We tune exception handling, consolidated vs individual rules, and volume scaling as your phase obligations evolve.",
  },
  {
    icon: Headphones,
    title: "7. Continuous support",
    detail:
      "Guideline changes and platform updates are applied centrally. Your finance and IT contacts have a clear escalation path for submission incidents.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="bg-hero-glow">
          <Container className="py-16 sm:py-20">
            <SectionHeading
              eyebrow="Implementation"
              title="From first conversation to automated MyInvois"
              description="A structured rollout that respects both IRBM technical requirements and your internal change-management reality."
            />
            <div className="mt-8 flex justify-center">
              <ButtonLink href="/contact">Talk to a specialist</ButtonLink>
            </div>
          </Container>
        </div>
      </section>

      <Section className="bg-slate-50/80">
        <Container className="max-w-3xl">
          <ol className="relative space-y-0 border-l border-slate-200 pl-8">
            {timeline.map((item, i) => (
              <li key={item.title} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[2.55rem] flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-blue shadow-sm">
                  <item.icon className="h-4 w-4" />
                </span>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-red">
                  Stage {i + 1}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-brand-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {item.detail}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Minimal disruption",
                text: "Keep posting invoices in your ERP. Einvoicify handles the e-invoice channel so users are not forced into a parallel process.",
              },
              {
                title: "Audit-ready history",
                text: "Retain submission payloads, responses, and timestamps for internal audit, external advisors, and LHDN enquiries.",
              },
              {
                title: "Scale with volume",
                text: "Whether hundreds or tens of thousands of documents per month, automation and monitoring are designed for production loads.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6"
              >
                <h3 className="text-lg font-semibold text-brand-navy">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  );
}
