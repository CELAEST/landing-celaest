"use client";

import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface MagneticCardProps {
  children: React.ReactNode;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  className?: string;
}

/**
 * Card component with a magnetic glow effect that follows the cursor.
 * Reusable across any section needing interactive hover illumination.
 */
export function MagneticCard({
  children,
  onHoverStart,
  onHoverEnd,
  className = "",
}: MagneticCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className={`group relative rounded-3xl border border-white/5 bg-brand-surface-alt/80 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-500 hover:border-white/10 hover:bg-brand-gray hover:-translate-y-1 ${className}`}
    >
      {/* Magnetic Glow Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              rgba(34, 211, 238, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
