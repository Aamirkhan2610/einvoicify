import type { Metadata } from "next";
import {
  Link2,
  Bot,
  Mail,
  RefreshCw,
  LayoutDashboard,
  FileCheck2,
  Shield,
  Workflow,
  Database,
  BellRing,
  Lock,
  Layers,
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { CTA } from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore Einvoicify platform capabilities: ERP integration, MyInvois automation, validation, dashboards, and continuous LHDN compliance.",
};

const featureGroups = [
  {
    title: "Connectivity & data",
    items: [
      {
        icon: Link2,
        title: "Multi-ERP connectors",
        body: "Native and adapter-based links to SAP, Microsoft Dynamics, Oracle NetSuite, QAD, Navision, Syspro, Sage, SQL Accounting, Tally, Medic, Wallet, Kingdee, Plato, Epicor, and custom sources via API, SFTP, or secure file exchange.",
      },
      {
        icon: Database,
        title: "Canonical invoice model",
        body: "Source documents are normalised into a structured model before MyInvois mapping — reducing brittle one-off transformations and easing multi-system environments.",
      },
      {
        icon: Layers,
        title: "Standalone invoicing module",
        body: "Capture sales invoices without an ERP. Ideal for pilot sites, subsidiaries, or teams that need MyInvois compliance before a full ERP project completes.",
      },
    ],
  },
  {
    title: "Automation & delivery",
    items: [
      {
        icon: Bot,
        title: "Lifecycle automation",
        body: "Configure fully automated or semi-automated paths: extract → validate locally → submit to MyInvois → store UUID → notify customer → archive for audit.",
      },
      {
        icon: Mail,
        title: "Customer email dispatch",
        body: "Automatically email validated e-invoices to clients with the references they need, cutting manual PDF handling and mailbox bottlenecks.",
      },
      {
        icon: BellRing,
        title: "Exception alerts",
        body: "Surface validation failures, missing TINs, classification issues, and network retries so operations can fix root causes instead of guessing.",
      },
    ],
  },
  {
    title: "Compliance & control",
    items: [
      {
        icon: FileCheck2,
        title: "IRBM validation handling",
        body: "Persist MyInvois validation outcomes, rejection codes, and successful UUIDs. Support rework loops without losing the original commercial document context.",
      },
      {
        icon: Shield,
        title: "Document type coverage",
        body: "Invoice, Credit Note, Debit Note, Refund Note, and self-billed scenarios (where applicable) mapped to IRBM document codes and business rules.",
      },
      {
        icon: RefreshCw,
        title: "Guideline-aligned updates",
        body: "Platform updates track LHDN guideline revisions so mandatory fields, consolidated invoice rules, and thresholds stay current.",
      },
    ],
  },
  {
    title: "Visibility & security",
    items: [
      {
        icon: LayoutDashboard,
        title: "Operations dashboard",
        body: "Finance and IT share live status: submitted, valid, invalid, cancelled, emailed. Drill into document-level history for month-end and audit queries.",
      },
      {
        icon: Workflow,
        title: "Configurable approvals",
        body: "Optional human-in-the-loop steps before submission for high-value invoices or first-time buyers, then graduate to full automation.",
      },
      {
        icon: Lock,
        title: "Enterprise-grade posture",
        body: "Role-based access, encrypted transport, and operational logging designed for regulated finance environments in Malaysia.",
      },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="bg-hero-glow">
          <Container className="py-16 sm:py-20">
            <SectionHeading
              eyebrow="Platform"
              title="Everything you need for Malaysia e-invoicing"
              description="Einvoicify combines integration depth, MyInvois automation, and operational tooling so compliance becomes a background system — not a monthly fire drill."
            />
            <div className="mt-8 flex justify-center gap-3">
              <ButtonLink href="/contact">Request a Demo</ButtonLink>
              <ButtonLink href="/integrations" variant="outline">
                View integrations
              </ButtonLink>
            </div>
          </Container>
        </div>
      </section>

      {featureGroups.map((group, idx) => (
        <Section
          key={group.title}
          className={idx % 2 === 0 ? "bg-slate-50/80" : "bg-white"}
        >
          <Container>
            <h2 className="text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
              {group.title}
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {group.items.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-brand-blue">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-brand-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </Section>
      ))}

      <CTA />
    </>
  );
}
