import type { Metadata } from "next";
import { lhdnPhases, ublTechSpecs, ublCoreElements, myInvoisDocTypes } from "@/lib/site";
import { Container, Section, SectionHeading } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { CTA } from "@/components/home/CTA";
import {
  FileText,
  GitBranch,
  Layers3,
  Scale,
  ServerCog,
  ShieldAlert,
  FileCode2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "LHDN Compliance",
  description:
    "Technical overview of Malaysia LHDN MyInvois e-Invoice: phases, document types, data requirements, and how Einvoicify supports continuous compliance.",
};

const documentTypes = [
  {
    code: "Invoice",
    use: "Standard supply of goods or services; primary commercial e-invoice document.",
  },
  {
    code: "Credit Note",
    use: "Adjustments reducing previously invoiced amounts (returns, allowances, corrections).",
  },
  {
    code: "Debit Note",
    use: "Adjustments increasing previously invoiced amounts where commercially required.",
  },
  {
    code: "Refund Note",
    use: "Refunds associated with prior transactions under IRBM guidance.",
  },
  {
    code: "Self-billed",
    use: "Buyer-issued scenarios defined by LHDN (e.g. certain acquisitions) when applicable.",
  },
  {
    code: "Consolidated",
    use: "Periodic aggregation for eligible B2C / no-buyer-request cases, subject to thresholds and phase rules.",
  },
];

const dataDomains = [
  "Supplier identity (TIN, registration, SST where applicable)",
  "Buyer identity (TIN / general TIN rules, address, contact as required)",
  "Document metadata (type, number, date, currency)",
  "Line items, quantities, unit prices, discounts",
  "Tax classification codes and tax amounts",
  "Totals, payment terms, and supporting references",
];

