import Features from "./components/features";
import Footer from "./components/footer";
import HeroSection from "./components/hero-section";
import MarqueeContent from "./components/marquee-content";
import Preview from "./components/project-preview";
import Values from "./components/values";

export default function Home() {
  return (
    <>
      <div className="_navigation-bar overflow-x-hidden">
        <HeroSection />
        <MarqueeContent />
        <Features />
        <Values />
        <Preview />
        <Footer />
      </div>
    </>
  );
}
