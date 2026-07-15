import Reveal from "@/components/Reveal";
import ChapterMark from "./ChapterMark";

/**
 * Chapter 07 — Time.
 * The light in the void has been drifting the whole way down (the Ether's
 * temperature). Here we name it, quietly: the same scent, four times of day.
 */
const HOURS = [
  { t: "Morning", line: "It arrives cool, almost shy." },
  { t: "Golden hour", line: "It opens. It becomes generous." },
  { t: "Blue hour", line: "It turns inward. It remembers." },
  { t: "Midnight", line: "Only the last note stays. It is enough." },
];

export default function Time() {
  return (
    <section id="time" className="chapter relative py-24">
      {/* The chapter is about light, so the light is the chapter. One frame
          holding morning and dusk at once — warm where it lands, cold where it
          doesn't. It bleeds edge to edge and dissolves into the void. */}
      <div className="pointer-events-none relative mb-24 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/media/time-light.webp"
          alt="A shaft of light crossing an empty room"
          className="noir-breathe h-[52vh] w-full object-cover"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent, #000 22%, #000 72%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, #000 22%, #000 72%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #050505 0%, rgba(5,5,5,0.1) 28%, rgba(5,5,5,0.1) 72%, #050505 100%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-5xl px-6">
      <ChapterMark index="07" title="Time" />

      <Reveal>
        <p
          className="display text-ivory"
          style={{ fontSize: "clamp(2.5rem, 6.6vw, 6.2rem)", maxWidth: "16ch" }}
          data-text
        >
          You never noticed the light change.
          <span style={{ color: "var(--smoke)" }}>
            {" "}
            That was <em style={{ color: "var(--champagne)" }}>the point.</em>
          </span>
        </p>
      </Reveal>

      <div className="mt-20 flex flex-col gap-16">
        {HOURS.map((h, i) => (
          <Reveal key={h.t} delay={i * 60}>
            <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:gap-14">
              <span
                className="eyebrow shrink-0 md:w-48"
                style={{ color: "var(--champagne)" }}
              >
                {h.t}
              </span>
              <p
                className="display text-ivory"
                style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.8rem)", maxWidth: "20ch" }}
                data-text
              >
                {h.line}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
      </div>
    </section>
  );
}
