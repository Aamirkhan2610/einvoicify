import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { Features } from "@/components/home/Features";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CaseStudies } from "@/components/home/CaseStudies";
import { CompliancePreview } from "@/components/home/CompliancePreview";
import { CTA } from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ProductShowcase />
      <Features />
      <HowItWorks />
      <CaseStudies limit={3} />
      <CompliancePreview />
      <CTA />
    </>
  );
}
