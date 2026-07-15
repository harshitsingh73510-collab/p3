"use client";

import { useEffect, useRef } from "react";
import Reveal from "@/components/Reveal";
import ChapterMark from "./ChapterMark";

/**
 * Chapter 03 — The Bottle.
 *
 * The object of desire. Everything here exists to make one thing look like it
 * costs twenty thousand dollars: a shaft of light, a glow, a slow orbit, and
 * type that gets out of the way. No frame, no card — a vitrine in the dark.
 */
export default function Bottle() {
  const wrap = useRef<HTMLDivElement>(null);
  const glass = useRef<HTMLDivElement>(null);

  // the object drifts a little against the pointer — weightless, suspended
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    const onMove = (e: PointerEvent) => {
      const r = wrap.current?.getBoundingClientRect();
      if (!r) return;
      tx = ((e.clientX - (r.left + r.width / 2)) / r.width) * 18;
      ty = ((e.clientY - (r.top + r.height / 2)) / r.height) * 14;
    };
    const loop = () => {
      cx += (tx - cx) * 0.045;
      cy += (ty - cy) * 0.045;
      if (glass.current) {
        // A standing bottle reads as shelf product. Tilted, it reads as an
        // object caught mid-air — the whole difference between a catalogue and
        // a exhibition. The pointer only perturbs that resting angle.
        glass.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) rotateY(${cx * 0.32}deg) rotateX(${-cy * 0.3}deg) rotateZ(${-13 + cx * 0.12}deg)`;
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
    <section
      id="bottle"
      ref={wrap}
      className="chapter relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-24"
    >
      <div className="absolute left-6 top-24 md:left-12">
        <ChapterMark index="03" title="The Bottle" />
      </div>

      {/* the artifact */}
      <Reveal className="relative z-[2]" style={{ perspective: "1200px" }}>
        {/* The house name, monumental and CROPPED by the frame. It is anchored
            to the OBJECT, not the section, so the bottle always cuts through
            the middle of the word — that intersection is the whole composition.
            At near-zero opacity it was just wasted space; it has to be read. */}
        <span
          aria-hidden
          className="display pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap"
          style={{
            fontSize: "clamp(7rem, 31vw, 27rem)",
            color: "rgba(247,245,240,0.085)",
            letterSpacing: "0.02em",
          }}
        >
          NOIR
        </span>

        {/* the glow the glass throws back into the room */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[62vmin] w-[62vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(232,207,159,0.14), rgba(232,207,159,0.04) 45%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        <div
          ref={glass}
          className="relative z-[2] w-[min(74vw,420px)]"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
            // resting angle, so touch devices (where the pointer loop never
            // runs) still get the object mid-air rather than stood up straight
            transform: "rotateZ(-13deg)",
          }}
        >
          {/* Video is gone: its compressed black never sat cleanly in the void,
              and the orbit added motion the object didn't need. A still, blended
              into the dark and feathered to nothing, reads as a real object
              floating — no frame, no box, no edge. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/bottle-still.webp"
            alt="The NOIR bottle"
            className="h-auto w-full"
            style={{
              mixBlendMode: "screen",
              maskImage:
                "radial-gradient(ellipse 66% 62% at 50% 46%, #000 40%, rgba(0,0,0,0.55) 64%, transparent 84%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 66% 62% at 50% 46%, #000 40%, rgba(0,0,0,0.55) 64%, transparent 84%)",
            }}
          />
          {/* No pool of light beneath it any more: it stands in nothing. The
              object is suspended, so anything implying a surface undoes the
              one thing the brief insists on — that it floats. */}
        </div>
      </Reveal>

      {/* the words defer to the object */}
      <Reveal delay={200} className="relative z-[2] mt-16 max-w-xl text-center">
        <p
          className="display text-ivory"
          style={{ fontSize: "clamp(1.7rem, 3.6vw, 2.9rem)" }}
          data-text
        >
          An object <em style={{ color: "var(--champagne)" }}>worthy</em> of the
          memory it holds.
        </p>
        <p className="lede mx-auto mt-7 max-w-md" style={{ fontSize: "0.95rem" }}>
          Hand-blown. Weighted like a stone from a riverbed. Never placed on a
          surface — suspended, turning, catching what little light there is.
          Every imperfection deliberate. Nothing printed. Everything earned.
        </p>
      </Reveal>

      <Reveal delay={340} className="relative z-[2] mt-16">
        <div className="flex flex-wrap items-start justify-center gap-x-16 gap-y-8">
          {[
            ["Glass", "Hand-blown, Murano"],
            ["Weight", "412 grams"],
            ["Edition", "Numbered, 100"],
          ].map(([k, v]) => (
            <div key={k} className="text-center">
              <p className="eyebrow mb-3">{k}</p>
              <p className="text-sm" style={{ color: "var(--ivory-dim)" }}>
                {v}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
