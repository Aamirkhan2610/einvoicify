import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { Solutions } from "@/components/home/Solutions";
import { UseCases } from "@/components/home/UseCases";
import { SimpleSteps } from "@/components/home/SimpleSteps";
import { PlainBenefits } from "@/components/home/PlainBenefits";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { CaseStudies } from "@/components/home/CaseStudies";
import { CTA } from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Solutions />
      <UseCases />
      <SimpleSteps />
      <PlainBenefits />
      <ProductShowcase />
      <CaseStudies limit={3} />
      <CTA />
    </>
  );
}
