import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Container, SectionHeading } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Einvoicify for LHDN e-invoice demos, ERP integration, and MyInvois onboarding. Oasis Damansara, Selangor — info@einvoicify.my · +6016-338-1871.",
};

export default function ContactPage() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="bg-hero-glow">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Contact"
            title="Let’s automate your e-invoicing"
            description="Tell us about your systems, turnover band, and go-live target. Our account specialists will respond with a practical next step."
          />

          <div className="mt-12 grid items-start gap-10 lg:grid-cols-5">
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-brand-navy">
                  Reach us directly
                </h2>
                <ul className="mt-5 space-y-4 text-sm text-slate-600">
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                    <span>{siteConfig.contact.address.full}</span>
                  </li>
                  <li>
                    <a
                      href={siteConfig.contact.phoneHref}
                      className="flex gap-3 transition hover:text-brand-navy"
                    >
                      <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                      {siteConfig.contact.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="flex gap-3 transition hover:text-brand-navy"
                    >
                      <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                      {siteConfig.contact.email}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                    <span>
                      Business hours: Mon–Fri, 9:00–18:00 (Malaysia Time)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-brand-navy p-6 text-white shadow-sm">
                <h3 className="text-base font-semibold">What to prepare</h3>
                <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-slate-300">
                  <li>Approximate annual turnover (for phase mapping)</li>
                  <li>ERP / accounting system name and version</li>
                  <li>Monthly invoice volume and document mix</li>
                  <li>MyInvois registration status (if known)</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-3">
              <ContactForm defaultType="demo" />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
