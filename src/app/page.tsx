import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustSection } from "@/components/TrustSection";
import { ServicesGrid } from "@/components/ServicesGrid";
import { EquipmentBanner } from "@/components/EquipmentBanner";
import { ProcessSection } from "@/components/ProcessSection";
import { FinancingTeaser } from "@/components/FinancingTeaser";
import { AboutSection } from "@/components/AboutSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />
        <TrustSection />
        <ServicesGrid />
        <EquipmentBanner />
        <ProcessSection />
        <FinancingTeaser />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
