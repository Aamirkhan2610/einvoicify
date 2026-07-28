import type { Metadata } from "next";
import { Building2, Quote, ArrowRight } from "lucide-react";
import { caseStudies } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Case Studies — Malaysia E-Invoice Success Stories",
  description:
    "How Malaysian manufacturers, retailers, healthcare groups, and professional services firms achieved LHDN MyInvois compliance with Einvoicify.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
        <Container className="relative py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-blue">
              Case studies
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
              E-invoice outcomes across Malaysian industries
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Illustrative customer scenarios based on common MyInvois rollouts —
              automation, consolidated invoicing, fast SME go-lives, and
              multi-system healthcare integrations.
            </p>
          </div>
        </Container>
      </section>

      <Section className="bg-slate-50/60">
        <Container className="space-y-10">
          {caseStudies.map((study, index) => (
            <article
              key={study.slug}
              id={study.slug}
              className="scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="grid lg:grid-cols-5">
                <div className="border-b border-slate-100 bg-gradient-to-br from-slate-50 to-blue-50/40 p-6 lg:col-span-2 lg:border-b-0 lg:border-r lg:p-8">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-blue">
                    <Building2 className="h-3.5 w-3.5" />
                    {study.industry}
                    <span className="text-slate-400">· Case {index + 1}</span>
                  </div>
                  <h2 className="mt-3 text-2xl font-bold tracking-tight text-brand-navy">
                    {study.title}
                  </h2>
                  <p className="mt-2 text-sm font-medium text-slate-500">
                    {study.company}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    {study.summary}
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {study.results.map((r) => (
                      <div
                        key={r.label}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-3"
                      >
                        <p className="text-lg font-bold text-brand-navy">
                          {r.value}
                        </p>
                        <p className="text-xs text-slate-500">{r.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-6 p-6 lg:col-span-3 lg:p-8">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-red">
                      Challenge
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                      {study.challenge}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-blue">
                      Solution
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                      {study.solution}
                    </p>
                  </div>
                  <blockquote className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                    <Quote className="mb-2 h-4 w-4 text-brand-red/70" />
                    <p className="text-sm leading-relaxed text-slate-700 italic sm:text-base">
                      “{study.quote}”
                    </p>
                    <footer className="mt-3 text-xs font-semibold text-slate-500">
                      — {study.quoteRole}
                    </footer>
                  </blockquote>
                </div>
              </div>
            </article>
          ))}

          <div className="rounded-3xl gradient-brand px-6 py-10 text-center text-white sm:px-10">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Ready for your MyInvois success story?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/90 sm:text-base">
              Tell us about your ERP, invoice volume, and turnover band. We will
              map a practical rollout — and you can chat with us anytime about
              product or pricing.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href="/contact" variant="white" size="lg">
                Request a consultation
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href="/product"
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                Explore the product
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
