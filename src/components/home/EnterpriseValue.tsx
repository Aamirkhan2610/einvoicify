import {
  ShieldCheck,
  Layers,
  Plug,
  Activity,
  FileCheck2,
  Mail,
  ArrowRight,
} from "lucide-react";
import { enterprisePillars } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Container";

const icons = [ShieldCheck, Layers, Plug, Activity, FileCheck2, Mail];

const integrationModes = [
  {
    title: "API integration",
    body: "Real-time e-invoice generation and MyInvois submission from ERP, POS, or middleware — ideal for continuous high-volume operations.",
  },
  {
    title: "SFTP / secure file",
    body: "Batch file drops for enterprises that prefer scheduled bulk processing without changing core ERP screens overnight.",
  },
  {
    title: "Excel / CSV",
    body: "Standardised templates for fast onboarding, edge systems, or teams without full API capacity yet.",
  },
];

export function EnterpriseValue() {
  return (
    <Section id="enterprise" className="bg-slate-50/80">
      <Container>
        <SectionHeading
          eyebrow="Enterprise e-invoicing Malaysia"
          title="Automated within seconds — built for large & growing businesses"
          description="Inspired by what leading Malaysian e-invoice platforms promise enterprises: full LHDN compliance, batch scale, flexible integration, and real-time tracking — delivered through Einvoicify’s automation layer."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {enterprisePillars.map((pillar, i) => {
            const Icon = icons[i % icons.length];
            return (
              <article
                key={pillar.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-blue/25 hover:shadow-md"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-rose-50 to-blue-50 text-brand-blue ring-1 ring-slate-100">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-brand-navy">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {pillar.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid items-start gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-blue">
                Flexible integration
              </p>
              <h3 className="mt-2 text-2xl font-bold text-brand-navy">
                Connect ERP, POS & finance without ripping out systems
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Keep existing workflows. Einvoicify becomes the compliance and
                efficiency layer between your operational systems and LHDN
                MyInvois.
              </p>
              <ButtonLink href="/integrations" className="mt-5" variant="outline">
                View integrations
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:col-span-8">
              {integrationModes.map((mode) => (
                <div
                  key={mode.title}
                  className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5"
                >
                  <h4 className="text-sm font-semibold text-brand-navy">
                    {mode.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    {mode.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
