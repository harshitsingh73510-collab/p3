"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useMemo } from "react";
import EtherField from "./EtherField";

/**
 * The Ether canvas. Transparent so the CSS void + vignette show through.
 * Particle count scales with device so mid-range hardware still breathes.
 *
 * Bloom is what turns 6000 flat points into motes of light hanging in air —
 * it is the single largest contributor to the "expensive" feel, so it stays on
 * everywhere except low-power devices, where the field thins out instead.
 */
export default function EtherCanvas() {
  const { count, rich } = useMemo(() => {
    if (typeof window === "undefined") return { count: 5200, rich: true };
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.innerWidth < 820;
    if (coarse || small) return { count: 2600, rich: false };
    const cores = navigator.hardwareConcurrency || 4;
    return { count: cores >= 8 ? 7200 : 4800, rich: cores >= 4 };
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6.8], fov: 42 }}
      style={{ width: "100%", height: "100%" }}
    >
      <EtherField count={count} />
      {rich && (
        <EffectComposer multisampling={0}>
          {/* light blooms off the motes the way it does off real dust */}
          <Bloom
            intensity={1.75}
            luminanceThreshold={0.05}
            luminanceSmoothing={0.9}
            mipmapBlur
            radius={0.8}
          />
          {/* the void reclaims the frame's edges — gently. The CSS layer used
              to stack a second vignette on this; together they made mud. */}
          <Vignette eskil={false} offset={0.42} darkness={0.5} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
