import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Sparkles, Music, Headphones, X } from "lucide-react";
import { useSound } from "../context/SoundContext";

/**
 * ExperienceModal
 * Animated popup modal at the center of the screen when opening the website.
 * Welcomes the visitor with "Start the ThirdEye Experience" and invites them
 * to enable spatial ambient music or continue in silence.
 */
export default function ExperienceModal() {
  const {
    showExperienceModal,
    startExperienceWithSound,
    continueExperienceWithoutSound,
    dismissExperienceModal,
    currentSong,
  } = useSound();

  // Allow closing with Escape key (defaults to continuing in silence)
  useEffect(() => {
    if (!showExperienceModal) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        continueExperienceWithoutSound();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showExperienceModal, continueExperienceWithoutSound]);

  return (
    <AnimatePresence>
      {showExperienceModal && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          {/* Backdrop Blur & Ambient Dark Overlay */}
          <motion.div
            key="experience-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={continueExperienceWithoutSound}
          />

          {/* Ambient Radial Golden Glow */}
          <div
            className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(246, 217, 107, 0.25) 0%, rgba(217, 119, 6, 0.08) 50%, transparent 75%)",
              filter: "blur(70px)",
            }}
          />

          {/* Modal Container */}
          <motion.div
            key="experience-card"
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 280,
                damping: 24,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.92,
              y: 16,
              transition: { duration: 0.25, ease: "easeInOut" },
            }}
            className="relative z-10 w-full max-w-md rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#13151f]/95 via-[#0c0d14]/98 to-[#07080c] border border-[#f6d96b]/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(246,217,107,0.18)] text-center text-white select-none overflow-hidden"
          >
            {/* Top Glowing Accent Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-[#f6d96b] to-transparent" />

            {/* Close Button */}
            <button
              type="button"
              onClick={dismissExperienceModal}
              aria-label="Close"
              className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f6d96b]"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Glowing Icon Header */}
            <div className="relative inline-flex items-center justify-center mb-5">
              <div className="absolute inset-0 rounded-full bg-[#f6d96b]/20 blur-xl animate-pulse" />
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f6d96b]/25 via-amber-500/10 to-transparent border border-[#f6d96b]/40 flex items-center justify-center shadow-[0_0_20px_rgba(246,217,107,0.25)]">
                <Headphones className="w-8 h-8 text-[#f6d96b]" />
              </div>
            </div>

            {/* Tagline */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f6d96b]/10 border border-[#f6d96b]/25 text-[#f6d96b] text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3 h-3 text-[#f6d96b]" />
              <span>Spatial Audio Immersion</span>
            </div>

            {/* Main Title */}
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide bg-gradient-to-r from-white via-zinc-100 to-[#f6d96b] bg-clip-text text-transparent mb-2.5">
              Start The ThirdEye Experience
            </h2>

            {/* Description */}
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              Immerse yourself with atmospheric soundscapes, or continue quietly at your own pace.
            </p>

            {/* Sound Wave Animation Visualizer */}
            <div className="flex items-center justify-center gap-1 mb-6 h-6">
              {[0.4, 0.8, 0.5, 1, 0.7, 0.9, 0.4, 0.6, 0.8, 0.5].map((heightScale, idx) => (
                <motion.div
                  key={idx}
                  animate={{
                    scaleY: [heightScale * 0.4, heightScale, heightScale * 0.3],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.1 + (idx % 3) * 0.2,
                    ease: "easeInOut",
                  }}
                  className="w-1 rounded-full bg-gradient-to-t from-amber-600 to-[#f6d96b]"
                  style={{ height: "100%", transformOrigin: "bottom" }}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Primary: Experience with Music */}
              <button
                type="button"
                onClick={startExperienceWithSound}
                className="w-full flex-1 inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl font-bold text-sm sm:text-base text-zinc-950 bg-gradient-to-r from-[#ffd35a] via-[#f3cf65] to-[#fed156] shadow-[0_6px_25px_rgba(243,207,101,0.4)] hover:shadow-[0_8px_35px_rgba(243,207,101,0.6)] hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f6d96b]"
              >
                <Volume2 className="w-5 h-5 text-zinc-950 stroke-[2.2]" />
                <span>Start with Music</span>
              </button>

              {/* Secondary: Continue in Silence */}
              <button
                type="button"
                onClick={continueExperienceWithoutSound}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-medium text-sm sm:text-base text-zinc-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 active:scale-[0.98] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <VolumeX className="w-4 h-4 text-zinc-400" />
                <span>Continue Silent</span>
              </button>
            </div>

            {/* Sub-label note */}
            <p className="mt-4 text-xs text-zinc-500">
              You can toggle sound anytime using the audio icon in the navbar.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
