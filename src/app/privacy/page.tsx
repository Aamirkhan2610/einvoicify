import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Einvoicify website and enquiry services.",
};

export default function PrivacyPage() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="max-w-3xl">
        <SectionHeading
          align="left"
          title="Privacy Policy"
          description="How we handle personal data submitted through this website."
        />
        <div className="prose prose-slate mt-10 max-w-none space-y-6 text-sm leading-relaxed text-slate-600">
          <p>
            {siteConfig.name} (“we”, “us”) respects your privacy. This policy
            explains what we collect when you use {siteConfig.url} and how we
            use it.
          </p>
          <h2 className="text-lg font-semibold text-brand-navy">
            Information we collect
          </h2>
          <p>
            When you submit a contact or demo form, we collect the details you
            provide (such as name, email, phone, company, turnover band, ERP
            system, and message content). We may also store technical metadata
            such as IP address and user agent for security and abuse prevention.
          </p>
          <h2 className="text-lg font-semibold text-brand-navy">
            How we use information
          </h2>
          <p>
            We use enquiry data to respond to your request, provide product
            information, schedule demos, and improve our services. We do not
            sell personal data to third parties.
          </p>
          <h2 className="text-lg font-semibold text-brand-navy">Storage</h2>
          <p>
            Form submissions are stored in our PostgreSQL database and may be
            processed by authorised staff and infrastructure providers under
            appropriate confidentiality obligations.
          </p>
          <h2 className="text-lg font-semibold text-brand-navy">Contact</h2>
          <p>
            For privacy enquiries, email{" "}
            <a
              className="font-medium text-brand-blue"
              href={`mailto:${siteConfig.contact.email}`}
            >
              {siteConfig.contact.email}
            </a>
            .
          </p>
          <p className="text-xs text-slate-500">
            Last updated: July 2026. This is a concise website policy and may be
            supplemented by customer agreements for production e-invoice
            services.
          </p>
        </div>
      </Container>
    </section>
  );
}
