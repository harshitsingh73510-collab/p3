"use client";

/**
 * Film grain + vignette. Nothing exists unless illuminated — so we darken the
 * edges of the frame and let a faint grain sit over everything, the way light
 * behaves on real film. Fixed, non-interactive, cheap.
 */
export default function Grain() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
      {/* Vignette lives in the WebGL composer only. Stacking a CSS one on top
          of it multiplied the darkening and crushed every edge into mud. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 110% at 50% 42%, transparent 72%, rgba(0,0,0,0.28) 100%)",
        }}
      />
      {/* grain */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.05]">
        <filter id="noir-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noir-grain)" />
      </svg>
    </div>
  );
}
