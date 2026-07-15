"use client";

import Reveal from "@/components/Reveal";
import ChapterMark from "./ChapterMark";
import { INGREDIENTS } from "@/lib/chapters";
import { useState } from "react";

/**
 * Chapter 02 — The Art of Extraction.
 * Ingredients drift through space as sculptures of type. Hovering one draws it
 * forward and lets the others recede — matter separating, not a grid selecting.
 */
export default function Extraction() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="extraction" className="chapter mx-auto max-w-6xl px-6 py-24">
      <ChapterMark index="02" title="The Art of Extraction" />

      <Reveal>
        <p
          className="display text-ivory"
          style={{ fontSize: "clamp(2.4rem, 6.4vw, 6rem)", maxWidth: "20ch" }}
          data-text
        >
          Every memory begins as something{" "}
          <em className="accent">rare.</em>
        </p>
      </Reveal>

      <div className="mt-16 grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-center">
        {/* the matter itself, suspended — no frame, blended into the void */}
        <Reveal className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/ingredients.webp"
            alt="Rose, oud, amber, vanilla and sandalwood suspended in the dark"
            className="noir-breathe h-auto w-full"
            style={{
              mixBlendMode: "screen",
              maskImage:
                "radial-gradient(ellipse 70% 66% at 50% 50%, #000 42%, rgba(0,0,0,0.5) 68%, transparent 86%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 66% at 50% 50%, #000 42%, rgba(0,0,0,0.5) 68%, transparent 86%)",
            }}
          />
        </Reveal>

      <div className="flex flex-col">
        {INGREDIENTS.map((ing, i) => {
          const dim = active !== null && active !== i;
          return (
            <div
              key={ing.name}
              data-hover
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="group relative border-t py-10 transition-all duration-700"
              style={{
                borderColor: "rgba(227,196,137,0.26)",
                opacity: dim ? 0.32 : 1,
                paddingLeft: active === i ? "2.2rem" : "0",
                transitionTimingFunction: "var(--ease-silk)",
              }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h3
                  className="display text-ivory"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.6rem)" }}
                  data-text
                >
                  {ing.name}
                </h3>
                <span className="eyebrow">{ing.origin}</span>
              </div>
              <p
                className="lede mt-4 max-w-xl overflow-hidden transition-all duration-700"
                style={{
                  maxHeight: active === i ? "4rem" : "0",
                  opacity: active === i ? 1 : 0,
                  transitionTimingFunction: "var(--ease-silk)",
                }}
              >
                {ing.line}
              </p>
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
}
