import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./appRoutes/AppRoutes";
import Preloader from "./components/Preloader";
import ExperienceModal from "./components/ExperienceModal";
import { SoundProvider } from "./context/SoundContext";
import ClerkSafeProvider from "./context/ClerkSafeProvider";

import { EnquiryProvider } from "./context/EnquiryContext";

function App() {
  const [isPreloading, setIsPreloading] = useState(true);

  // Prevent background scroll while preloader is active
  useEffect(() => {
    if (isPreloading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPreloading]);

  return (
    <ClerkSafeProvider>
      <SoundProvider>
        {isPreloading && <Preloader onComplete={() => setIsPreloading(false)} />}
        {!isPreloading && <ExperienceModal />}
        <BrowserRouter>
          <EnquiryProvider>
            <AppRoutes />
          </EnquiryProvider>
        </BrowserRouter>
      </SoundProvider>
    </ClerkSafeProvider>
  );
}

export default App;
