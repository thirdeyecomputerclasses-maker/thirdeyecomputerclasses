import React from "react";

/**
 * ThirdEyeSpinner
 * Clean, elegant, minimalist golden spinner matching ThirdEye's luxury aesthetic.
 * Dual harmonic concentric arcs with a subtle pulsing center core and warm ambient aura.
 */
export default function ThirdEyeSpinner({
  size = "md",
  className = "",
  showGlow = true,
}) {
  const sizeMap = {
    sm: 32,
    md: 48,
    lg: 60,
    xl: 72,
    hero: 84,
  };

  const dimension = typeof size === "number" ? size : sizeMap[size] || 48;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: dimension, height: dimension }}
      role="status"
      aria-label="Loading..."
    >
      {/* Soft Ambient Radial Gold Aura */}
      {showGlow && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none animate-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(246, 217, 107, 0.22) 0%, rgba(234, 179, 8, 0.08) 50%, transparent 75%)",
            filter: dimension > 50 ? "blur(14px)" : "blur(8px)",
            transform: "scale(1.4)",
          }}
        />
      )}

      <svg
        viewBox="0 0 60 60"
        className="w-full h-full relative z-10 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Smooth Golden Arc Gradient */}
          <linearGradient id="goldArcPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#f6d96b" stopOpacity="1" />
            <stop offset="85%" stopColor="#d97706" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
          </linearGradient>

          {/* Inner Counter Arc Gradient */}
          <linearGradient id="goldArcInner" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f6d96b" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#eab308" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ca8a04" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer Background Faint Track */}
        <circle
          cx="30"
          cy="30"
          r="24"
          stroke="rgba(246, 217, 107, 0.12)"
          strokeWidth="2.4"
        />

        {/* Outer Smooth Primary Arc (Clockwise) */}
        <g className="animate-[spin_1.25s_linear_infinite] origin-center">
          <circle
            cx="30"
            cy="30"
            r="24"
            stroke="url(#goldArcPrimary)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeDasharray="95 150"
          />
        </g>

        {/* Inner Counter Arc (Counter-Clockwise) */}
        <g className="animate-[spin_2s_linear_infinite_reverse] origin-center">
          <circle
            cx="30"
            cy="30"
            r="16"
            stroke="url(#goldArcInner)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeDasharray="50 100"
          />
        </g>

        {/* Center Glowing Gold Core Dot */}
        <circle
          cx="30"
          cy="30"
          r="3"
          fill="#f6d96b"
          className="animate-pulse"
        />
      </svg>
    </div>
  );
}
