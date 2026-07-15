import Reveal from "@/components/Reveal";
import ChapterMark from "./ChapterMark";
import { FRAGRANCES } from "@/lib/chapters";

/**
 * Chapter 01 — Memory.
 * We never show perfume. Each fragrance is an environment, an emotion. Rain,
 * forest, fire — rendered as atmosphere and words, not product shots.
 */
const TINTS: Record<string, string> = {
  rain: "radial-gradient(60% 50% at 30% 40%, rgba(120,150,190,0.10), transparent 70%)",
  forest: "radial-gradient(60% 50% at 70% 30%, rgba(150,170,120,0.10), transparent 70%)",
  fire: "radial-gradient(60% 50% at 50% 70%, rgba(200,140,80,0.12), transparent 70%)",
  dusk: "radial-gradient(60% 50% at 50% 50%, rgba(180,150,120,0.10), transparent 70%)",
};

export default function Memory() {
  return (
    <section id="memory" className="chapter mx-auto max-w-6xl px-6 py-24">
      <ChapterMark index="01" title="Memory" />

      <Reveal>
        <p
          className="display text-ivory"
          style={{ fontSize: "clamp(2.4rem, 6.4vw, 6rem)", maxWidth: "18ch" }}
          data-text
        >
          You will not find perfume here.
          <span style={{ color: "var(--smoke)" }}>
            {" "}
            Only what it <em style={{ color: "var(--champagne)" }}>leaves behind.</em>
          </span>
        </p>
      </Reveal>

      <div className="mt-20 flex flex-col gap-24">
        {FRAGRANCES.map((f, i) => (
          <div
            key={f.slug}
            className="relative grid items-center gap-10 md:grid-cols-2"
            style={{ direction: i % 2 ? "rtl" : "ltr" }}
          >
            {/* atmospheric field for this memory */}
            <div style={{ direction: "ltr" }}>
              <Reveal
                className="relative flex h-[52vh] items-center justify-center overflow-hidden"
                style={{ border: "1px solid rgba(227,196,137,0.24)" }}
              >
                {/* the memory itself — never the product */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.image}
                  alt=""
                  aria-hidden
                  className="noir-breathe absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: TINTS[f.atmosphere] }} />
                {/* the void only pulls at the corners now — the memory stays lit */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(110% 90% at 50% 50%, transparent 55%, rgba(5,5,5,0.72) 100%)",
                  }}
                />
                <span
                  className="display relative select-none"
                  style={{
                    fontSize: "clamp(4rem, 12vw, 9rem)",
                    color: "rgba(244,241,234,0.14)",
                    mixBlendMode: "overlay",
                  }}
                >
                  {f.index}
                </span>
                <span
                  className="eyebrow absolute bottom-6 left-6"
                  style={{ color: "var(--smoke)" }}
                >
                  {f.atmosphere}
                </span>
              </Reveal>
            </div>

            <div style={{ direction: "ltr" }}>
              <Reveal delay={120}>
                <p className="eyebrow mb-6" style={{ color: "var(--champagne)" }}>
                  {f.name}
                </p>
                <p
                  className="display mb-8 text-ivory"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", maxWidth: "16ch" }}
                  data-text
                >
                  {f.memory}
                </p>
                <div className="flex flex-wrap gap-x-8 gap-y-2">
                  {f.words.map((w) => (
                    <span
                      key={w}
                      className="text-sm"
                      style={{ color: "var(--ivory-dim)", letterSpacing: "0.06em" }}
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
