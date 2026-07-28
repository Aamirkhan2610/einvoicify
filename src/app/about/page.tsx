import type { Metadata } from "next";
import Link from "next/link";
import {
  companyAbout,
  industriesServed,
  siteConfig,
  achievement,
} from "@/lib/site";
import { Container, Section, SectionHeading } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About IOS Malaysia",
  description:
    "Integrated Operation Solutions Sdn. Bhd. (947729-A) — QAD partner and LHDN e-invoice specialist. Einvoicify product. Oasis Damansara, Selangor.",
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="bg-hero-glow">
          <Container className="py-14 sm:py-16">
            <SectionHeading
              eyebrow="About us"
              title={siteConfig.legalName}
              description={`${siteConfig.registrationNo} · Trading as ${siteConfig.companyBrand} · Product: Einvoicify`}
            />
            <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-slate-600">
              {companyAbout.intro}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/contact">Contact our team</ButtonLink>
              <ButtonLink href={siteConfig.legacySite} variant="outline">
                Original site: iosmalaysia.com
              </ButtonLink>
            </div>
          </Container>
        </div>
      </section>

      <Section className="bg-slate-50/80">
        <Container className="max-w-3xl space-y-6 text-base leading-relaxed text-slate-600">
          <div>
            <h2 className="text-xl font-bold text-brand-navy">
              Company introduction
            </h2>
            <p className="mt-3">{companyAbout.detail}</p>
            <p className="mt-3">{companyAbout.experience}</p>
            <p className="mt-3">{companyAbout.extra}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-brand-navy">Vision</h3>
              <p className="mt-2 text-sm">{companyAbout.vision}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-brand-navy">Mission</h3>
              <p className="mt-2 text-sm">{companyAbout.mission}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-navy">
              Industries we serve
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {industriesServed.map((ind) => (
                <span
                  key={ind}
                  className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-slate-700 ring-1 ring-slate-200"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="rounded-3xl border border-slate-200 bg-brand-navy p-8 text-white sm:p-10">
            <h2 className="text-xl font-bold sm:text-2xl">
              {achievement.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-200">
              {achievement.quote}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {achievement.stats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-slate-300">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/services">
              Our services
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/product" variant="outline">
              Einvoicify product
            </ButtonLink>
            <Link
              href="/compliance"
              className="inline-flex h-11 items-center text-sm font-semibold text-brand-blue hover:underline"
            >
              Technical compliance details →
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
