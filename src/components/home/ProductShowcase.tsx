import { ExternalLink, ArrowRight } from "lucide-react";
import { productHighlights, siteConfig } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Container";

export function ProductShowcase() {
  return (
    <Section id="product" className="bg-slate-50/80">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionHeading
              align="left"
              eyebrow="See it live"
              title="Try the Einvoicify product"
              description="Explore the live app used for day-to-day e-invoicing. When you are ready, we help you choose portal, file upload, or API for your business."
            />
            <ul className="mt-6 space-y-3">
              {productHighlights.map((h) => (
                <li key={h.title} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                  <div>
                    <p className="font-semibold text-brand-navy">{h.title}</p>
                    <p className="text-sm text-slate-600">{h.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={siteConfig.productUrl} size="lg">
                Open product demo
                <ExternalLink className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/product" size="lg" variant="outline">
                Product overview
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>

          <div className="product-frame shine-border rounded-2xl p-6 text-white sm:p-8">
            <p className="text-sm font-semibold text-sky-300">Live demo</p>
            <p className="mt-2 text-2xl font-bold tracking-tight">
              app.einvoicify.my
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Click through the product as a visitor. For pricing, SFTP setup,
              or API connection for your company, use the chat on this site or
              request a call — our team will guide you in plain language.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Portal", "SFTP upload", "API"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
