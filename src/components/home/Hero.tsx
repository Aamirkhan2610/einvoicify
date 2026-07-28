import { ArrowRight, ExternalLink, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const highlights = [
  "By Integrated Operation Solutions (IOS) — QAD partner & e-invoice specialist",
  "Three simple ways — portal, secure file upload, or API",
  "Trusted by ERP customers already live on LHDN e-invoice",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-white">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />

      <Container className="relative grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-12 lg:py-16">
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Malaysia LHDN e-invoice
            </span>
            <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-brand-blue">
              {siteConfig.companyBrand} · Oasis Damansara
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl lg:text-[3.15rem] lg:leading-[1.1]">
            Send e-invoices the{" "}
            <span className="text-gradient">easy way</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            <strong className="font-semibold text-brand-navy">Einvoicify</strong>{" "}
            is the e-invoice product from{" "}
            <strong className="font-semibold text-brand-navy">
              {siteConfig.legalName}
            </strong>{" "}
            ({siteConfig.registrationNo}) — the same local team behind{" "}
            <a
              href={siteConfig.legacySite}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-blue hover:underline"
            >
              iosmalaysia.com
            </a>
            . We help Malaysian businesses stay compliant without complicated
            steps.
          </p>

          <ul className="mt-6 space-y-2.5">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm font-medium text-slate-700 sm:text-base"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={siteConfig.productUrl} size="lg" variant="primary">
              Open free demo
              <ExternalLink className="h-3.5 w-3.5 opacity-80" />
            </ButtonLink>
            <ButtonLink href="/#solutions" size="lg" variant="outline">
              See our 3 solutions
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            Call{" "}
            <a
              href={siteConfig.contact.phoneHref}
              className="font-semibold text-brand-blue hover:underline"
            >
              {siteConfig.contact.phone}
            </a>{" "}
            · {siteConfig.contact.address.line1}, Oasis Damansara
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-red/10 via-transparent to-brand-blue/15 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
            <div className="border-b border-slate-100 bg-slate-50 px-5 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                A normal day with Einvoicify
              </p>
            </div>
            <div className="space-y-4 p-5 sm:p-6">
              {[
                {
                  who: "Finance · portal",
                  what: "Creates and tracks invoices online before lunch",
                  status: "Done",
                  color: "bg-emerald-100 text-emerald-700",
                },
                {
                  who: "Ops · SFTP upload",
                  what: "Drops last night’s ERP export for bulk processing",
                  status: "Processing",
                  color: "bg-blue-100 text-blue-700",
                },
                {
                  who: "IT · API / ePINTAR",
                  what: "Wholesale orders become e-invoices automatically",
                  status: "Auto",
                  color: "bg-violet-100 text-violet-700",
                },
              ].map((row) => (
                <div
                  key={row.who}
                  className="flex items-start justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-brand-navy">
                      {row.who}
                    </p>
                    <p className="mt-0.5 text-sm text-slate-600">{row.what}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${row.color}`}
                  >
                    {row.status}
                  </span>
                </div>
              ))}
              <p className="text-center text-xs text-slate-500">
                Same goal: compliant invoices, less manual work — from the IOS
                team you already know.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
