import Navbar from "@/components/landingpage/navbar"
import { HeroSection } from "@/components/landingpage/hero-section"
import { FeaturesSection } from "@/components/landingpage/features-section"
import { HowItWorksSection } from "@/components/landingpage/how-it-works-section"
import { StatsSection } from "@/components/landingpage/stats-section"
import { CTASection } from "@/components/landingpage/cta-section"
import { Footer } from "@/components/landingpage/footer"

export default function Home() {
  return (
      <main className="w-full">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <StatsSection />
        <CTASection />
        <Footer />
      </main>
  )
}
