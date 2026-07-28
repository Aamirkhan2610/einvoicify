import { Container } from "@/components/ui/Container";

const items = [
  "SAP",
  "Microsoft Dynamics",
  "Oracle NetSuite",
  "Sage",
  "SQL Accounting",
  "Tally",
  "AutoCount",
  "Custom systems",
];

export function TrustBar() {
  return (
    <section className="border-b border-slate-200 bg-white py-7">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
          Works with popular accounting & business systems
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {items.map((name) => (
            <span
              key={name}
              className="text-sm font-semibold tracking-tight text-slate-400 sm:text-base"
            >
              {name}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
