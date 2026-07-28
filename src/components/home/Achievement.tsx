import { achievement } from "@/lib/site";
import { Container } from "@/components/ui/Container";

export function Achievement() {
  return (
    <section className="border-b border-slate-200 bg-brand-navy text-white">
      <Container className="py-10 sm:py-12">
        <p className="text-xs font-semibold uppercase tracking-wider text-sky-300">
          {achievement.title}
        </p>
        <blockquote className="mt-3 max-w-4xl text-lg font-medium leading-relaxed text-white sm:text-xl">
          “{achievement.quote}”
        </blockquote>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {achievement.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
            >
              <p className="text-2xl font-bold text-white sm:text-3xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs text-slate-300 sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
