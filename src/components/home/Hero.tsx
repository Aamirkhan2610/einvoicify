import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  PlayCircle,
  ShieldCheck,
  Zap,
  FileCode2,
  Gauge,
} from "lucide-react";
import { siteConfig } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const highlights = [
  "UBL 2.1 XML & JSON · MyInvois API & portal",
  "Near real-time IRBM validation with UUID & QR",
  "16+ ERP connectors · batch automation at scale",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-white">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-70" />

      <Container className="relative grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-12 lg:py-16">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
              <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              LHDN MyInvois · CTC ready
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-blue/20 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-brand-blue">
              <FileCode2 className="h-3.5 w-3.5" />
              UBL 2.1 native
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <Gauge className="h-3.5 w-3.5" />
              Enterprise efficiency
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            Enterprise e-invoicing,{" "}
            <span className="text-gradient">automated in seconds</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            100% aligned with Malaysia LHDN e-Invoice. Einvoicify maps your ERP
            data to <strong className="font-semibold text-brand-navy">UBL 2.1</strong>{" "}
            (XML/JSON), submits to MyInvois in near real time, and returns IRBM
            validation — so finance stays efficient, not buried in portals.
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
              <PlayCircle className="h-4 w-4" />
              Try product demo
              <ExternalLink className="h-3.5 w-3.5 opacity-80" />
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="outline">
              Book enterprise consult
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>

          <p className="mt-6 text-xs text-slate-500 sm:text-sm">
            Built for high-volume Malaysian enterprises · Live app{" "}
            <a
              href={siteConfig.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-blue hover:underline"
            >
              app.einvoicify.my
            </a>
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-red/10 via-transparent to-brand-blue/15 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>
              <span className="text-xs font-medium text-slate-500">
                UBL → MyInvois · live pipeline
              </span>
            </div>

            <div className="space-y-4 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Efficiency today
                  </p>
                  <p className="mt-1 text-2xl font-bold text-brand-navy">
                    1,248 docs automated
                  </p>
                </div>
                <div className="rounded-xl bg-emerald-50 px-3 py-2 text-right">
                  <p className="text-xs font-medium text-emerald-700">
                    First-pass valid
                  </p>
                  <p className="text-lg font-bold text-emerald-700">99.7%</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    label: "UBL 2.1",
                    value: "XML/JSON",
                    icon: FileCode2,
                    tone: "text-brand-blue bg-blue-50",
                  },
                  {
                    label: "IRBM UUID",
                    value: "Live",
                    icon: ShieldCheck,
                    tone: "text-emerald-600 bg-emerald-50",
                  },
                  {
                    label: "Latency",
                    value: "Seconds",
                    icon: Zap,
                    tone: "text-brand-red bg-rose-50",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-slate-100 bg-slate-50/50 p-3"
                  >
                    <stat.icon
                      className={`mb-2 h-4 w-4 rounded p-0.5 ${stat.tone}`}
                    />
                    <p className="text-sm font-bold text-brand-navy sm:text-base">
                      {stat.value}
                    </p>
                    <p className="text-[11px] font-medium text-slate-500">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-slate-100 p-4">
                <div className="mb-3 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">
                    Real-time document status
                  </span>
                  <span className="text-slate-400">MyInvois CTC</span>
                </div>
                <ul className="space-y-2.5">
                  {[
                    {
                      id: "INV · type 01",
                      status: "Valid · UUID",
                      color: "bg-emerald-100 text-emerald-700",
                    },
                    {
                      id: "CN · type 02",
                      status: "Submitted",
                      color: "bg-blue-100 text-blue-700",
                    },
                    {
                      id: "UBL payload",
                      status: "Schema OK",
                      color: "bg-violet-100 text-violet-700",
                    },
                  ].map((row) => (
                    <li
                      key={row.id}
                      className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm"
                    >
                      <span className="font-mono text-xs text-slate-600 sm:text-sm">
                        {row.id}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${row.color}`}
                      >
                        {row.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
