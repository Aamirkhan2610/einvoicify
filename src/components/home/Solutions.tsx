import { Monitor, Upload, Link2, ArrowRight, ExternalLink } from "lucide-react";
import { solutions, siteConfig } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Container";

const iconMap = {
  monitor: Monitor,
  upload: Upload,
  link: Link2,
} as const;

export function Solutions() {
  return (
    <Section id="solutions" className="bg-white">
      <Container>
        <SectionHeading
          eyebrow="Three ways to work with us"
          title="Pick the solution that fits your team"
          description="You do not need to understand technical jargon. Start where you are today — many customers begin with the portal and add upload or API later."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {solutions.map((s) => {
            const Icon = iconMap[s.icon];
            const isExternal = s.cta.href.startsWith("http");
            return (
              <article
                key={s.id}
                className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50/40 p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-blue/30 hover:shadow-md sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-red">
                    Solution {s.number}
                  </span>
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-blue shadow-sm ring-1 ring-slate-200">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <h3 className="mt-5 text-xl font-bold text-brand-navy">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-brand-blue">
                  {s.headline}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                  {s.description}
                </p>

                <p className="mt-4 rounded-lg bg-white px-3 py-2 text-xs font-medium text-slate-500 ring-1 ring-slate-100">
                  <span className="text-slate-700">Best for:</span> {s.bestFor}
                </p>

                <ul className="mt-4 space-y-2">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="flex gap-2 text-sm text-slate-600"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  {isExternal ? (
                    <ButtonLink
                      href={s.cta.href}
                      variant={s.id === "portal" ? "primary" : "outline"}
                      className="w-full"
                    >
                      {s.cta.label}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </ButtonLink>
                  ) : (
                    <ButtonLink
                      href={s.cta.href}
                      variant="outline"
                      className="w-full"
                    >
                      {s.cta.label}
                      <ArrowRight className="h-4 w-4" />
                    </ButtonLink>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50/40 p-6 text-center sm:p-8">
          <p className="text-base font-semibold text-brand-navy sm:text-lg">
            Not sure which option is right?
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
            Tell us roughly how many invoices you send and what software you
            use today. We will recommend the simplest path — free consultation.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact" variant="primary">
              Get a recommendation
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href={siteConfig.productUrl} variant="outline">
              Browse the product demo
              <ExternalLink className="h-3.5 w-3.5" />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
