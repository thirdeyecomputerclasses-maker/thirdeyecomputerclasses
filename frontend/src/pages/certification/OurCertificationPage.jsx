import React, { useState, useEffect } from "react";
import CertificationHero from "./components/CertificationHero";
import CertificationGrid from "./components/CertificationGrid";
import CertificationProcessCTA from "./components/CertificationProcessCTA";
import CertificateLightbox from "./components/CertificateLightbox";

export default function OurCertificationPage() {
  const [activeZoomCert, setActiveZoomCert] = useState(null);

  useEffect(() => {
    document.title =
      "Our Certifications & Accreditations | ThirdEye Computer Classes Jaipur";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleScrollToGrid = () => {
    const el = document.getElementById("certifications-vault");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="our-certification-page min-h-screen bg-[#050505] text-white selection:bg-[#f6d96b] selection:text-black overflow-x-clip">
      {/* Section 1: Hero Header & Trust Accreditation Strip */}
      <CertificationHero onScrollToGrid={handleScrollToGrid} />

      {/* Section 2: 3D FlipCard Interactive Credential Vault (React Bits style) */}
      <CertificationGrid onZoom={(cert) => setActiveZoomCert(cert)} />

      {/* Section 3: 3-Step Certification Process & Dual Action CTAs */}
      <CertificationProcessCTA />

      {/* High-Resolution Certificate Lightbox Modal */}
      {activeZoomCert && (
        <CertificateLightbox
          cert={activeZoomCert}
          onClose={() => setActiveZoomCert(null)}
        />
      )}
    </main>
  );
}
