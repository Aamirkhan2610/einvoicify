import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for the Einvoicify marketing website.",
};

export default function TermsPage() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="max-w-3xl">
        <SectionHeading
          align="left"
          title="Terms of Use"
          description="Terms governing use of the Einvoicify website."
        />
        <div className="mt-10 space-y-6 text-sm leading-relaxed text-slate-600">
          <p>
            By accessing {siteConfig.url}, you agree to these terms. The site
            provides general information about e-invoicing services for
            Malaysian businesses.
          </p>
          <h2 className="text-lg font-semibold text-brand-navy">
            No professional advice
          </h2>
          <p>
            Content about LHDN, MyInvois, implementation phases, and technical
            requirements is informational only. It is not tax, legal, or
            accounting advice. Always verify obligations with official IRBM
            sources and your professional advisors.
          </p>
          <h2 className="text-lg font-semibold text-brand-navy">
            Services & contracts
          </h2>
          <p>
            Production use of Einvoicify platforms is governed by separate
            commercial agreements, statements of work, and service levels. A
            website enquiry does not create a binding service contract.
          </p>
          <h2 className="text-lg font-semibold text-brand-navy">
            Acceptable use
          </h2>
          <p>
            You must not misuse this website (including automated abuse of forms
            or attempts to disrupt availability). We may block abusive traffic.
          </p>
          <h2 className="text-lg font-semibold text-brand-navy">Contact</h2>
          <p>
            Questions:{" "}
            <a
              className="font-medium text-brand-blue"
              href={`mailto:${siteConfig.contact.email}`}
            >
              {siteConfig.contact.email}
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
