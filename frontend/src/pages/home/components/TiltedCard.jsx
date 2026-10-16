import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const springValues = {
  damping: 30,
  stiffness: 120,
  mass: 1.5,
};

export default function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "440px",
  containerWidth = "100%",
  imageHeight = "100%",
  imageWidth = "100%",
  scaleOnHover = 1.05,
  rotateAmplitude = 14,
  showMobileWarning = false,
  showTooltip = false,
  displayOverlayContent = false,
  overlayContent = null,
  name = "",
  designation = "",
  className = "",
}) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const lastYRef = useRef(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  function handleMouse(e) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastYRef.current;
    rotateFigcaption.set(-velocityY * 0.6);
    lastYRef.current = offsetY;
  }

  function handleMouseEnter() {
    setIsHovered(true);
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className={`relative w-full flex flex-col items-center justify-center select-none ${className}`}
      style={{
        height: containerHeight || undefined,
        width: containerWidth || undefined,
        perspective: "1000px",
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="absolute top-2 text-[10px] text-zinc-500 block sm:hidden">
          This effect is not optimized for mobile
        </div>
      )}

      {/* 3D Tilted Card Surface */}
      <motion.div
        className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.1] bg-[#0c0a07] transition-all duration-300"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
          boxShadow: isHovered
            ? "0 25px 60px rgba(0,0,0,0.95), 0 0 35px rgba(246,217,107,0.18)"
            : "0 14px 35px rgba(0,0,0,0.85)",
          borderColor: isHovered ? "rgba(246, 217, 107, 0.45)" : "rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Specular Glare Reflection following Cursor */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-200"
            style={{
              background: `radial-gradient(circle at ${x.get()}px ${y.get()}px, rgba(255, 255, 255, 0.14) 0%, transparent 65%)`,
            }}
          />
        )}

        {/* Top Gold Edge Accent Line on Hover */}
        <div
          className={`absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300 z-20 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "linear-gradient(90deg, transparent, #f6d96b, transparent)",
          }}
        />

        {/* Card Portrait Image: Black & White by default, Full Color on Hover */}
        <motion.img
          src={imageSrc}
          alt={altText}
          className={`w-full h-full object-cover object-top will-change-transform pointer-events-none transition-all duration-500 ease-out ${
            isHovered
              ? "grayscale-0 contrast-100 brightness-100 scale-[1.02]"
              : "grayscale contrast-[1.08] brightness-[0.92] scale-100"
          }`}
        />

        {/* Bottom Dark Gradient Scrim for Name & Designation */}
        <div
          className="absolute inset-x-0 bottom-0 pt-24 pb-5 px-5 sm:px-6 bg-gradient-to-t from-[#080705] via-[#080705]/85 to-transparent z-10 flex flex-col justify-end"
          style={{ transform: "translateZ(30px)" }}
        >
          {displayOverlayContent && overlayContent ? (
            overlayContent
          ) : (
            <div className="flex flex-col space-y-1">
              <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight leading-tight">
                {name}
              </h3>
              <p className="text-xs sm:text-sm font-normal text-[#f6d96b] tracking-wider uppercase font-mono">
                {designation}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Floating Cursor Tooltip (Optional ReactBits Feature) */}
      {showTooltip && captionText && (
        <motion.figcaption
          className="pointer-events-none absolute left-0 top-0 rounded-lg bg-zinc-900/90 px-3 py-1.5 text-xs font-medium text-white shadow-xl backdrop-blur-md border border-white/10 z-40 hidden sm:block"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption,
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}
