import {
  ArrowRight,
  ExternalLink,
  LayoutDashboard,
  FileCheck2,
  Plug,
  Mail,
  MonitorSmartphone,
} from "lucide-react";
import { productHighlights, siteConfig } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Container";

const mockRows = [
  { doc: "INV-88421", buyer: "Acme Sdn Bhd", amount: "RM 12,480.00", status: "Valid" },
  { doc: "CN-01204", buyer: "North Star Trading", amount: "RM 1,200.00", status: "Submitted" },
  { doc: "INV-88418", buyer: "Klinik Sejahtera", amount: "RM 680.50", status: "Emailed" },
  { doc: "INV-88415", buyer: "Pacific Logistics", amount: "RM 24,900.00", status: "Valid" },
];

const statusColor: Record<string, string> = {
  Valid: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  Submitted: "bg-sky-500/15 text-sky-300 ring-sky-500/30",
  Emailed: "bg-violet-500/15 text-violet-300 ring-violet-500/30",
};

export function ProductShowcase() {
  return (
    <Section id="product" className="relative overflow-hidden bg-brand-navy text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgb(29_111_229/0.25),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgb(225_29_72/0.18),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]" />

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-sky-300">
              The product · app.einvoicify.my
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              E-Invoice made simple — see the platform in action
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              Einvoicify is the live e-invoicing product used by Malaysian
              businesses to create, validate, submit, and deliver LHDN MyInvois
              documents. Explore the app demo, then talk to us about ERP
              integration and pricing for your volume.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {productHighlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                >
                  <h3 className="text-sm font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={siteConfig.productUrl}
                size="lg"
                variant="white"
              >
                Open live demo
                <ExternalLink className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/product" size="lg" variant="outline" className="border-white/25 bg-transparent text-white hover:border-white/50 hover:bg-white/10 hover:text-white">
                Product overview
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>

          {/* Product mock UI */}
          <div className="relative">
            <div className="product-frame shine-border relative overflow-hidden rounded-2xl p-1">
              <div className="overflow-hidden rounded-xl bg-[#0a1830]">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-red to-brand-blue text-xs font-bold">
                      E
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Einvoicify</p>
                      <p className="text-[10px] text-slate-400">
                        MyInvois operations
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold text-emerald-300 ring-1 ring-emerald-500/30">
                    Live · Malaysia
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 border-b border-white/10 p-3 text-[11px]">
                  {[
                    { icon: LayoutDashboard, label: "Dashboard" },
                    { icon: FileCheck2, label: "Documents" },
                    { icon: Plug, label: "Integrations" },
                  ].map((tab) => (
                    <div
                      key={tab.label}
                      className="flex items-center justify-center gap-1.5 rounded-lg bg-white/5 px-2 py-2 text-slate-300"
                    >
                      <tab.icon className="h-3.5 w-3.5" />
                      {tab.label}
                    </div>
                  ))}
                </div>

                <div className="space-y-2 p-3">
                  <div className="mb-3 flex items-center justify-between px-1">
                    <p className="text-xs font-medium text-slate-300">
                      Recent e-invoices
                    </p>
                    <span className="inline-flex items-center gap-1 text-[10px] text-sky-300">
                      <Mail className="h-3 w-3" /> Auto-delivery on
                    </span>
                  </div>
                  {mockRows.map((row) => (
                    <div
                      key={row.doc}
                      className="flex items-center justify-between gap-2 rounded-lg bg-white/[0.04] px-3 py-2.5"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-mono text-xs text-white">
                          {row.doc}
                        </p>
                        <p className="truncate text-[11px] text-slate-400">
                          {row.buyer}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium text-slate-200">
                          {row.amount}
                        </p>
                        <span
                          className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${statusColor[row.status]}`}
                        >
                          {row.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-white/10 bg-black/20 px-4 py-3">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <MonitorSmartphone className="h-3.5 w-3.5" />
                    app.einvoicify.my
                  </div>
                  <a
                    href={siteConfig.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-sky-300 hover:text-white"
                  >
                    Launch demo
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SectionHeading
          className="sr-only"
          title="Product showcase"
          description="Live Einvoicify product demo"
        />
      </Container>
    </Section>
  );
}
