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
      {/* No image here. This chapter is about light you never notice changing —
          so it stays pure type over the Ether, whose colour temperature is
          already drifting morning -> midnight beneath the words. */}
      <div className="mx-auto max-w-5xl px-6 pt-16">
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
