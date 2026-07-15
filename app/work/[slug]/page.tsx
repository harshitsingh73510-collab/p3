import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FRAGRANCES } from "@/lib/chapters";
import Reveal from "@/components/Reveal";
import MediaSlot from "@/components/MediaSlot";
import Cursor from "@/components/system/Cursor";
import Grain from "@/components/system/Grain";

export function generateStaticParams() {
  return FRAGRANCES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const f = FRAGRANCES.find((x) => x.slug === slug);
  if (!f) return { title: "NOIR" };
  return {
    title: `${f.name} — NOIR`,
    description: f.memory,
  };
}

const ROOM_TINT: Record<string, string> = {
  rain: "radial-gradient(90% 80% at 30% 20%, rgba(110,140,185,0.16), transparent 60%)",
  forest: "radial-gradient(90% 80% at 70% 25%, rgba(140,165,115,0.15), transparent 60%)",
  fire: "radial-gradient(90% 80% at 50% 70%, rgba(205,135,70,0.18), transparent 60%)",
  dusk: "radial-gradient(90% 80% at 50% 50%, rgba(180,150,120,0.14), transparent 60%)",
};

export default async function Room({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const f = FRAGRANCES.find((x) => x.slug === slug);
  if (!f) notFound();

  return (
    <main
      className="relative min-h-screen"
      style={{
        background:
          "radial-gradient(120% 85% at 50% 30%, #17161c 0%, #0e0d13 34%, #08080b 66%, #050505 100%)",
      }}
    >
      <div className="pointer-events-none fixed inset-0 z-0" style={{ background: ROOM_TINT[f.atmosphere] }} />
      <Grain />
      <Cursor />

      <div className="relative z-[2] mx-auto max-w-5xl px-6">
        {/* return */}
        <Link
          href="/#collection"
          data-hover
          className="mt-10 inline-flex items-center gap-3 text-[0.62rem] uppercase"
          style={{ letterSpacing: "0.36em", color: "var(--smoke)" }}
        >
          <span style={{ color: "var(--champagne)" }}>←</span> The Collection
        </Link>

        {/* title */}
        <section className="flex min-h-[80svh] flex-col justify-center">
          <span
            className="display select-none"
            style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)", letterSpacing: "0.5em", color: "var(--smoke)" }}
          >
            {f.index}
          </span>
          <h1
            className="display my-6 text-ivory"
            style={{ fontSize: "clamp(3.6rem, 14vw, 12rem)" }}
            data-text
          >
            {f.name}
          </h1>
          <p className="lede max-w-xl" style={{ fontSize: "1.2rem" }}>
            {f.memory}
          </p>
        </section>

        {/* the three movements */}
        <section className="grid gap-px border-y py-0 md:grid-cols-3" style={{ borderColor: "rgba(227,196,137,0.26)" }}>
          {f.words.map((w, i) => (
            <Reveal key={w} delay={i * 100} className="py-16 text-center">
              <p className="eyebrow mb-4">{["Top", "Heart", "Base"][i]}</p>
              <p className="display text-ivory" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }} data-text>
                {w}
              </p>
            </Reveal>
          ))}
        </section>

        {/* the note */}
        <section className="py-40 text-center">
          <Reveal>
            <p className="display mx-auto text-ivory" style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)", maxWidth: "20ch" }} data-text>
              {f.note}
            </p>
          </Reveal>
        </section>

        {/* atmosphere film */}
        <section className="grid gap-6 pb-40 md:grid-cols-2">
          <MediaSlot src={f.image} label={`${f.name} — the environment`} caption={`${f.name} · environment`} ratio="4 / 5" />
          <div className="flex flex-col justify-center">
            <Reveal>
              <p className="lede max-w-md">
                This is not a scent you wear. It is a place you return to —
                unannounced, in the middle of an ordinary afternoon, complete.
              </p>
              <Link
                href="/#collection"
                data-hover
                className="mt-12 inline-flex items-center gap-4"
              >
                <span className="text-[0.66rem] uppercase" style={{ letterSpacing: "0.4em", color: "var(--ivory-dim)" }}>
                  Return to the house
                </span>
                <span style={{ color: "var(--champagne)" }}>→</span>
              </Link>
            </Reveal>
          </div>
        </section>
      </div>
    </main>
  );
}
