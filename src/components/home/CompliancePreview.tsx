import { lhdnPhases } from "@/lib/site";
import { Container, Section, SectionHeading } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { BadgeCheck, FileJson2, Server } from "lucide-react";

export function CompliancePreview() {
  return (
    <Section id="compliance" className="bg-brand-navy text-white">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Regulatory readiness"
              title="Built for LHDN MyInvois"
              description="Einvoicify is engineered around IRBM’s e-Invoice framework — document models, validation flows, and operational controls that finance and IT teams expect."
              className="text-white [&_h2]:text-white [&_p]:text-slate-300 [&_p.mb-3]:text-sky-300"
            />

            <ul className="mt-8 space-y-4">
              {[
                {
                  icon: FileJson2,
                  title: "Structured e-invoice data",
                  text: "Mandatory fields, classification codes, buyer/seller TIN, SST, and line-level detail aligned to MyInvois requirements.",
                },
                {
                  icon: Server,
                  title: "API & portal pathways",
                  text: "Designed for MyInvois API integration for high volume, with operational visibility comparable to portal workflows.",
                },
                {
                  icon: BadgeCheck,
                  title: "Validation-first operations",
                  text: "Capture IRBM validation responses, UUIDs, and rejection reasons so remediations are fast and auditable.",
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-3">
                  <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-sky-300">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-300">
                      {item.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <ButtonLink href="/compliance" variant="white">
                Read compliance overview
              </ButtonLink>
            </div>
          </div>

          {/* Div-based phase list (avoids browser extensions that inject attributes into <table>) */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-sky-300">
              Implementation phases (indicative)
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Mandatory dates are based on annual turnover / revenue thresholds
              set by LHDN. Confirm your phase with current IRBM guidance.
            </p>
            <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
              <div className="grid grid-cols-3 gap-2 bg-white/10 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-slate-300">
                <span>Phase</span>
                <span>Turnover</span>
                <span>Date</span>
              </div>
              <ul className="divide-y divide-white/10">
                {lhdnPhases.map((row) => (
                  <li
                    key={row.phase}
                    className="grid grid-cols-3 gap-2 px-4 py-3 text-sm"
                  >
                    <span className="font-medium text-white">{row.phase}</span>
                    <span className="text-slate-300">{row.turnover}</span>
                    <span className="text-slate-300">{row.date}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              Phase 4 businesses may be subject to published relaxation /
              transition arrangements. Always verify timelines, consolidated
              e-invoice rules, and RM10,000 individual-invoice thresholds on
              official LHDN sources.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
