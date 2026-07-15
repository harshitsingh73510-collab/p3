/**
 * The Stage — a render-free global store for the film's live state.
 *
 * The Ether (WebGL) reads this every frame via useFrame, and Lenis / pointer
 * listeners write to it. Deliberately NOT React state: particle systems must
 * not trigger re-renders 60x/second.
 */

export type StageState = {
  /** 0 → 1 progress through the whole film (document scroll). */
  progress: number;
  /** Normalized pointer in clip space, -1..1. */
  pointerX: number;
  pointerY: number;
  /** Smoothed pointer the Ether actually chases (adds inertia / "air"). */
  airX: number;
  airY: number;
  /** Continuous phase used for the eternal breathing drift. */
  time: number;
  /** Is the pointer a fine (mouse) pointer? Coarse = mobile, reduce work. */
  fine: boolean;
  /** Has the visitor entered past the First Breath. */
  entered: boolean;
};

export const stage: StageState = {
  progress: 0,
  pointerX: 0,
  pointerY: 0,
  airX: 0,
  airY: 0,
  time: 0,
  fine: true,
  entered: false,
};

/**
 * The film is divided into "breaths" (chapters). Each has a normalized
 * [start, end] window on total scroll progress. The Ether morphs its
 * particle target as progress crosses these windows. Kept here so both the
 * DOM chapters and the WebGL share one source of truth.
 */
export const BREATHS = [
  { id: "first-breath", key: "BOTTLE" },
  { id: "memory", key: "SCATTER" },
  { id: "extraction", key: "INGREDIENTS" },
  { id: "bottle", key: "ARTIFACT" },
  { id: "maker", key: "SCATTER" },
  { id: "collection", key: "CONSTELLATION" },
  { id: "science", key: "MOLECULE" },
  { id: "time", key: "CONSTELLATION" },
  { id: "last-memory", key: "SINGLE" },
] as const;

export type BreathKey = (typeof BREATHS)[number]["key"];

/** Which morph target the Ether should hold at a given global progress. */
export function breathAt(progress: number): { key: BreathKey; local: number } {
  const n = BREATHS.length;
  const p = Math.max(0, Math.min(0.99999, progress));
  const idx = Math.floor(p * n);
  const local = p * n - idx;
  return { key: BREATHS[idx].key, local };
}

/** clamp helper */
export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
