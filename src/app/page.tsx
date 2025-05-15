import Features from "./components/features";
import HeroSection from "./components/hero-section";
import MarqueeContent from "./components/marquee-content";
import Preview from "./components/project-preview";
import Testimonials from "./components/testimonials";
import Values from "./components/values";

export default function Home() {
  return (
    <>
      <div className="_navigation-bar">
        <HeroSection />
        <MarqueeContent />
        <Features />
        <Values />
        <Preview />
        <Testimonials />
      </div>
    </>
  );
}
