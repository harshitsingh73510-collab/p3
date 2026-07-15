import Reveal from "@/components/Reveal";

/**
 * Chapter 08 — The Last Memory.
 * The Ether collapses to a single mote (progress ≈ 1). The film ends where it
 * began; the wordmark resolves out of the shine, then an invitation to breathe
 * the first breath again. A perfect loop.
 */
export default function LastMemory() {
  return (
    <section
      id="last-memory"
      className="chapter relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-24 text-center"
    >
      <Reveal>
        <p
          className="display text-ivory"
          style={{ fontSize: "clamp(2.2rem, 5.6vw, 4.8rem)", maxWidth: "22ch" }}
          data-text
        >
          Every particle returns to darkness.
          <br />
          <span style={{ color: "var(--smoke)" }}>
            One remains — where the story began.
          </span>
        </p>
      </Reveal>

      <Reveal delay={200}>
        <span
          className="mx-auto mt-16 block h-1.5 w-1.5 rounded-full"
          style={{
            background: "var(--ivory)",
            boxShadow: "0 0 14px 3px rgba(244,241,234,0.7)",
          }}
        />
      </Reveal>

      <Reveal delay={400} className="mt-40">
        <h2
          className="noir-shine display"
          style={{
            fontSize: "clamp(4rem, 20vw, 15rem)",
            letterSpacing: "0.02em",
          }}
        >
          NOIR
        </h2>
      </Reveal>

      <Reveal delay={600}>
        <p className="mt-10 max-w-sm text-sm" style={{ color: "var(--smoke)" }}>
          A house of invisible luxury.
        </p>
        <a
          href="#first-breath"
          data-hover
          className="mt-10 inline-block text-[0.66rem] uppercase"
          style={{ letterSpacing: "0.42em", color: "var(--ivory-dim)" }}
        >
          Breathe again
        </a>
      </Reveal>

      <footer
        className="mt-20 flex w-full max-w-6xl items-center justify-between border-t pt-8 text-[0.6rem] uppercase"
        style={{
          borderColor: "rgba(227,196,137,0.24)",
          letterSpacing: "0.3em",
          color: "var(--smoke)",
        }}
      >
        <span>NOIR — Grasse · Paris</span>
        <span>Private enquiries by invitation</span>
      </footer>

      <style>{`
        .noir-shine {
          color: transparent;
          background: linear-gradient(100deg,
            var(--smoke-dim) 0%,
            var(--ivory) 42%,
            var(--champagne-soft) 50%,
            var(--ivory) 58%,
            var(--smoke-dim) 100%);
          background-size: 260% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          animation: noir-shine 7s var(--ease-silk) infinite;
        }
        @keyframes noir-shine { 0% { background-position: 130% 0; } 100% { background-position: -130% 0; } }
        @media (prefers-reduced-motion: reduce) {
          .noir-shine { animation: none; background-position: 50% 0; }
        }
      `}</style>
    </section>
  );
}
