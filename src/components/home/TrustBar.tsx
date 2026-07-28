import { Container } from "@/components/ui/Container";

const items = [
  "SAP",
  "Microsoft Dynamics",
  "Oracle NetSuite",
  "Sage",
  "SQL Accounting",
  "Tally",
  "Epicor",
  "Syspro",
];

export function TrustBar() {
  return (
    <section className="border-b border-slate-200 bg-white py-7">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
          Integrated with leading ERP & accounting platforms
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {items.map((name) => (
            <span
              key={name}
              className="text-sm font-semibold tracking-tight text-slate-400 transition hover:text-brand-navy sm:text-base"
            >
              {name}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
