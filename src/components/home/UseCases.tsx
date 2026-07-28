import { useCases } from "@/lib/site";
import { Container, Section, SectionHeading } from "@/components/ui/Container";

export function UseCases() {
  return (
    <Section id="use-cases" className="bg-slate-50/80">
      <Container>
        <SectionHeading
          eyebrow="Real situations"
          title="How teams like yours use Einvoicify"
          description="Everyday business stories — not technical manuals. If one of these sounds familiar, we can help."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {useCases.map((uc) => (
            <article
              key={uc.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-brand-navy">{uc.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                <span className="font-semibold text-slate-800">Situation: </span>
                {uc.story}
              </p>
              <p className="mt-3 rounded-xl bg-emerald-50 px-3 py-2.5 text-sm leading-relaxed text-emerald-900">
                <span className="font-semibold">How Einvoicify helps: </span>
                {uc.outcome}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
