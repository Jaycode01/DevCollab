import Features from "./components/features";
import HeroSection from "./components/hero-section";
import MarqueeContent from "./components/marquee-content";
import Values from "./components/values";

export default function Home() {
  return (
    <>
      <div className="_navigation-bar">
        <HeroSection />
        <MarqueeContent />
        <Features />
        <Values />
      </div>
    </>
  );
}
