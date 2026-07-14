import { useState } from "react";

// Per-section color ACCENT only. The page-wide moving background now lives
// in AnimatedBackground.jsx (mounted once, near the app root) — this
// component used to also paint a flat full-page base tone, but that sat on
// top of the moving background and hid it, so it's been removed. This just
// adds a quiet local tint + grain over whatever's behind it.
const PALETTES = {
  violet: { light: "#c084fc", dark: "#8b5cf6" },
  cyan: { light: "#7dd3fc", dark: "#22d3ee" },
  rose: { light: "#fbcfe8", dark: "#fb7185" },
  amber: { light: "#fde68a", dark: "#fbbf24" },
  slate: { light: "#a5b4fc", dark: "#6366f1" },
};

const FADE_MASK =
  "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)";

export default function SectionGlow({ variant = "violet", position = "50% 35%" }) {
  const p = PALETTES[variant] || PALETTES.violet;
  const [uid] = useState(() => `${variant}-${Math.random().toString(36).slice(2, 9)}`);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* light mode accent */}
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          background: `radial-gradient(55% 45% at ${position}, ${p.light} 0%, transparent 70%)`,
          opacity: 0.35,
          maskImage: FADE_MASK,
          WebkitMaskImage: FADE_MASK,
        }}
      />

      {/* dark mode accent — dialed down, ambient */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background: `radial-gradient(55% 45% at ${position}, ${p.dark} 0%, transparent 70%)`,
          opacity: 0.09,
          maskImage: FADE_MASK,
          WebkitMaskImage: FADE_MASK,
        }}
      />

      {/* faint grain so the glow reads as texture, not a flat gradient */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02] dark:opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <filter id={`grain-${uid}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${uid})`} />
      </svg>
    </div>
  );
}