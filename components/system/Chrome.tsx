"use client";

import { useEffect, useRef } from "react";

/**
 * The lightest possible chrome. No navigation bar. A wordmark that fades in
 * once you leave the First Breath, and a thin champagne thread on the right
 * edge tracking your descent through the film.
 */
export default function Chrome() {
  const mark = useRef<HTMLDivElement>(null);
  const thread = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const p = max > 0 ? doc.scrollTop / max : 0;
        if (mark.current) {
          const past = doc.scrollTop > window.innerHeight * 0.7;
          mark.current.style.opacity = past ? "1" : "0";
          mark.current.style.transform = past ? "translateY(0)" : "translateY(-6px)";
        }
        if (thread.current) thread.current.style.transform = `scaleY(${p})`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={mark}
        className="fixed left-7 top-7 z-[70] text-sm"
        style={{
          opacity: 0,
          letterSpacing: "0.5em",
          color: "var(--ivory)",
          transition: "opacity 0.8s var(--ease-silk), transform 0.8s var(--ease-silk)",
        }}
      >
        NOIR
      </div>
      <div className="fixed right-0 top-0 z-[70] h-full w-px" style={{ background: "rgba(255,255,255,0.04)" }}>
        <div
          ref={thread}
          className="h-full w-full origin-top"
          style={{ background: "linear-gradient(var(--champagne-soft), var(--champagne))", transform: "scaleY(0)" }}
        />
      </div>
    </>
  );
}
