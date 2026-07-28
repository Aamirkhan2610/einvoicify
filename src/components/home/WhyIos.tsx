import { whyIos } from "@/lib/site";
import { Container, Section, SectionHeading } from "@/components/ui/Container";
import { Shield, RefreshCw, Network, Workflow, Globe } from "lucide-react";

const icons = [Shield, RefreshCw, Network, Workflow, Globe];

export function WhyIos() {
  return (
    <Section id="why-ios" className="bg-white">
      <Container>
        <SectionHeading
          eyebrow="Why IOS & Einvoicify"
          title="What customers valued on our original IOS site — still true today"
          description="From Integrated Operation Solutions (iosmalaysia.com): compliance, updates, system fit, and uninterrupted operations — explained in plain language."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyIos.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6"
              >
                <Icon className="h-6 w-6 text-brand-blue" />
                <h3 className="mt-3 text-base font-semibold text-brand-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
