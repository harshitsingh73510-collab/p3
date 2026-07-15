"use client";

import dynamic from "next/dynamic";
import { Component, ReactNode, useEffect, useState } from "react";

const EtherCanvas = dynamic(() => import("./EtherCanvas"), { ssr: false });

/** A GL failure must degrade to the quiet void, never a white screen. */
class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function webglOk() {
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl2") || c.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * The Ether — the one persistent particle field behind the entire film.
 * Fixed, full-screen, pointer-transparent. Everything else floats above it.
 */
export default function Ether() {
  const [mount, setMount] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(r);
    setMount(!r && webglOk());
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0"
      style={{
        // Not flat black. A dark room still has tone in it — warmth where the
        // light falls, cold in the corners. Flat #050505 everywhere is what
        // reads as "murky" instead of "expensive".
        background:
          "radial-gradient(120% 85% at 50% 38%, #17161c 0%, #0e0d13 34%, #08080b 66%, #050505 100%)",
      }}
    >
      {/* the warm pocket the object lives in */}
      <div
        className="noir-drift-a absolute left-1/2 top-1/2 h-[86vmin] w-[86vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(232,207,159,0.13), rgba(232,207,159,0.03) 46%, rgba(232,207,159,0) 70%)",
          filter: "blur(34px)",
        }}
      />
      {/* a cold counter-light so the warmth has something to be warm against */}
      <div
        className="noir-drift-b absolute left-[22%] top-[62%] h-[54vmin] w-[54vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(140,170,210,0.09), rgba(140,170,210,0) 68%)",
          filter: "blur(40px)",
        }}
      />
      {/* a violet breath in the far corner — oud, at the edge of perception */}
      <div
        className="noir-drift-c absolute left-[82%] top-[24%] h-[46vmin] w-[46vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(160,130,200,0.075), rgba(160,130,200,0) 68%)",
          filter: "blur(44px)",
        }}
      />
      {mount && (
        <Boundary>
          <EtherCanvas />
        </Boundary>
      )}
      {reduced && (
        // static fallback: faint dust, no motion
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(1px 1px at 20% 30%, rgba(244,241,234,0.5), transparent), radial-gradient(1px 1px at 70% 60%, rgba(244,241,234,0.4), transparent), radial-gradient(1px 1px at 40% 80%, rgba(232,207,159,0.4), transparent), radial-gradient(1px 1px at 85% 20%, rgba(244,241,234,0.35), transparent)",
          }}
        />
      )}
    </div>
  );
}
