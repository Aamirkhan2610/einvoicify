import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock, User } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Container, SectionHeading } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.legalName} for Einvoicify e-invoice, QAD ERP, and demos. Oasis Damansara · ${siteConfig.contact.phone}`,
};

export default function ContactPage() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="bg-hero-glow">
        <Container className="py-14 sm:py-16">
          <SectionHeading
            eyebrow="Contact"
            title="Talk to the IOS team"
            description={`${siteConfig.legalName} (${siteConfig.registrationNo}). Same office and contacts as iosmalaysia.com — ready to help with e-invoice and ERP.`}
          />

          <div className="mt-12 grid items-start gap-10 lg:grid-cols-5">
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-brand-navy">
                  Office
                </h2>
                <ul className="mt-5 space-y-4 text-sm text-slate-600">
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                    <span>
                      <strong className="text-brand-navy">
                        {siteConfig.legalName}
                      </strong>
                      <br />
                      ({siteConfig.registrationNo})
                      <br />
                      {siteConfig.contact.address.full}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                    <span>Business hours: Mon–Fri, 9:00–18:00 (Malaysia)</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-brand-navy">
                  Your contacts
                </h2>
                <ul className="mt-5 space-y-5">
                  {siteConfig.people.map((p) => (
                    <li key={p.email} className="text-sm">
                      <div className="flex items-center gap-2 font-semibold text-brand-navy">
                        <User className="h-4 w-4 text-brand-blue" />
                        {p.name}
                      </div>
                      <a
                        href={`mailto:${p.email}`}
                        className="mt-1 flex items-center gap-2 text-slate-600 hover:text-brand-blue"
                      >
                        <Mail className="h-4 w-4 shrink-0" />
                        {p.email}
                      </a>
                      <a
                        href={p.phoneHref}
                        className="mt-1 flex items-center gap-2 text-slate-600 hover:text-brand-blue"
                      >
                        <Phone className="h-4 w-4 shrink-0" />
                        {p.phone}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
                  General:{" "}
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-brand-blue hover:underline"
                  >
                    {siteConfig.contact.email}
                  </a>
                  {" · "}
                  <a
                    href={`mailto:${siteConfig.contact.generalEmail}`}
                    className="text-brand-blue hover:underline"
                  >
                    {siteConfig.contact.generalEmail}
                  </a>
                </p>
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
