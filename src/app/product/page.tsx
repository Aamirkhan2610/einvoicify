import type { Metadata } from "next";
import {
  ArrowRight,
  ExternalLink,
  Monitor,
  Upload,
  Link2,
  CheckCircle2,
} from "lucide-react";
import { productHighlights, solutions, siteConfig } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Product — Einvoicify e-Invoice Platform",
  description:
    "Explore Einvoicify: portal access, SFTP document upload, and API as a service for Malaysian e-invoicing.",
};

const icons = { monitor: Monitor, upload: Upload, link: Link2 };

export default function ProductPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
        <Container className="relative py-14 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-blue">
              Product
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
              One platform, three ways to work
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Use the web portal, upload invoice files securely, or connect
              your systems with our API. Start simple — grow when you need to.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href={siteConfig.productUrl} size="lg">
                Open live demo
                <ExternalLink className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/contact" size="lg" variant="outline">
                Ask which option fits you
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <Section className="bg-slate-50/80">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {solutions.map((s) => {
              const Icon = icons[s.icon];
              return (
                <article
                  key={s.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <Icon className="h-8 w-8 text-brand-blue" />
                  <h2 className="mt-4 text-xl font-bold text-brand-navy">
                    {s.title}
                  </h2>
                  <p className="mt-2 text-sm font-semibold text-brand-blue">
                    {s.headline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {s.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <SectionHeading
            title="What you get in the product"
            description="Clear tools for everyday finance work — not a wall of technical settings."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {productHighlights.map((h) => (
              <div
                key={h.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5"
              >
                <h3 className="font-semibold text-brand-navy">{h.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{h.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-slate-500">
            Looking for LHDN technical specifications (UBL, document types)?{" "}
            <a href="/compliance" className="font-semibold text-brand-blue hover:underline">
              See the compliance page
            </a>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
