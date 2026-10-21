import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { preloadAllSources, isCachedWarm } from "../utils/assetPreloader";
import { useSound } from "../context/SoundContext";

/**
 * Preloader Component
 * High-end minimalist circular progress loader with persistent caching.
 * Pre-downloads all site images, audio, and fonts in the background into CacheStorage.
 * First-time visitors see smooth 0-100% progress while assets download.
 * Returning visitors with cached assets experience near-instant (<300ms) smooth entry.
 */
export default function Preloader({ onComplete }) {
  const { playAudio } = useSound();
  const isWarm = useRef(isCachedWarm()).current;
  const [targetProgress, setTargetProgress] = useState(isWarm ? 80 : 0);
  const [displayProgress, setDisplayProgress] = useState(isWarm ? 50 : 0);
  const [isDone, setIsDone] = useState(false);
  const [dots, setDots] = useState(".");

  const animFrameRef = useRef(null);
  const isCompletedRef = useRef(false);

  // Animated dots: "." -> ".." -> "..."
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 380);
    return () => clearInterval(dotInterval);
  }, []);

  // 1. Download all sources in background & track progress
  useEffect(() => {
    // If warm cache, immediately aim for 100%
    if (isWarm) {
      setTargetProgress(100);
    } else {
      setTargetProgress(10);
    }

    let isMounted = true;
    preloadAllSources((loaded, total, pct) => {
      if (isMounted) {
        setTargetProgress((prev) => Math.max(prev, pct));
      }
    })
      .then(() => {
        if (isMounted) setTargetProgress(100);
      })
      .catch(() => {
        if (isMounted) setTargetProgress(100);
      });

    return () => {
      isMounted = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isWarm]);

  // 2. Smooth Lerp Animation for 0 -> 100 Counter (Fluid 60fps)
  useEffect(() => {
    let current = displayProgress;

    const tick = () => {
      if (isCompletedRef.current) return;

      const target = targetProgress;
      const diff = target - current;

      if (diff > 0.1) {
        // Dynamic step: accelerate for returning cached users (<300ms total)
        const step = isWarm
          ? Math.max(4.5, diff * 0.35)
          : Math.max(0.4, diff * 0.08);
        current = Math.min(target, current + step);
        setDisplayProgress(Math.floor(current));
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        current = target;
        setDisplayProgress(Math.floor(current));

        if (current >= 100 && !isCompletedRef.current) {
          isCompletedRef.current = true;
          // Hold 100% briefly (120ms for warm cache, 300ms for cold)
          setTimeout(() => {
            setIsDone(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, isWarm ? 350 : 550);
          }, isWarm ? 120 : 300);
        }
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [targetProgress, isWarm]);

  // SVG Geometry Constants
  const size = 140;
  const strokeWidth = 3.5;
  const center = size / 2;
  const radius = center - strokeWidth - 8; // 58px radius
  const circumference = 2 * Math.PI * radius; // ~364.4px
  const strokeDashoffset =
    circumference - (displayProgress / 100) * circumference;

  // Active tip coordinates
  const angle = (-90 + (displayProgress / 100) * 360) * (Math.PI / 180);
  const tipX = center + radius * Math.cos(angle);
  const tipY = center + radius * Math.sin(angle);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="clean-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#090A0F] text-white select-none overflow-hidden"
          onPointerDown={() => {
            if (playAudio) playAudio();
          }}
          onClick={() => {
            if (playAudio) playAudio();
          }}
        >
          {/* Subtle Ambient Radial Golden Glow */}
          <div
            className="absolute w-[440px] h-[440px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(246, 217, 107, 0.14) 0%, rgba(234, 179, 8, 0.04) 45%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Loader Center Area */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Circular Progress Ring with Center 0-100% */}
            <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
              <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="overflow-visible"
              >
                <defs>
                  {/* Glowing Gold Gradient for Progress Ring */}
                  <linearGradient id="ringGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fff9db" />
                    <stop offset="40%" stopColor="#f6d96b" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>

                  {/* Neon Glow Filter */}
                  <filter id="ringGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Satellite Tip Dot Glow */}
                  <filter id="tipGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#f6d96b" floodOpacity="0.9" />
                  </filter>
                </defs>

                {/* Background Track Ring */}
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.06)"
                  strokeWidth={strokeWidth}
                />

                {/* Faint Outer Guide Track */}
                <circle
                  cx={center}
                  cy={center}
                  r={radius + 8}
                  fill="none"
                  stroke="rgba(246, 217, 107, 0.08)"
                  strokeWidth="1"
                  strokeDasharray="2 6"
                />

                {/* Animated Golden Progress Arc */}
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke="url(#ringGoldGrad)"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  transform={`rotate(-90 ${center} ${center})`}
                  filter="url(#ringGlow)"
                  style={{
                    transition: "stroke-dashoffset 0.1s linear",
                  }}
                />

                {/* Traveling Satellite Tip Dot */}
                {displayProgress > 0 && (
                  <circle
                    cx={tipX}
                    cy={tipY}
                    r="4"
                    fill="#ffffff"
                    filter="url(#tipGlow)"
                  />
                )}
              </svg>

              {/* Center 0-100% Typography */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex items-baseline font-mono tracking-tight">
                  <span className="text-3xl sm:text-4xl font-bold text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
                    {displayProgress}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-yellow-400 ml-0.5">
                    %
                  </span>
                </div>
              </div>
            </div>

            {/* Clean Loading... Status */}
            <div className="mt-7 flex items-center justify-center font-mono text-xs tracking-[0.28em] uppercase text-zinc-400">
              <span>Loading</span>
              <span className="inline-block w-6 text-left text-yellow-400 font-bold ml-0.5">
                {dots}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
