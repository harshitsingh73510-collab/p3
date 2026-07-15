"use client";

import { useEffect, useState } from "react";

/**
 * The house announces itself. The wordmark resolves out of nothing — letters
 * drawing together as a champagne thread closes beneath them — then the whole
 * curtain lifts and the film begins. Shown once per session.
 */
export default function Preloader() {
  const [phase, setPhase] = useState<"in" | "out" | "gone">("in");

  useEffect(() => {
    if (sessionStorage.getItem("noir-entered")) {
      setPhase("gone");
      return;
    }
    // hold the scroll while the house introduces itself
    document.documentElement.style.overflow = "hidden";
    const t1 = setTimeout(() => setPhase("out"), 1900);
    const t2 = setTimeout(() => {
      setPhase("gone");
      sessionStorage.setItem("noir-entered", "1");
      document.documentElement.style.overflow = "";
    }, 3100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{
        background: "#050505",
        opacity: phase === "out" ? 0 : 1,
        transform: phase === "out" ? "scale(1.06)" : "scale(1)",
        transition:
          "opacity 1.2s var(--ease-silk), transform 1.2s var(--ease-silk)",
        pointerEvents: phase === "out" ? "none" : "auto",
      }}
    >
      <h1 className="noir-mark display m-0" style={{ fontSize: "clamp(2.6rem, 8vw, 5.4rem)" }}>
        NOIR
      </h1>

      <span className="noir-thread mt-6 block h-px" style={{ background: "var(--champagne)" }} />

      <span
        className="noir-sub mt-8 text-[0.56rem] uppercase"
        style={{ letterSpacing: "0.5em", color: "var(--smoke)" }}
      >
        A House of Invisible Luxury
      </span>

      <style>{`
        .noir-mark {
          color: var(--ivory);
          letter-spacing: 1.1em;
          text-indent: 1.1em;
          opacity: 0;
          animation: noir-mark-in 1.9s var(--ease-silk) forwards;
        }
        @keyframes noir-mark-in {
          0%   { opacity: 0; letter-spacing: 1.1em; text-indent: 1.1em; filter: blur(7px); }
          100% { opacity: 1; letter-spacing: 0.34em; text-indent: 0.34em; filter: blur(0); }
        }
        .noir-thread { width: 0; animation: noir-thread-in 1.9s var(--ease-silk) 0.15s forwards; }
        @keyframes noir-thread-in { to { width: min(46vw, 320px); } }
        .noir-sub { opacity: 0; animation: noir-sub-in 1.2s var(--ease-silk) 1s forwards; }
        @keyframes noir-sub-in { to { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) {
          .noir-mark { opacity: 1; letter-spacing: 0.34em; text-indent: 0.34em; animation: none; filter: none; }
          .noir-thread { width: min(46vw, 320px); animation: none; }
          .noir-sub { opacity: 1; animation: none; }
        }
      `}</style>
    </div>
  );
}
