"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { stage } from "@/lib/stage";
import { buildTargets } from "./etherTargets";

/** soft round sprite so every particle is a mote of light, not a square */
function useSprite() {
  return useMemo(() => {
    const s = 64;
    const c = document.createElement("canvas");
    c.width = c.height = s;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.55)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

/**
 * How present the Ether is in each breath (index matches BREATHS).
 * It OWNS the hero, the bottle and the final mote. Everywhere else there is
 * text and imagery to read, so it pulls back to atmosphere. A particle field
 * at full strength behind a paragraph is just noise.
 */
const PRESENCE = [1, 0.4, 0.5, 0.8, 0.3, 0.36, 0.5, 0.44, 1];

// time-of-day tints for Chapter 07 — restrained, applied as a faint multiply
const TEMPS: THREE.Color[] = [
  new THREE.Color("#fdf6ec"), // morning ivory
  new THREE.Color("#f7d9a0"), // golden hour
  new THREE.Color("#9fb2d8"), // blue hour
  new THREE.Color("#6d76a6"), // midnight
];

export default function EtherField({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const group = useRef<THREE.Group>(null);
  const sprite = useSprite();
  const { camera, size } = useThree();

  const built = useMemo(() => buildTargets(count), [count]);

  // live positions (start from the intro dust) + per-particle colors
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(built.introScatter);
    const col = new Float32Array(count * 3);

    // Colour, but precious — every hue is a material this house actually uses:
    // gold, rose, amber, glass, oud-violet, ozone. Never a rainbow.
    const PALETTE: [string, number][] = [
      ["#f4f1ea", 0.3], // ivory
      ["#e8cf9f", 0.2], // champagne gold
      ["#e6b98f", 0.14], // rose gold
      ["#d9a05b", 0.12], // amber
      ["#9fc6d8", 0.1], // ozone / cold glass
      ["#b9a3d6", 0.08], // oud violet
      ["#a8c9a0", 0.06], // green shadow
    ];
    const bag: THREE.Color[] = [];
    PALETTE.forEach(([hex, w]) => {
      const c = new THREE.Color(hex);
      for (let k = 0; k < Math.round(w * 100); k++) bag.push(c);
    });

    for (let i = 0; i < count; i++) {
      const c = bag[Math.floor(Math.random() * bag.length)];
      // Most motes are barely there; a rare few catch the light and burn.
      // Bloom turns that spread into depth instead of a flat sheet of dots.
      const r = Math.random();
      const heat = 0.34 + r * r * r * 2.1;
      col[i * 3] = c.r * heat;
      col[i * 3 + 1] = c.g * heat;
      col[i * 3 + 2] = c.b * heat;
    }
    return { positions: pos, colors: col };
  }, [built, count]);

  // scratch colours so we don't allocate per frame
  const tint = useMemo(() => new THREE.Color("#f4f1ea"), []);
  const white = useMemo(() => new THREE.Color("#ffffff"), []);
  const startTime = useRef<number | null>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (startTime.current === null) startTime.current = t;
    stage.time = t;

    // pointer inertia — the field moves through air, never snaps
    stage.airX += (stage.pointerX - stage.airX) * Math.min(1, delta * 3.2);
    stage.airY += (stage.pointerY - stage.airY) * Math.min(1, delta * 3.2);

    const progress = stage.progress;
    const breaths = built.breaths;
    const N = breaths.length;

    // which two breaths we're morphing between
    const seg = progress * (N - 1);
    const idx = Math.min(N - 2, Math.floor(seg));
    let lt = seg - idx;
    lt = lt * lt * (3 - 2 * lt); // smoothstep — dissolve, don't snap
    const from = breaths[idx];
    const to = breaths[idx + 1];

    // intro assembly: dust -> bottle over the first breaths of the film
    const elapsed = t - (startTime.current ?? t);
    // The bottle must be THERE. A long assembly reads as a slow site, not as
    // drama — the drift and the churn carry the life instead.
    const a0 = Math.min(1, Math.max(0, (elapsed - 0.1) / 0.9));
    const assemble = a0 * a0 * (3 - 2 * a0);
    stage.entered = progress > 0.01 || assemble >= 1;

    const intro = built.introScatter;
    const pos = points.current!.geometry.attributes.position
      .array as Float32Array;

    // The lateral bias exists ONLY for the hero, where it buys the display type
    // room to breathe. The moment you start reading chapters it recentres —
    // off-centre particles behind body copy read as debris, not atmosphere.
    let heroBias = 1 - (progress - 0.008) / 0.05;
    heroBias = heroBias < 0 ? 0 : heroBias > 1 ? 1 : heroBias;
    heroBias = heroBias * heroBias * (3 - 2 * heroBias);
    const offX = size.width >= 1024 ? 1.5 * heroBias : 0;

    // Pointer projected into the field's plane — and then into the group's
    // LOCAL space, because the group is offset. Skip the conversion and the
    // cursor parts the air 1.5 units from where it actually is.
    const px = stage.airX * 3.2 - offX;
    const py = stage.airY * 2.2;
    const avoidR = 0.95;
    const spring = Math.min(1, delta * 3.4);

    for (let i = 0; i < count; i++) {
      const j = i * 3;
      // morph target between the two breaths
      let tx = from[j] + (to[j] - from[j]) * lt;
      let ty = from[j + 1] + (to[j + 1] - from[j + 1]) * lt;
      let tz = from[j + 2] + (to[j + 2] - from[j + 2]) * lt;

      // blend in from the intro dust as the bottle first assembles
      if (assemble < 1) {
        tx = intro[j] + (tx - intro[j]) * assemble;
        ty = intro[j + 1] + (ty - intro[j + 1]) * assemble;
        tz = intro[j + 2] + (tz - intro[j + 2]) * assemble;
      }

      // eternal breathing drift so no particle is ever truly still
      const life = i * 0.35;
      tx += Math.sin(t * 0.4 + life) * 0.03;
      ty += Math.cos(t * 0.33 + life) * 0.03;

      // ease current position toward target (heavy, graceful)
      let cx = pos[j] + (tx - pos[j]) * spring;
      let cy = pos[j + 1] + (ty - pos[j + 1]) * spring;
      const cz = pos[j + 2] + (tz - pos[j + 2]) * spring;

      // the cursor disturbs the air — particles avoid it
      if (stage.fine) {
        const ddx = cx - px;
        const ddy = cy - py;
        const d2 = ddx * ddx + ddy * ddy;
        if (d2 < avoidR * avoidR) {
          const d = Math.sqrt(d2) || 0.0001;
          const force = (1 - d / avoidR) * 0.5;
          cx += (ddx / d) * force;
          cy += (ddy / d) * force;
        }
      }

      pos[j] = cx;
      pos[j + 1] = cy;
      pos[j + 2] = cz;
    }
    points.current!.geometry.attributes.position.needsUpdate = true;

    // parallax tilt — "mouse slightly adjusts perspective", never a full spin
    if (group.current) {
      group.current.rotation.y +=
        (stage.airX * 0.28 - group.current.rotation.y) * spring;
      group.current.rotation.x +=
        (-stage.airY * 0.16 - group.current.rotation.x) * spring;

      // On wide screens the field sits right of centre so the left-anchored
      // display type has room to breathe: type left, object right — a cover,
      // not a slide. On narrow screens it recentres.
      group.current.position.x += (offX - group.current.position.x) * spring;
    }

    // camera dolly on the intro — the viewer drifts closer
    const targetZ = 6 - assemble * 0.9;
    camera.position.z += (targetZ - camera.position.z) * Math.min(1, delta * 2);

    // Chapter 07 "Time" — temperature drifts across the whole descent
    const seasons = progress * (TEMPS.length - 1);
    const ti = Math.min(TEMPS.length - 2, Math.floor(seasons));
    tint.copy(TEMPS[ti]).lerp(TEMPS[ti + 1], seasons - ti);
    // Barely a whisper — the per-particle colours must survive this.
    tint.lerp(white, 0.78);
    const mat = points.current!.material as THREE.PointsMaterial;
    mat.color.copy(tint);

    // the whole field breathes — a slow global swell of opacity, scaled by how
    // present the Ether should be in this breath (see PRESENCE)
    const pres = PRESENCE[idx] + (PRESENCE[idx + 1] - PRESENCE[idx]) * lt;
    mat.opacity = (0.88 + Math.sin(t * 0.5) * 0.07) * pres;
  });

  return (
    <group ref={group}>
      <points ref={points} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.039}
          sizeAttenuation
          map={sprite}
          vertexColors
          transparent
          opacity={0.9}
          depthWrite={false}
          depthTest={false}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
