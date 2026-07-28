import type { Metadata } from "next";
import { integrations } from "@/lib/site";
import { Container, Section, SectionHeading } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { CTA } from "@/components/home/CTA";
import { ArrowRightLeft, FileSpreadsheet, Webhook } from "lucide-react";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Einvoicify connects to 16+ ERP and accounting systems including SAP, Dynamics, NetSuite, Sage, SQL Accounting, and more — plus API and file-based feeds.",
};

const patterns = [
  {
    icon: Webhook,
    title: "API / middleware",
    body: "Near real-time push or pull of invoice headers and lines from your ERP or integration bus into Einvoicify for MyInvois submission.",
  },
  {
    icon: FileSpreadsheet,
    title: "Secure file exchange",
    body: "Scheduled CSV/XML/JSON drops via SFTP or cloud storage for environments that prefer batch cutovers and controlled release windows.",
  },
  {
    icon: ArrowRightLeft,
    title: "Bidirectional status",
    body: "Return UUIDs, validation status, and rejection reasons to the source system or a shared operations queue for closed-loop control.",
  },
];

export default function IntegrationsPage() {
  const categories = Array.from(
    new Set(integrations.map((i) => i.category))
  );

  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="bg-hero-glow">
          <Container className="py-16 sm:py-20">
            <SectionHeading
              eyebrow="Connectivity"
              title="Works with the systems you already run"
              description="Einvoicify has automated e-invoicing alongside major ERP and accounting platforms used across Malaysian enterprises and SMEs — without forcing a rip-and-replace."
            />
            <div className="mt-8 flex justify-center">
              <ButtonLink href="/contact">
                Discuss your stack
              </ButtonLink>
            </div>
          </Container>
        </div>
      </section>

      <Section className="bg-slate-50/80">
        <Container>
          <SectionHeading
            title="Supported platforms"
            description="Representative systems we integrate with. Custom and industry-specific packages are available on request."
          />
          <div className="mt-12 space-y-10">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-blue">
                  {category}
                </h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {integrations
                    .filter((i) => i.category === category)
                    .map((item) => (
                      <div
                        key={item.name}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-4 text-center text-sm font-semibold text-brand-navy shadow-sm"
                      >
                        {item.name}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <SectionHeading
            title="Integration patterns"
            description="Choose the connectivity style that matches your IT architecture and risk appetite."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {patterns.map((p) => (
              <article
                key={p.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-blue shadow-sm ring-1 ring-slate-200">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-brand-navy">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  );
}