export default function CompliancePage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="bg-hero-glow">
          <Container className="py-16 sm:py-20">
            <SectionHeading
              eyebrow="Regulatory & technical"
              title="LHDN MyInvois compliance, defined clearly"
              description="Malaysia’s e-Invoice mandate is enforced through IRBM’s MyInvois platform. Einvoicify is built to operationalise those rules inside your finance stack — with accurate data, validation, and auditability."
            />
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/contact">Get phase guidance</ButtonLink>
              <ButtonLink
                href="https://www.hasil.gov.my"
                variant="outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Official LHDN site
              </ButtonLink>
            </div>
          </Container>
        </div>
      </section>

      <Section id="ubl" className="bg-white">
        <Container>
          <SectionHeading
            eyebrow="Technical specification"
            title={`${ublTechSpecs.standard} · ${ublTechSpecs.formats.join(" & ")} · ${ublTechSpecs.model}`}
            description={`${ublTechSpecs.platform} accepts e-Invoices structured to OASIS UBL 2.1. Einvoicify maps ERP data into valid payloads, submits via ${ublTechSpecs.channels.join(" or ")}, and surfaces ${ublTechSpecs.validation.toLowerCase()}.`}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Standard",
                body: ublTechSpecs.standardFull,
              },
              {
                title: "Formats",
                body: `${ublTechSpecs.formats.join(" and ")} — follow UBL element sequence for both.`,
              },
              {
                title: "Channels",
                body: ublTechSpecs.channels.join(" · "),
              },
              {
                title: "Validation",
                body: ublTechSpecs.validation,
              },
              {
                title: "Verification",
                body: ublTechSpecs.qr,
              },
              {
                title: "Retention",
                body: ublTechSpecs.retention,
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5"
              >
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-brand-blue">
                  <FileCode2 className="h-4 w-4" />
                </div>
                <h3 className="font-semibold text-brand-navy">{card.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{card.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-6">
              <h3 className="font-semibold text-brand-navy">Document type codes</h3>
              <ul className="mt-4 space-y-2">
                {myInvoisDocTypes.map((d) => (
                  <li key={d.code} className="flex gap-3 text-sm">
                    <span className="font-mono font-bold text-brand-blue">
                      {d.code}
                    </span>
                    <span className="text-slate-600">
                      <strong className="text-brand-navy">{d.name}</strong> —{" "}
                      {d.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-brand-navy p-6 text-white">
              <h3 className="font-semibold">Illustrative UBL paths</h3>
              <ul className="mt-4 space-y-3">
                {ublCoreElements.map((el) => (
                  <li key={el.path}>
                    <p className="font-mono text-xs text-sky-300">{el.path}</p>
                    <p className="text-sm text-slate-300">{el.note}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[11px] text-slate-500">
                Ref:{" "}
                <a
                  href="https://sdk.myinvois.hasil.gov.my/"
                  className="text-sky-300 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MyInvois SDK
                </a>
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="phases" className="bg-slate-50/80">
        <Container>
          <SectionHeading
            title="Implementation phases by turnover"
            description="Mandatory start dates depend on annual turnover or revenue. Confirm your obligations against the latest IRBM e-Invoice Guideline and media releases."
          />
          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <div className="min-w-[640px]">
                <div className="grid grid-cols-4 gap-2 bg-brand-navy px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-200">
                  <span>Phase</span>
                  <span>Annual turnover / revenue</span>
                  <span>Mandatory date</span>
                  <span>Status</span>
                </div>
                <ul className="divide-y divide-slate-100">
                  {lhdnPhases.map((row) => (
                    <li
                      key={row.phase}
                      className="grid grid-cols-4 gap-2 px-5 py-4 text-sm hover:bg-slate-50"
                    >
                      <span className="font-semibold text-brand-navy">
                        {row.phase}
                      </span>
                      <span className="text-slate-600">{row.turnover}</span>
                      <span className="text-slate-600">{row.date}</span>
                      <span>
                        <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                          {row.status}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-500">
            <strong className="font-semibold text-slate-700">Note:</strong>{" "}
            Phase 4 (RM1m–RM5m) may operate under published relaxation or
            transition arrangements (including extended penalty-free windows
            and consolidated e-invoice flexibility). Rules such as{" "}
            <strong className="font-semibold text-slate-700">
              individual e-invoices for transactions at or above RM10,000
            </strong>{" "}
            can still apply. Always verify current LHDN FAQs and guidelines
            before deciding your operating model.
          </p>
        </Container>
      </Section>

      <Section id="documents" className="bg-white">
        <Container>
          <SectionHeading
            title="Document types & operating modes"
            description="MyInvois is not only “sales invoices”. Your process design must cover adjustments, self-billing, and consolidation where allowed."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {documentTypes.map((doc) => (
              <article
                key={doc.code}
                className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5"
              >
                <div className="flex items-center gap-2 text-brand-blue">
                  <FileText className="h-4 w-4" />
                  <h3 className="font-semibold text-brand-navy">{doc.code}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {doc.use}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50/80">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                align="left"
                title="Core data requirements"
                description="Each validated e-invoice carries structured commercial and tax data. Incomplete or inconsistent masters are the most common cause of rejection."
              />
              <ul className="mt-6 space-y-3">
                {dataDomains.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                  >
                    <Scale className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-brand-navy">
                Practical controls we help implement
              </h3>
              <ul className="mt-5 space-y-4 text-sm leading-relaxed text-slate-600">
                <li className="flex gap-3">
                  <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                  <span>
                    <strong className="text-brand-navy">Pre-flight checks</strong>{" "}
                    — TIN presence, classification codes, mandatory party
                    fields, and threshold logic before submission.
                  </span>
                </li>
                <li className="flex gap-3">
                  <GitBranch className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                  <span>
                    <strong className="text-brand-navy">Exception workflows</strong>{" "}
                    — quarantine invalid documents, notify owners, resubmit
                    after correction without double-counting commercial books.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Layers3 className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                  <span>
                    <strong className="text-brand-navy">
                      Consolidated vs individual routing
                    </strong>{" "}
                    — configure policies for B2C receipts, buyer requests, and
                    high-value transactions that must stay individual.
                  </span>
                </li>
                <li className="flex gap-3">
                  <ServerCog className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                  <span>
                    <strong className="text-brand-navy">API-oriented volume</strong>{" "}
                    — high-throughput submission paths for enterprises, with
                    operational visibility equivalent to portal users.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="architecture" className="bg-white">
        <Container>
          <SectionHeading
            title="Reference architecture"
            description="How Einvoicify typically sits between your systems of record and IRBM MyInvois."
          />
          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <div className="grid divide-y divide-slate-200 md:grid-cols-4 md:divide-x md:divide-y-0">
              {[
                {
                  step: "A",
                  title: "Source systems",
                  text: "ERP, accounting, POS, billing, or Einvoicify invoicing module",
                },
                {
                  step: "B",
                  title: "Einvoicify layer",
                  text: "Map, enrich, validate, orchestrate, store audit trail",
                },
                {
                  step: "C",
                  title: "MyInvois",
                  text: "IRBM submission, validation, UUID, status lifecycle",
                },
                {
                  step: "D",
                  title: "Downstream",
                  text: "Customer email, ERP status write-back, archives & reports",
                },
              ].map((box) => (
                <div key={box.step} className="p-6 text-center">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full gradient-brand text-xs font-bold text-white">
                    {box.step}
                  </span>
                  <h3 className="mt-3 font-semibold text-brand-navy">
                    {box.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{box.text}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-slate-500">
            This content is informational and does not replace official IRBM
            guidelines, the MyInvois SDK documentation, or professional tax
            advice. Requirements can change; verify against{" "}
            <a
              href="https://www.hasil.gov.my"
              className="font-medium text-brand-blue underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              hasil.gov.my
            </a>{" "}
            and the MyInvois developer resources.
          </p>
        </Container>
      </Section>

      <CTA />
    </>
  );
}
