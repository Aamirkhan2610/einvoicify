import type { Metadata } from "next";
import { iosServices, qadProducts, siteConfig } from "@/lib/site";
import { Container, Section, SectionHeading } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "IOS Malaysia services: QAD ERP implementation, training, upgrades, customisation, disaster recovery, and LHDN e-invoice (Einvoicify).",
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="bg-hero-glow">
          <Container className="py-14 sm:py-16">
            <SectionHeading
              eyebrow="Services"
              title="Full project services from IOS"
              description="From the same service catalogue on iosmalaysia.com — ERP consulting and QAD delivery, plus LHDN e-invoice with Einvoicify."
            />
          </Container>
        </div>
      </section>

      <Section className="bg-slate-50/80">
        <Container>
          <h2 className="text-2xl font-bold text-brand-navy">IOS services</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Project management, process design, implementation, assessments,
            upgrades, training, BI, customisation, reporting, database tuning,
            workshops, DR, web add-ons — and e-invoice.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {iosServices.map((s) => (
              <li
                key={s}
                className="flex gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                {s}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <SectionHeading
            title="QAD product areas we support"
            description="QAD ERP is used by thousands of manufacturers worldwide. IOS helps Malaysian plants implement and extend these areas — alongside e-invoice compliance."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {qadProducts.map((p) => (
              <article
                key={p.name}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5"
              >
                <h3 className="font-semibold text-brand-navy">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {p.description}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Discuss your project</ButtonLink>
            <ButtonLink href="/product" variant="outline">
              Einvoicify e-invoice
            </ButtonLink>
            <ButtonLink href={siteConfig.legacySite} variant="outline">
              iosmalaysia.com
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
