"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/**
 * The lightest possible chrome. Still no navigation BAR — but the new pages
 * (/shop, /about, /contact) have to be reachable without scrolling the entire
 * film to the footer. So: three small letterspaced words in the top-right
 * corner, fading in once the First Breath has spoken, never touching the hero
 * composition itself. Plus the wordmark that appears once you leave the hero,
 * and the champagne thread tracking your descent.
 */
export default function Chrome() {
  const mark = useRef<HTMLDivElement>(null);
  const thread = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const p = max > 0 ? doc.scrollTop / max : 0;
        if (mark.current) {
          const past = doc.scrollTop > window.innerHeight * 0.7;
          mark.current.style.opacity = past ? "1" : "0";
          mark.current.style.transform = past ? "translateY(0)" : "translateY(-6px)";
        }
        if (thread.current) thread.current.style.transform = `scaleY(${p})`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const nav: { href: string; label: string }[] = [
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* wordmark — appears once past the hero, top-left */}
      <div
        ref={mark}
        className="fixed left-7 top-7 z-[70] text-sm"
        style={{
          opacity: 0,
          letterSpacing: "0.5em",
          color: "var(--ivory)",
          transition: "opacity 0.8s var(--ease-silk), transform 0.8s var(--ease-silk)",
        }}
      >
        NOIR
      </div>

      {/* wayfinding — top-right, always present so the new pages are reachable
          from the very first screen without scrolling the film to the footer.
          Small, letterspaced, smoke-grey: discoverable, never loud. */}
      <nav
        aria-label="Site"
        className="fixed right-7 top-7 z-[70] flex items-center gap-7 md:right-10"
      >
        {nav.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            data-hover
            className="noir-nav-link text-[0.6rem] uppercase"
            style={{ letterSpacing: "0.34em", color: "var(--smoke)" }}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      {/* descent thread — right edge */}
      <div className="fixed right-0 top-0 z-[70] h-full w-px" style={{ background: "rgba(255,255,255,0.04)" }}>
        <div
          ref={thread}
          className="h-full w-full origin-top"
          style={{ background: "linear-gradient(var(--champagne-soft), var(--champagne))", transform: "scaleY(0)" }}
        />
      </div>

      <style>{`
        .noir-nav-link { transition: color 0.5s var(--ease-silk); }
        .noir-nav-link:hover { color: var(--champagne); }
      `}</style>
    </>
  );
}
