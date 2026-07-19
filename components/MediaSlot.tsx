"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cinematic media frame. When no source exists yet it renders an intentional,
 * museum-labelled placeholder — a lit vitrine in the dark — so an unfinished
 * gallery still reads as composed, never broken. Slow parallax on scroll.
 */
export default function MediaSlot({
  src,
  poster,
  label,
  caption,
  ratio = "3 / 4",
  video = false,
  className = "",
}: {
  src?: string;
  poster?: string;
  label: string;
  caption?: string;
  ratio?: string;
  video?: boolean;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;

    let raf = 0;
    let done = false;
    // Scroll parallax is a textbook prefers-reduced-motion trigger (WCAG
    // 2.3.3). The visibility measurement below still has to run either way —
    // it decides whether the image is shown at all — only the translateY term
    // is suppressed.
    const noMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Visibility is decided by measuring, NOT by IntersectionObserver.
    // An observer that never fires leaves the image clipped to nothing and the
    // gallery looks empty — a reveal animation must never be load-bearing for
    // whether content exists. We already run a scroll handler for parallax, so
    // the rect is free: use it to decide `shown` too.
    const measure = () => {
      if (!inner.current || !el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;

      if (!done && r.top < vh * 0.92 && r.bottom > 0) {
        done = true;
        setShown(true);
      }

      if (noMotion) {
        inner.current.style.transform = "none";
        return;
      }
      const mid = r.top + r.height / 2 - vh / 2;
      inner.current.style.transform = `translateY(${(mid / vh) * -22}px) scale(1.03)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    measure();
    // catch first paint / late layout (fonts, images settling)
    const t = setTimeout(measure, 400);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <figure
      ref={wrap}
      className={`noir-sheen relative m-0 overflow-hidden ${shown ? "is-in" : ""} ${className}`}
      style={{
        aspectRatio: ratio,
        // NO clip-path reveal. It was gating whether the image existed on an
        // observer firing, and when that failed the gallery just showed empty
        // holes. Decoration must never be load-bearing for content. The image
        // is always here; the sheen and parallax are the enhancement.
        border: "1px solid rgba(227,196,137,0.28)",
        background: "linear-gradient(160deg, #0c0c0f, #060607)",
      }}
    >
      <div ref={inner} className="absolute inset-0" style={{ transition: "transform 0.15s linear" }}>
        {src ? (
          video ? (
            <video
              src={src}
              poster={poster}
              muted
              loop
              autoPlay
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={label}
              className="noir-breathe h-full w-full object-cover"
            />
          )
        ) : (
          <Placeholder label={label} />
        )}
      </div>
      {caption && (
        <figcaption
          className="absolute bottom-4 left-4 right-4 text-[0.62rem]"
          style={{ letterSpacing: "0.28em", color: "var(--smoke)", textTransform: "uppercase" }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* faint lit vitrine */}
      <div
        className="absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(232,207,159,0.09), rgba(232,207,159,0) 70%)",
          filter: "blur(12px)",
        }}
      />
      <span
        className="relative z-10 max-w-[80%] text-center text-[0.6rem]"
        style={{
          letterSpacing: "0.34em",
          color: "var(--smoke)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <span className="absolute left-4 top-4 h-4 w-4 border-l border-t" style={{ borderColor: "rgba(227,196,137,0.5)" }} />
      <span className="absolute bottom-4 right-4 h-4 w-4 border-b border-r" style={{ borderColor: "rgba(227,196,137,0.5)" }} />
    </div>
  );
}
