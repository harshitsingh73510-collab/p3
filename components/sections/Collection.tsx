import Link from "next/link";
import Reveal from "@/components/Reveal";
import ChapterMark from "./ChapterMark";
import { FRAGRANCES } from "@/lib/chapters";

const ROOM_TINT: Record<string, string> = {
  rain: "radial-gradient(80% 70% at 25% 30%, rgba(110,140,185,0.14), transparent 65%)",
  forest: "radial-gradient(80% 70% at 75% 35%, rgba(140,165,115,0.13), transparent 65%)",
  fire: "radial-gradient(80% 70% at 50% 75%, rgba(205,135,70,0.16), transparent 65%)",
  dusk: "radial-gradient(80% 70% at 50% 50%, rgba(180,150,120,0.12), transparent 65%)",
};

/**
 * Chapter 05 — The Collection.
 * Not cards. Each fragrance is a room that fills the frame, with its own light.
 * Scrolling is walking from one room into the next.
 */
export default function Collection() {
  return (
    <section id="collection" className="chapter">
      <div className="mx-auto max-w-6xl px-6 pt-24">
        <ChapterMark index="05" title="The Collection" />
        <Reveal>
          <p
            className="display text-ivory"
            style={{ fontSize: "clamp(2.4rem, 6.4vw, 6rem)", maxWidth: "16ch" }}
            data-text
          >
            Three rooms. Three memories. One house.
          </p>
        </Reveal>
      </div>

      {FRAGRANCES.map((f) => (
        <div
          key={f.slug}
          className="relative flex min-h-[100svh] items-center overflow-hidden"
        >
          {/* You are standing in the room. Let it be a room. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={f.image}
            alt=""
            aria-hidden
            className="noir-breathe pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: ROOM_TINT[f.atmosphere] }}
          />
          {/* a scrim only where words must live — the rest stays lit */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, rgba(5,5,5,0.94) 0%, rgba(5,5,5,0.78) 32%, rgba(5,5,5,0.28) 62%, rgba(5,5,5,0.05) 100%)",
            }}
          />
          {/* the void still owns the seams between rooms */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, #050505 0%, rgba(5,5,5,0) 18%, rgba(5,5,5,0) 82%, #050505 100%)",
            }}
          />
          <div className="relative z-[2] mx-auto flex w-full max-w-6xl flex-col px-6">
            <span
              className="display select-none"
              style={{
                fontSize: "clamp(1rem, 2vw, 1.4rem)",
                letterSpacing: "0.5em",
                color: "var(--smoke)",
              }}
            >
              {f.index}
            </span>
            <Reveal>
              <h3
                className="display my-6 text-ivory"
                style={{ fontSize: "clamp(3.6rem, 13vw, 11rem)" }}
                data-text
              >
                {f.name}
              </h3>
            </Reveal>
            <Reveal delay={120}>
              <p className="lede max-w-lg" style={{ fontSize: "1.15rem" }}>
                {f.memory}
              </p>
              <p className="mt-4 max-w-lg text-sm" style={{ color: "var(--smoke)" }}>
                {f.note}
              </p>
              <Link
                href={`/work/${f.slug}`}
                data-hover
                className="mt-12 inline-flex items-center gap-4"
              >
                <span
                  className="text-[0.68rem] uppercase"
                  style={{ letterSpacing: "0.4em", color: "var(--ivory-dim)" }}
                >
                  Enter the room
                </span>
                <span style={{ color: "var(--champagne)" }}>→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      ))}
    </section>
  );
}
