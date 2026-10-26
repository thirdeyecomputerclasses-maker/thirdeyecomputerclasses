import React, { useEffect } from "react";
import HeroSection from "./components/HeroSection";
import PlacementStatsMarquee from "./components/PlacementStatsMarquee";
import Immersive3DJourneySection from "./components/Immersive3DJourneySection";
import CoursesFolderVaultSection from "./components/CoursesFolderVaultSection";
import StudioCardsScrollSection from "./components/StudioCardsScrollSection";
import MentorsCarouselSection from "./components/MentorsCarouselSection";
import FAQSection from "./components/FAQSection";
import ThirdEyeBrandTorchSection from "./components/ThirdEyeBrandTorchSection";
import ScrollReveal from "./components/ScrollReveal";
import "./HomePage.css";

export default function HomePage() {
  useEffect(() => {
    document.title = "ThirdEye Computer Classes | Premier 3D Animation, IT & Tech Labs Jaipur";
  }, []);

  return (
    <div className="home-page-container relative min-h-screen text-white selection:bg-[#f6d96b] selection:text-black overflow-x-clip">
      {/* Global Seamless Yellow-Tinted Tech Grid (Covers 100% of Whole Page) */}
      <div className="home-page-grid-overlay" />

      {/* 1. Hero Section (First Section User Sees) */}
      <ScrollReveal direction="up" duration={800} delay={30}>
        <HeroSection />
      </ScrollReveal>

      {/* 2. Placement Stats & Top Hiring Partners Marquee */}
      <ScrollReveal direction="up" duration={800} delay={50}>
        <PlacementStatsMarquee />
      </ScrollReveal>

      {/* 3. The Converging Hands Journey & Connected Timeline */}
      <Immersive3DJourneySection />

      {/* 4. The 300+ Digital Courses Vault (ReactBits FolderFloat) */}
      <ScrollReveal direction="up" duration={800} delay={50}>
        <CoursesFolderVaultSection />
      </ScrollReveal>

      {/* 5. Studio Immersion 3-Split Image & 3D Card Flip Scrub (Sheryians Kodr style) */}
      <StudioCardsScrollSection />

      {/* 6. Our Expert Faculty — 3D Coverflow Carousel */}
      <MentorsCarouselSection />

      {/* 7. Frequently Asked Questions */}
      <FAQSection />

      {/* 8. Giant Typographic Brand Torch Finale (Sheryians style) */}
      <ScrollReveal direction="up" duration={700} delay={40}>
        <ThirdEyeBrandTorchSection />
      </ScrollReveal>
    </div>
  );
}
