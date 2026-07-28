import Link from "next/link";
import { ArrowRight, Building2, Quote } from "lucide-react";
import { caseStudies } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Container";

export function CaseStudies({ limit = 3 }: { limit?: number }) {
  const items = caseStudies.slice(0, limit);

  return (
    <Section id="case-studies" className="bg-white">
      <Container>
        <SectionHeading
          eyebrow="Customer outcomes"
          title="Case studies: e-invoice done right in Malaysia"
          description="Real-world patterns from manufacturing, retail, healthcare, and professional services — how teams hit LHDN MyInvois compliance without drowning finance in manual work."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {items.map((study) => (
            <article
              key={study.slug}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-slate-50/40 p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-blue/25 hover:shadow-md"
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-blue">
                <Building2 className="h-3.5 w-3.5" />
                {study.industry}
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-snug text-brand-navy">
                {study.title}
              </h3>
              <p className="mt-1 text-xs font-medium text-slate-500">
                {study.company}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                {study.summary}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2">
                {study.results.slice(0, 4).map((r) => (
                  <div
                    key={r.label}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2"
                  >
                    <p className="text-sm font-bold text-brand-navy">{r.value}</p>
                    <p className="text-[11px] text-slate-500">{r.label}</p>
                  </div>
                ))}
              </div>

              <blockquote className="mt-5 rounded-xl border border-slate-100 bg-white p-3">
                <Quote className="mb-1 h-3.5 w-3.5 text-brand-red/70" />
                <p className="text-xs leading-relaxed text-slate-600 italic">
                  “{study.quote}”
                </p>
                <footer className="mt-2 text-[11px] font-medium text-slate-500">
                  — {study.quoteRole}
                </footer>
              </blockquote>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/case-studies#${study.slug}`}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue transition group-hover:gap-1.5"
              >
                Read full story
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <ButtonLink href="/case-studies" variant="outline">
            View all case studies
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
