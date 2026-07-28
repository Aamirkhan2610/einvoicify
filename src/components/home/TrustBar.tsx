import { Container } from "@/components/ui/Container";
import { industriesServed } from "@/lib/site";

const systems = [
  "QAD",
  "SAP",
  "Epicor",
  "Sage",
  "Syteline",
  "Dynamics",
  "SQL Accounting",
  "Custom / SFTP",
];

export function TrustBar() {
  return (
    <section className="border-b border-slate-200 bg-white py-7">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
          Systems we work with · industries IOS serves
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
          {systems.map((name) => (
            <span
              key={name}
              className="text-sm font-semibold tracking-tight text-slate-400"
            >
              {name}
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {industriesServed.map((ind) => (
            <span
              key={ind}
              className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600"
            >
              {ind}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
