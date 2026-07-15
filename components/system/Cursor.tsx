"use client";

import { useEffect, useRef } from "react";

/**
 * A tiny glowing orb moving through air. It lags the pointer (inertia), swells
 * over interactive matter, and dims to a hairline over type. No native cursor.
 */
export default function Cursor() {
  const orb = useRef<HTMLDivElement>(null);
  const halo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let ox = x;
    let oy = y;
    let hx = x;
    let hy = y;
    let mode = "idle"; // idle | hover | text
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const el = e.target as HTMLElement | null;
      if (el?.closest("a,button,[data-hover]")) mode = "hover";
      else if (el?.closest("h1,h2,h3,p,[data-text]")) mode = "text";
      else mode = "idle";
    };

    const loop = () => {
      // orb chases fast, halo chases slow — the "air" trail
      ox += (x - ox) * 0.28;
      oy += (y - oy) * 0.28;
      hx += (x - hx) * 0.12;
      hy += (y - hy) * 0.12;

      if (orb.current) {
        const s = mode === "hover" ? 2.4 : mode === "text" ? 0.4 : 1;
        orb.current.style.transform = `translate3d(${ox}px, ${oy}px, 0) translate(-50%, -50%) scale(${s})`;
        orb.current.style.opacity = mode === "text" ? "0.5" : "1";
      }
      if (halo.current) {
        const hs = mode === "hover" ? 2.2 : 1;
        halo.current.style.transform = `translate3d(${hx}px, ${hy}px, 0) translate(-50%, -50%) scale(${hs})`;
        halo.current.style.opacity = mode === "hover" ? "0.9" : "0.5";
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={halo}
        className="absolute left-0 top-0 h-16 w-16 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(232,207,159,0.14), rgba(232,207,159,0) 70%)",
          transition: "opacity 0.6s var(--ease-silk)",
        }}
      />
      <div
        ref={orb}
        className="absolute left-0 top-0 h-2 w-2 rounded-full"
        style={{
          background: "var(--ivory)",
          boxShadow: "0 0 12px 2px rgba(244,241,234,0.65)",
          transition: "opacity 0.4s var(--ease-silk)",
        }}
      />
    </div>
  );
}
