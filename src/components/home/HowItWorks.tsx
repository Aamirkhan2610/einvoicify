import { MessageSquare, PlugZap, LineChart } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

const steps = [
  {
    step: "01",
    icon: MessageSquare,
    title: "Contact our specialists",
    description:
      "Share your turnover band, ERP stack, and invoice volumes. We map you to the correct LHDN implementation phase and recommend the integration path.",
  },
  {
    step: "02",
    icon: PlugZap,
    title: "Connect or capture invoices",
    description:
      "Link Einvoicify to your ERP or accounting system — or start with our invoicing module. We configure field mapping, tax codes, classification, and MyInvois credentials.",
  },
  {
    step: "03",
    icon: LineChart,
    title: "Track and operate with confidence",
    description:
      "Use real-time dashboards for status, exceptions, and audit trails. Einvoicify automates LHDN submission and optional customer email so day-to-day effort stays near zero.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-white">
      <Container>
        <SectionHeading
          eyebrow="Simple onboarding"
          title="How Einvoicify works"
          description="From first call to live MyInvois submission in a structured, low-risk rollout."
        />

        <div className="relative mt-10">
          <div className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent lg:block" />
          <div className="grid gap-8 lg:grid-cols-3">
            {steps.map((item) => (
              <article
                key={item.step}
                className="relative rounded-2xl border border-slate-200 bg-slate-50/50 p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-red">
                    Step {item.step}
                  </span>
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-blue shadow-sm ring-1 ring-slate-200">
                    <item.icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-brand-navy">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <ButtonLink href="/how-it-works" variant="secondary">
            See the full process
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
