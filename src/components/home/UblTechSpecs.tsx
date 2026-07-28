import {
  FileCode2,
  Braces,
  Network,
  ShieldCheck,
  QrCode,
  Layers,
  ArrowRight,
} from "lucide-react";
import {
  ublTechSpecs,
  myInvoisDocTypes,
  ublCoreElements,
} from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Container";

export function UblTechSpecs() {
  return (
    <Section id="ubl-specs" className="bg-white">
      <Container>
        <SectionHeading
          eyebrow="LHDN technical specification"
          title="Real MyInvois standards: UBL 2.1, XML & JSON, CTC"
          description="Malaysia’s e-Invoice framework is a Continuous Transaction Control model via IRBM MyInvois. Documents must follow OASIS UBL 2.1 structure in XML or JSON — Einvoicify generates, validates, and submits that payload for you."
        />

        {/* Spec chips */}
        <div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: FileCode2,
              title: ublTechSpecs.standard,
              body: ublTechSpecs.standardFull,
            },
            {
              icon: Braces,
              title: ublTechSpecs.formats.join(" + "),
              body: "Both formats supported by MyInvois when structured to the UBL schema sequence.",
            },
            {
              icon: Network,
              title: ublTechSpecs.model,
              body: "Near real-time reporting to the tax authority — not delayed monthly batch filing alone.",
            },
            {
              icon: Layers,
              title: ublTechSpecs.platform,
              body: `${ublTechSpecs.channels.join(" · ")} for volume and self-service pathways.`,
            },
            {
              icon: ShieldCheck,
              title: "IRBM validation response",
              body: ublTechSpecs.validation,
            },
            {
              icon: QrCode,
              title: "Verifiable e-Invoice",
              body: `${ublTechSpecs.qr}. ${ublTechSpecs.retention}.`,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 shadow-sm"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-50 to-blue-50 text-brand-blue ring-1 ring-slate-100">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-brand-navy">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Document types + UBL paths */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-6 sm:p-7">
            <h3 className="text-lg font-bold text-brand-navy">
              MyInvois document types
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Common e-Invoice type codes used in UBL{" "}
              <code className="rounded bg-slate-200/80 px-1.5 py-0.5 text-xs font-semibold">
                cbc:InvoiceTypeCode
              </code>
              . Einvoicify maps your source documents to the correct IRBM type.
            </p>
            <ul className="mt-5 space-y-3">
              {myInvoisDocTypes.map((doc) => (
                <li
                  key={doc.code}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3.5"
                >
                  <span className="flex h-9 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-navy font-mono text-xs font-bold text-white">
                    {doc.code}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-brand-navy">
                      {doc.name}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                      {doc.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-brand-navy p-6 text-white sm:p-7">
            <h3 className="text-lg font-bold">
              Core UBL elements Einvoicify assembles
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Illustrative paths from the UBL 2.1 invoice structure used by
              MyInvois SDK guidance. Sequence and cardinality must match the
              schema — our mapper enforces that from your ERP feed.
            </p>
            <ul className="mt-5 space-y-2.5">
              {ublCoreElements.map((el) => (
                <li
                  key={el.path}
                  className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-3"
                >
                  <p className="font-mono text-[11px] font-semibold text-sky-300 sm:text-xs">
                    {el.path}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {el.label}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-400">
                    {el.note}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[11px] leading-relaxed text-slate-500">
              Technical references: IRBM e-Invoice Guideline ·{" "}
              <a
                href="https://sdk.myinvois.hasil.gov.my/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-300 underline-offset-2 hover:underline"
              >
                sdk.myinvois.hasil.gov.my
              </a>{" "}
              · OASIS UBL 2.1. Always verify current field lists and codes on
              official LHDN sources.
            </p>
          </div>
        </div>

        {/* Mini code visual */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-[#0b1f3a] shadow-lg">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
            <span className="text-xs font-medium text-slate-400">
              sample · UBL 2.1 JSON (illustrative structure)
            </span>
            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
              MyInvois ready
            </span>
          </div>
          <pre className="overflow-x-auto p-4 text-[11px] leading-relaxed text-slate-300 sm:text-xs">
            <code>{`{
  "_D": "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2",
  "Invoice": [{
    "ID": [{ "_": "INV-2026-08421" }],
    "IssueDate": [{ "_": "2026-07-28" }],
    "InvoiceTypeCode": [{
      "_": "01",
      "listVersionID": "1.0"
    }],
    "DocumentCurrencyCode": [{ "_": "MYR" }],
    "AccountingSupplierParty": [{ /* TIN, legal entity, address */ }],
    "AccountingCustomerParty": [{ /* buyer TIN / BRN */ }],
    "TaxTotal": [{ /* SST / tax breakdown */ }],
    "LegalMonetaryTotal": [{ /* payable amount */ }],
    "InvoiceLine": [{ /* classification, qty, price, line tax */ }]
  }]
}`}</code>
          </pre>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/compliance" variant="secondary">
            Full compliance overview
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Talk to a solutions specialist
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
