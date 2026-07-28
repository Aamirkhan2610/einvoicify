import { ArrowRight, ExternalLink, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export function CTA() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-3xl gradient-brand px-6 py-10 text-center text-white shadow-xl shadow-brand-blue/20 sm:px-12 sm:py-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_45%)]" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to automate Malaysia e-invoicing?
            </h2>
            <p className="mt-4 text-base text-white/90 sm:text-lg">
              Talk to our team about ERP integration, MyInvois onboarding, and a
              rollout plan sized to your invoice volume — or try the live product
              demo first.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href="/contact" variant="white" size="lg">
                Request a Demo
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href={siteConfig.productUrl}
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                Live product demo
                <ExternalLink className="h-4 w-4" />
              </ButtonLink>
            </div>
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-white/80">
              <MessageCircle className="h-4 w-4" />
              Prefer chat? Use the widget for product & pricing inquiries —
              our CRM team responds from the dashboard.
            </p>
            <p className="mt-3 text-sm text-white/70">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="underline-offset-2 hover:text-white hover:underline"
              >
                {siteConfig.contact.email}
              </a>
              {" · "}
              <a
                href={siteConfig.contact.phoneHref}
                className="underline-offset-2 hover:text-white hover:underline"
              >
                {siteConfig.contact.phone}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
