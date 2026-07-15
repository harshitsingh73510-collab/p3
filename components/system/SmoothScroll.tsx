"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { stage } from "@/lib/stage";

/**
 * Scrolling isn't navigation — it edits the film. Lenis gives the heavy,
 * gliding feel; we tap its frame to publish global progress to the Stage so
 * the Ether can morph in lockstep with the reader's descent.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduce,
      touchMultiplier: 1.4,
    });

    const publishProgress = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      stage.progress = max > 0 ? doc.scrollTop / max : 0;
    };

    lenis.on("scroll", publishProgress);

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Pointer → Stage (raw). Consumers add their own inertia.
    const onMove = (e: PointerEvent) => {
      stage.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      stage.pointerY = -((e.clientY / window.innerHeight) * 2 - 1);
      stage.fine = e.pointerType === "mouse";
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    publishProgress();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
