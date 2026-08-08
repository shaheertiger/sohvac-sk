"use client";

import { useEffect, useState } from "react";

type SnowfallProps = {
  count?: number;
  className?: string;
};

type Flake = {
  id: number;
  size: number;
  left: number;
  fallDuration: number;
  fallDelay: number;
  swayDuration: number;
  swayDelay: number;
  opacity: number;
};

function generateFlakes(count: number): Flake[] {
  return Array.from({ length: count }, (_, i) => {
    const size = 2 + Math.random() * 4.5;
    return {
      id: i,
      size,
      left: Math.random() * 100,
      fallDuration: 11 + Math.random() * 13,
      fallDelay: -(Math.random() * 20),
      swayDuration: 3.5 + Math.random() * 3,
      swayDelay: -(Math.random() * 6),
      opacity: 0.25 + Math.random() * 0.55,
    };
  });
}

/**
 * Subtle, premium snowfall — a handful of soft drifting flakes, not a
 * blizzard. Pure CSS animation (no canvas/JS ticking) so it's cheap to
 * render. Flakes are generated client-side only, after mount — doing it
 * during render would make server and client output diverge (Math.random)
 * and trigger a hydration mismatch.
 */
export function Snowfall({ count = 42, className }: SnowfallProps) {
  const [flakes, setFlakes] = useState<Flake[] | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: see comment above, avoids SSR/client hydration mismatch from Math.random()
    setFlakes(generateFlakes(count));
  }, [count]);

  if (!flakes) return null;

  return (
    <div className={`snowfield ${className ?? ""}`} aria-hidden="true">
      {flakes.map((f) => (
        <span
          key={f.id}
          className="snowflake"
          style={{
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            animationDuration: `${f.fallDuration}s`,
            animationDelay: `${f.fallDelay}s`,
          }}
        >
          <span
            style={{
              animationDuration: `${f.swayDuration}s`,
              animationDelay: `${f.swayDelay}s`,
            }}
          />
        </span>
      ))}
    </div>
  );
}
