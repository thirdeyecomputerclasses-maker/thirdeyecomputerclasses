import React, { useEffect } from "react";
import AboutUsSection from "./AboutUsSection";

export default function AboutPage() {
  useEffect(() => {
    document.title =
      "About Us | ThirdEye Computer Classes - Where Dreams Transform Into Code & Art";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <main className="about-page-wrapper min-h-screen bg-[#050505]">
      <AboutUsSection showFullPageHero={true} />
    </main>
  );
}
