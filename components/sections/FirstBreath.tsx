"use client";

/**
 * Chapter 00 — The First Breath.
 *
 * A poster, not a slide. The type is the architecture: four lines of Didone
 * set enormous and tight, anchored left so the composition is designed rather
 * than defaulted — and staged off-centre so the bottle behind is finally
 * allowed to be seen. All the emotional weight lands on one italic word.
 */
export default function FirstBreath() {
  return (
    <section
      id="first-breath"
      className="relative flex h-[100svh] w-full flex-col justify-between px-6 py-10 md:px-12 md:py-12"
    >
      {/* the house, whispered */}
      <div className="noir-line flex items-center gap-4" style={{ animationDelay: "0.4s" }}>
        <span className="eyebrow">Grasse</span>
        <span className="h-px w-10" style={{ background: "rgba(227,196,137,0.4)" }} />
        <span className="eyebrow">A House of Invisible Luxury</span>
      </div>

      {/* the statement */}
      <h1
        className="display-xl relative max-w-[15ch] text-ivory"
        style={{ fontSize: "clamp(2.9rem, 8vw, 8.2rem)" }}
        data-text
      >
        <span className="noir-line block" style={{ animationDelay: "0.8s" }}>
          Some fragrances
        </span>
        <span className="noir-line block" style={{ animationDelay: "1.05s" }}>
          are remembered.
        </span>
        <span
          className="noir-line block"
          style={{ animationDelay: "1.6s", color: "var(--ivory-dim)" }}
        >
          Others become
        </span>
        <span
          className="noir-line block"
          style={{ animationDelay: "1.85s", color: "var(--ivory-dim)" }}
        >
          part of{" "}
          <em className="noir-glow" style={{ color: "var(--champagne)" }}>
            you
          </em>
          .
        </span>
      </h1>

      {/* the invitation */}
      <div className="flex items-end justify-between">
        <a
          href="#memory"
          data-hover
          className="noir-line flex items-center gap-5"
          style={{ animationDelay: "2.5s" }}
        >
          <span
            className="relative block h-14 w-px overflow-hidden"
            style={{ background: "rgba(227,196,137,0.22)" }}
          >
            <span
              className="noir-drop absolute left-0 top-0 h-4 w-px"
              style={{ background: "var(--champagne)" }}
            />
          </span>
          <span
            className="text-[0.64rem] uppercase"
            style={{ letterSpacing: "0.46em", color: "var(--ivory-dim)" }}
          >
            Enter the Collection
          </span>
        </a>

        <span
          className="noir-line hidden text-right text-[0.6rem] uppercase md:block"
          style={{
            animationDelay: "2.7s",
            letterSpacing: "0.42em",
            color: "var(--smoke)",
          }}
        >
          I — The First Breath
        </span>
      </div>

      <style>{`
        /* Each line lifts out of the dark on its own beat. That stagger is the
           difference between "text appeared" and "someone spoke". */
        .noir-line {
          opacity: 0;
          transform: translateY(26px);
          filter: blur(6px);
          animation: noir-line-in 1.6s var(--ease-silk) forwards;
        }
        @keyframes noir-line-in {
          to { opacity: 1; transform: none; filter: blur(0); }
        }
        .noir-glow {
          text-shadow: 0 0 42px rgba(227,196,137,0.55), 0 0 90px rgba(227,196,137,0.25);
        }
        .noir-drop { animation: noir-drop 2.6s var(--ease-drift) infinite; }
        @keyframes noir-drop {
          0%   { transform: translateY(-16px); opacity: 0; }
          40%  { opacity: 1; }
          100% { transform: translateY(56px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .noir-line { opacity: 1; transform: none; filter: none; animation: none; }
          .noir-drop { animation: none; }
        }
      `}</style>
    </section>
  );
}
