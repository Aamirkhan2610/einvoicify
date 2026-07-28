import { simpleSteps } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Container";

export function SimpleSteps() {
  return (
    <Section id="how-it-works" className="bg-white">
      <Container>
        <SectionHeading
          eyebrow="Getting started"
          title="Up and running in three clear steps"
          description="We keep onboarding practical. No long technical projects unless you need full system connection."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {simpleSteps.map((s) => (
            <article
              key={s.step}
              className="relative rounded-2xl border border-slate-200 bg-slate-50/50 p-6"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full gradient-brand text-sm font-bold text-white">
                {s.step}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-brand-navy">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {s.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <ButtonLink href="/how-it-works" variant="outline">
            Read the full process
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
