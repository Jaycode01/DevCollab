import HeroSection from "./components/hero-section";
import MarqueeContent from "./components/marquee-content";

export default function Home() {
  return (
    <>
      <div className="_navigation-bar">
        <HeroSection />
        <MarqueeContent />
      </div>
    </>
  );
}
