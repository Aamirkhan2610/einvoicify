import { plainBenefits } from "@/lib/site";
import { Container, Section, SectionHeading } from "@/components/ui/Container";
import { Shield, Clock, Layers, Phone } from "lucide-react";

const icons = [Shield, Clock, Layers, Phone];

export function PlainBenefits() {
  return (
    <Section className="bg-brand-navy text-white">
      <Container>
        <SectionHeading
          eyebrow="Why businesses choose us"
          title="Benefits you can feel every month"
          description="Plain outcomes for finance and owners — less stress, clearer process, local help when you need it."
          className="text-white [&_h2]:text-white [&_p]:text-slate-300 [&_p.mb-3]:text-sky-300"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plainBenefits.map((b, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={b.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <Icon className="h-6 w-6 text-sky-300" />
                <h3 className="mt-3 text-base font-semibold text-white">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
