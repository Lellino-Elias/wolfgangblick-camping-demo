import { PlaceholderProvider } from "@/components/ui/Placeholder";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import BrandStatement from "@/components/sections/BrandStatement";
import TrustBar from "@/components/sections/TrustBar";
import CampingFeatures from "@/components/sections/CampingFeatures";
import Mobilheime from "@/components/sections/Mobilheime";
import Kinder from "@/components/sections/Kinder";
import Aktivitaeten from "@/components/sections/Aktivitaeten";
import LageAnreise from "@/components/sections/LageAnreise";
import Galerie from "@/components/sections/Galerie";
import StorySection from "@/components/sections/StorySection";
import Breather from "@/components/sections/Breather";
import Booking from "@/components/sections/Booking";
import Footer from "@/components/sections/Footer";
import { campsite } from "@/content/campsite.config";

export default function CampsiteHome({ theme }: { theme?: string }) {
  // Farbwelt aus dem Lead-Config (kuratierte Paletten); Prop nur als Override für Previews.
  // Der Theme-Wrapper braucht EIGENEN bg/text (body malt immer :root=editorial) und muss den
  // PlaceholderProvider UMSCHLIESSEN, damit auch der Toast die Theme-Tokens erbt.
  const activeTheme = theme ?? campsite.theme ?? "editorial";
  return (
    <div data-theme={activeTheme} className="grain relative min-h-svh bg-bg text-ink">
      <PlaceholderProvider>
        <SmoothScroll>
          <Header />
          <main>
            <Hero />
            <BrandStatement />
            <CampingFeatures />
            <TrustBar />
            {/* Full-Bleed-Atempause (nur mit config.breather) — bricht die Container-Monotonie */}
            <Breather />
            {/* Story (sticky Split) rendert nur, wenn 3+ Kapitel MIT Bildern existieren */}
            <StorySection />
            <Mobilheime />
            <Kinder />
            <LageAnreise />
            <Galerie />
            <Aktivitaeten />
            <Booking />
          </main>
          <Footer />
        </SmoothScroll>
      </PlaceholderProvider>
    </div>
  );
}
