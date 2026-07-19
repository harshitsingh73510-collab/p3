"use client";

import { useEffect, useRef } from "react";
import Reveal from "@/components/Reveal";
import ChapterMark from "./ChapterMark";

/**
 * Chapter 06 — The Science of Scent.
 * A quiet laboratory. Molecules suspended in glass. As the cursor nears, the
 * constellation reorganizes and the fragrance "builds itself" — one lightweight
 * rAF loop over SVG nodes, no WebGL, so it stays cheap beside the Ether.
 */

type Node = { x: number; y: number; bx: number; by: number; r: number };

export default function Science() {
  const svgRef = useRef<SVGSVGElement>(null);
  const nodes = useRef<Node[]>([]);
  const circles = useRef<SVGCircleElement[]>([]);
  const lines = useRef<SVGLineElement[]>([]);
  const pointer = useRef({ x: -999, y: -999, active: false });

  useEffect(() => {
    const W = 1000;
    const H = 620;
    const N = 26;
    const list: Node[] = [];
    for (let i = 0; i < N; i++) {
      const bx = Math.random() * W;
      const by = Math.random() * H;
      list.push({ x: bx, y: by, bx, by, r: 1.5 + Math.random() * 2.5 });
    }
    nodes.current = list;

    const svg = svgRef.current!;

    // A continuous rAF loop is exactly the motion prefers-reduced-motion asks
    // us to drop. Paint the constellation once, at rest, and stop — no
    // pointer-reorganize animation, no infinite loop.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      list.forEach((n, i) => {
        circles.current[i]?.setAttribute("cx", n.x.toFixed(1));
        circles.current[i]?.setAttribute("cy", n.y.toFixed(1));
      });
      let li = 0;
      for (let a = 0; a < list.length; a++) {
        for (let b = a + 1; b < list.length; b++) {
          const d = Math.hypot(list[a].x - list[b].x, list[a].y - list[b].y);
          const ln = lines.current[li++];
          if (!ln) continue;
          if (d < 150) {
            ln.setAttribute("x1", list[a].x.toFixed(1));
            ln.setAttribute("y1", list[a].y.toFixed(1));
            ln.setAttribute("x2", list[b].x.toFixed(1));
            ln.setAttribute("y2", list[b].y.toFixed(1));
            ln.setAttribute("opacity", (0.38 * (1 - d / 150)).toFixed(3));
          }
        }
      }
      return;
    }

    const move = (e: PointerEvent) => {
      const rect = svg.getBoundingClientRect();
      pointer.current.x = ((e.clientX - rect.left) / rect.width) * W;
      pointer.current.y = ((e.clientY - rect.top) / rect.height) * H;
      pointer.current.active = true;
    };
    const leave = () => (pointer.current.active = false);
    svg.addEventListener("pointermove", move);
    svg.addEventListener("pointerleave", leave);

    let raf = 0;
    const loop = () => {
      const p = pointer.current;
      list.forEach((n, i) => {
        let tx = n.bx;
        let ty = n.by;
        if (p.active) {
          const dx = n.bx - p.x;
          const dy = n.by - p.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < 240) {
            // magnetically reorganize toward a ring around the cursor
            const pull = (1 - d / 240) * 60;
            tx = n.bx - (dx / d) * pull;
            ty = n.by - (dy / d) * pull;
          }
        }
        n.x += (tx - n.x) * 0.06;
        n.y += (ty - n.y) * 0.06;
        const c = circles.current[i];
        if (c) {
          c.setAttribute("cx", n.x.toFixed(1));
          c.setAttribute("cy", n.y.toFixed(1));
        }
      });
      // redraw bonds between near nodes
      let li = 0;
      for (let a = 0; a < list.length; a++) {
        for (let b = a + 1; b < list.length; b++) {
          const dx = list[a].x - list[b].x;
          const dy = list[a].y - list[b].y;
          const d = Math.hypot(dx, dy);
          const ln = lines.current[li++];
          if (!ln) continue;
          if (d < 150) {
            ln.setAttribute("x1", list[a].x.toFixed(1));
            ln.setAttribute("y1", list[a].y.toFixed(1));
            ln.setAttribute("x2", list[b].x.toFixed(1));
            ln.setAttribute("y2", list[b].y.toFixed(1));
            ln.setAttribute("opacity", (0.38 * (1 - d / 150)).toFixed(3));
          } else {
            ln.setAttribute("opacity", "0");
          }
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      svg.removeEventListener("pointermove", move);
      svg.removeEventListener("pointerleave", leave);
    };
  }, []);

  // pre-count possible bonds so we can allocate <line> elements
  const N = 26;
  const maxLines = (N * (N - 1)) / 2;

  return (
    <section id="science" className="chapter mx-auto max-w-6xl px-6 py-24">
      <ChapterMark index="06" title="The Science of Scent" />
      <div className="grid items-center gap-16 md:grid-cols-2">
        <Reveal>
          <p
            className="display text-ivory"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5.4rem)", maxWidth: "14ch" }}
            data-text
          >
            A fragrance is a structure you cannot see.
          </p>
          <p className="lede mt-10 max-w-md">
            Two hundred molecules, held in balance. Move through them and watch
            the composition find itself — the same way it finds you, an hour
            after you thought it had gone.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div
            data-hover
            className="relative overflow-hidden"
            style={{ aspectRatio: "1000 / 620" }}
          >
            {/* The real laboratory sits under the molecules. A bordered empty
                box reads as a broken component; glass and caustics read as a
                place. The border is gone — the frame dissolves into the void. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/laboratory.webp"
              alt="Glass cylinders holding the raw materials"
              className="noir-breathe absolute inset-0 h-full w-full object-cover"
              style={{
                maskImage:
                  "radial-gradient(ellipse 76% 76% at 50% 50%, #000 40%, rgba(0,0,0,0.55) 70%, transparent 92%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 76% 76% at 50% 50%, #000 40%, rgba(0,0,0,0.55) 70%, transparent 92%)",
              }}
            />
            <svg
              ref={svgRef}
              viewBox="0 0 1000 620"
              className="absolute inset-0 h-full w-full"
            >
              {Array.from({ length: maxLines }).map((_, i) => (
                <line
                  key={i}
                  ref={(el) => {
                    if (el) lines.current[i] = el;
                  }}
                  stroke="var(--champagne)"
                  strokeWidth="1"
                  opacity="0"
                />
              ))}
              {Array.from({ length: N }).map((_, i) => (
                <circle
                  key={i}
                  ref={(el) => {
                    if (el) circles.current[i] = el;
                  }}
                  r={2 + (i % 3)}
                  fill={i % 5 === 0 ? "var(--champagne)" : "var(--ivory)"}
                  opacity={i % 5 === 0 ? 1 : 0.8}
                  style={{
                    filter:
                      i % 5 === 0
                        ? "drop-shadow(0 0 5px rgba(227,196,137,0.9))"
                        : "drop-shadow(0 0 4px rgba(247,245,240,0.6))",
                  }}
                />
              ))}
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
