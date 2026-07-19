import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import MediaSlot from "@/components/MediaSlot";
import Cursor from "@/components/system/Cursor";
import Grain from "@/components/system/Grain";
import SubNav from "@/components/system/SubNav";
import {
  FOUNDER,
  ATELIER,
  SOURCING,
  ABOUT_PHILOSOPHY,
  TRUST_NOTE,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "About — NOIR",
  description: "Anouk Verrier and the atelier behind NOIR, in Grasse.",
};

export default function About() {
  return (
    <main
      className="relative min-h-screen"
      style={{
        background:
          "radial-gradient(120% 85% at 50% 18%, #17161c 0%, #0e0d13 34%, #08080b 66%, #050505 100%)",
      }}
    >
      <Grain />
      <Cursor />
      <SubNav active="about" />

      <div className="relative z-[2] mx-auto max-w-5xl px-6">
        {/* opening statement */}
        <section className="flex min-h-[70svh] flex-col justify-center pt-10">
          <Reveal>
            <p className="eyebrow mb-8">About</p>
            <p
              className="display text-ivory"
              style={{ fontSize: "clamp(2.4rem, 6.4vw, 5.6rem)", maxWidth: "16ch" }}
              data-text
            >
              The house was founded on a{" "}
              <em style={{ color: "var(--champagne)" }}>refusal.</em>
            </p>
            <p className="lede mt-8 max-w-lg" style={{ fontSize: "1.1rem" }}>
              Not to advertise what cannot be seen. Every fragrance house
              photographs its bottles under studio light and calls it the
              product. We decided, in {ATELIER.founded}, that the product was
              never the glass.
            </p>
          </Reveal>
        </section>

        {/* the founder */}
        <section className="grid gap-12 py-24 md:grid-cols-2 md:items-center md:gap-16">
          <Reveal>
            <MediaSlot
              src="/media/about-founder.webp"
              label="Anouk Verrier, at the bench"
              caption="Grasse"
              ratio="4 / 5"
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow mb-6" style={{ color: "var(--champagne)" }}>
              {FOUNDER.role}
            </p>
            <p
              className="display text-ivory"
              style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.8rem)" }}
              data-text
            >
              {FOUNDER.name}
            </p>
            <div className="mt-6 flex flex-col gap-4">
              {FOUNDER.bio.map((line) => (
                <p key={line} className="lede">
                  {line}
                </p>
              ))}
            </div>
          </Reveal>
        </section>

        {/* philosophy — three quotable lines, restrained */}
        <section
          className="border-y py-20"
          style={{ borderColor: "rgba(227,196,137,0.2)" }}
        >
          <div className="flex flex-col gap-10">
            {ABOUT_PHILOSOPHY.map((line, i) => (
              <Reveal key={line} delay={i * 100}>
                <p
                  className="display text-ivory"
                  style={{ fontSize: "clamp(1.6rem, 3.6vw, 2.6rem)", maxWidth: "22ch" }}
                  data-text
                >
                  {line}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* sourcing — specific materials, specific origins */}
        <section className="py-24">
          <Reveal>
            <p className="eyebrow mb-4">Sourcing</p>
            <p
              className="display text-ivory"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", maxWidth: "18ch" }}
              data-text
            >
              We buy from four growers. We have never bought from a fifth.
            </p>
          </Reveal>
          <div className="mt-16 flex flex-col">
            {SOURCING.map((s, i) => (
              <Reveal
                key={s.material}
                delay={i * 60}
                className="flex flex-col gap-2 border-t py-8 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                style={{ borderColor: "rgba(227,196,137,0.18)" }}
              >
                <span
                  className="display text-ivory"
                  style={{ fontSize: "clamp(1.3rem, 2.6vw, 1.8rem)" }}
                >
                  {s.material}
                  <span className="ml-3 text-sm" style={{ color: "var(--smoke)" }}>
                    — {s.origin}
                  </span>
                </span>
                <span className="text-sm sm:max-w-xs sm:text-right" style={{ color: "var(--ivory-dim)" }}>
                  {s.note}
                </span>
              </Reveal>
            ))}
          </div>
        </section>

        {/* the atelier — reuse the Maker documentary set, one new frame */}
        <section className="py-24">
          <Reveal>
            <p className="eyebrow mb-4">The Atelier</p>
            <p
              className="display text-ivory"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", maxWidth: "20ch" }}
              data-text
            >
              {ATELIER.location}.
            </p>
            <p className="lede mt-6 max-w-lg">{ATELIER.detail}</p>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-12">
            <div className="md:col-span-5">
              <MediaSlot
                src="/media/about-bench.webp"
                label="Formula notebook and raw materials, weighed"
                caption="The bench"
                ratio="4 / 5"
              />
            </div>
            <div className="md:col-span-7">
              <MediaSlot
                src="/media/maker-hands.webp"
                label="Hands shaping molten glass"
                caption="Atelier · Grasse"
                ratio="16 / 10"
              />
            </div>
          </div>

          <Reveal delay={80}>
            <p
              className="lede mt-12 max-w-lg text-sm"
              style={{ color: "var(--smoke)" }}
            >
              {TRUST_NOTE}
            </p>
          </Reveal>
        </section>

        {/* close */}
        <section className="flex flex-col items-start gap-6 border-t py-24" style={{ borderColor: "rgba(227,196,137,0.2)" }}>
          <Reveal>
            <p
              className="display text-ivory"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", maxWidth: "16ch" }}
              data-text
            >
              If you have a question we have not answered here, ask it.
            </p>
            <Link
              href="/contact"
              data-hover
              className="mt-10 inline-flex items-center gap-4"
            >
              <span
                className="text-[0.66rem] uppercase"
                style={{ letterSpacing: "0.4em", color: "var(--ivory-dim)" }}
              >
                Write to the house
              </span>
              <span style={{ color: "var(--champagne)" }}>→</span>
            </Link>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
