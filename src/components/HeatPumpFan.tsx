"use client";

import { motion } from "framer-motion";

type HeatPumpFanProps = {
  className?: string;
  /** Seconds per full rotation — lower = faster spin. */
  duration?: number;
};

const BLADE_ANGLES = [0, 60, 120, 180, 240, 300];

/**
 * A large decorative steel condenser-unit fan, spinning continuously.
 * Pure SVG + one animated <g> transform (framer-motion), no image asset —
 * built to actually feel alive (continuous linear spin, like a real fan
 * idling) rather than approximated with a static photo.
 */
export function HeatPumpFan({ className, duration = 4 }: HeatPumpFanProps) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="fan-hub-gradient" cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#e8edf3" />
          <stop offset="55%" stopColor="#aab4c2" />
          <stop offset="100%" stopColor="#5b6472" />
        </radialGradient>
        <linearGradient id="fan-blade-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#eef2f6" />
          <stop offset="45%" stopColor="#b7c0cc" />
          <stop offset="100%" stopColor="#6b7480" />
        </linearGradient>
        <radialGradient id="fan-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-blue-soft)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-blue-soft)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft ambient glow behind the whole assembly, suggests airflow/energy */}
      <circle cx="200" cy="200" r="190" fill="url(#fan-glow)" />

      {/* Outer safety guard ring, like a real condenser fan cage */}
      <circle
        cx="200"
        cy="200"
        r="178"
        fill="none"
        stroke="#8a93a0"
        strokeOpacity="0.55"
        strokeWidth="3"
      />
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * 360;
        return (
          <line
            key={i}
            x1="200"
            y1="200"
            x2={200 + 178 * Math.cos((angle * Math.PI) / 180)}
            y2={200 + 178 * Math.sin((angle * Math.PI) / 180)}
            stroke="#8a93a0"
            strokeOpacity="0.22"
            strokeWidth="1.5"
          />
        );
      })}

      {/* The spinning assembly: hub + blades */}
      <motion.g
        style={{ transformOrigin: "200px 200px" }}
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {BLADE_ANGLES.map((angle) => (
          <path
            key={angle}
            d="M200,200 C230,178 275,172 315,188 C325,192 325,208 315,212 C275,228 230,222 200,200 Z"
            fill="url(#fan-blade-gradient)"
            stroke="#4b5460"
            strokeWidth="1"
            transform={`rotate(${angle} 200 200)`}
          />
        ))}
        <circle
          cx="200"
          cy="200"
          r="46"
          fill="url(#fan-hub-gradient)"
          stroke="#4b5460"
          strokeWidth="1.5"
        />
        <circle cx="200" cy="200" r="10" fill="#4b5460" />
      </motion.g>
    </svg>
  );
}
