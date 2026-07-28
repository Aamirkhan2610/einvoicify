import {
  Link2,
  Bot,
  Mail,
  RefreshCw,
  LayoutDashboard,
  FileCheck2,
  Shield,
  Workflow,
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

const features = [
  {
    icon: Link2,
    title: "ERP & accounting connectors",
    description:
      "Proven integrations with 16+ systems including SAP, Microsoft Dynamics, Oracle NetSuite, QAD, Navision, Syspro, Sage, SQL Accounting, Tally, Medic, Wallet, Kingdee, Plato, Epicor, and more — plus custom API or file-based feeds.",
  },
  {
    icon: Bot,
    title: "End-to-end automation",
    description:
      "Automate the full lifecycle: map invoice data, transform to LHDN schema, submit for IRBM validation, capture UUIDs, handle rejections, and optional customer email delivery — hands-free or partially supervised.",
  },
  {
    icon: Mail,
    title: "Automated invoice delivery",
    description:
      "After validation, Einvoicify can email e-invoices (with required metadata and QR/UUID references) to your customers, reducing manual dispatch and follow-up effort.",
  },
  {
    icon: RefreshCw,
    title: "Continuous LHDN compliance",
    description:
      "Schema, validation rules, and submission flows are kept current with IRBM MyInvois guideline updates so your documents remain acceptable without emergency IT projects.",
  },
  {
    icon: LayoutDashboard,
    title: "Real-time operations dashboard",
    description:
      "Monitor submission status, validation outcomes, error queues, and delivery metrics from a single console — finance and IT share the same operational truth.",
  },
  {
    icon: FileCheck2,
    title: "Built-in invoicing module",
    description:
      "No ERP? Use Einvoicify’s practical invoicing module to capture sales data cleanly and still achieve seamless MyInvois submission from day one.",
  },
  {
    icon: Shield,
    title: "Document types covered",
    description:
      "Support for Invoice, Credit Note, Debit Note, Refund Note, and self-billed scenarios where applicable — aligned with IRBM document taxonomy.",
  },
  {
    icon: Workflow,
    title: "Configurable workflows",
    description:
      "Choose full automation or staged approvals. Route exceptions, retry failed submissions, and align with your internal control and SOX-style audit needs.",
  },
];

export function Features() {
  return (
    <Section id="features" className="bg-slate-50/80">
      <Container>
        <SectionHeading
          eyebrow="Platform benefits"
          title="Effortless e-invoicing with full automation"
          description="Discover how Einvoicify removes operational friction while keeping every document within LHDN MyInvois requirements."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-blue/30 hover:shadow-md"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-rose-50 to-blue-50 text-brand-blue ring-1 ring-slate-100 transition group-hover:from-rose-100 group-hover:to-blue-100">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-brand-navy">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <ButtonLink href="/features" variant="outline">
            View full feature set
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
