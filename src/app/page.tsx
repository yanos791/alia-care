import NavBar from '@/components/landing/NavBar'
import HeroSection from '@/components/landing/HeroSection'
import HowItWorksSection from '@/components/landing/HowItWorksSection'
import FeatureShowcase from '@/components/landing/FeatureShowcase'
import LiveDemoStrip from '@/components/landing/LiveDemoStrip'
import TrustSection from '@/components/landing/TrustSection'
import PricingSection from '@/components/landing/PricingSection'
import FinalCTASection from '@/components/landing/FinalCTASection'
import Footer from '@/components/landing/Footer'

export default function Home() {
  return (
    <main className="bg-[#F5EFE8] overflow-x-hidden antialiased">
      <NavBar/>
      <HeroSection/>
      <HowItWorksSection/>
      <FeatureShowcase/>
      <LiveDemoStrip/>
      <TrustSection/>
      <PricingSection/>
      <FinalCTASection/>
      <Footer/>
    </main>
  )
}
