import { efficiencyStats } from "@/lib/site";
import { Container } from "@/components/ui/Container";

export function EfficiencyStats() {
  return (
    <section className="border-b border-slate-200 bg-brand-navy text-white">
      <Container className="py-10 sm:py-12">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-300">
            Built for scale · measured for efficiency
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            From ERP to validated MyInvois e-invoice — without the manual grind
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {efficiencyStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:bg-white/[0.08]"
            >
              <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-semibold text-sky-200">
                {stat.label}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
