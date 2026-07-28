import { Hero } from "@/components/home/Hero";
import { Achievement } from "@/components/home/Achievement";
import { TrustBar } from "@/components/home/TrustBar";
import { Solutions } from "@/components/home/Solutions";
import { WhyIos } from "@/components/home/WhyIos";
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
      <Achievement />
      <TrustBar />
      <Solutions />
      <WhyIos />
      <UseCases />
      <SimpleSteps />
      <PlainBenefits />
      <ProductShowcase />
      <CaseStudies limit={3} />
      <CTA />
    </>
  );
}
