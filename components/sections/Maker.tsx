import Reveal from "@/components/Reveal";
import ChapterMark from "./ChapterMark";
import MediaSlot from "@/components/MediaSlot";

/**
 * Chapter 04 — The Maker.
 * No "About Us". A slow documentary: hands, glass, oil, light. Close-ups that
 * imply a lifetime of patience. The copy stays out of the way.
 */
export default function Maker() {
  return (
    <section id="maker" className="chapter mx-auto max-w-6xl px-6 py-24">
      <ChapterMark index="04" title="The Maker" />

      <Reveal>
        <p
          className="display text-ivory"
          style={{ fontSize: "clamp(2.4rem, 6.4vw, 6rem)", maxWidth: "20ch" }}
          data-text
        >
          Made slowly, by people whose names you will never know.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-12">
        <div className="md:col-span-7">
          <MediaSlot src="/media/maker-hands.webp" label="Hands shaping molten glass" caption="Atelier · Grasse" ratio="16 / 10" />
        </div>
        <div className="flex flex-col justify-end md:col-span-5">
          <Reveal>
            <p className="lede">
              A house measured not in seasons but in decades. The oud rests four
              years before it is touched. The glass is turned by hand until the
              light behaves. We do not rush what memory cannot.
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-4">
          <MediaSlot src="/media/maker-oil.webp" label="Oil droplet falling" caption="Extraction" ratio="3 / 4" />
        </div>
        <div className="md:col-span-4">
          <MediaSlot src="/media/maker-cap.webp" label="Metal cap, polished" caption="Finishing" ratio="3 / 4" />
        </div>
        <div className="md:col-span-4">
          <MediaSlot src="/media/maker-light.webp" label="Light entering the workshop" caption="Dawn" ratio="3 / 4" />
        </div>
      </div>
    </section>
  );
}
