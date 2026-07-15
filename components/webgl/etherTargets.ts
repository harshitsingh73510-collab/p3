/**
 * The Ether's morph targets. One particle field becomes every form the film
 * needs, then returns to a single point. Each generator fills a Float32Array
 * of length count*3. Shapes are authored in a shared ~[-2,2] space and the
 * field scales them to taste.
 */

type Vec = [number, number, number];

function rng(seed: number) {
  // deterministic so the same shapes rebuild identically
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Perfume-bottle silhouette as a radius profile over height. */
function bottleRadius(y: number): number {
  // y in [-1.5, 1.5]
  if (y < 0.55) return 0.72; // body
  if (y < 0.9) {
    const t = (y - 0.55) / 0.35; // shoulder taper
    return 0.72 - t * (0.72 - 0.17);
  }
  if (y < 1.18) return 0.17; // neck
  return 0.34; // cap
}

function fillBottle(count: number, seed: number, out: Float32Array) {
  const r = rng(seed);
  for (let i = 0; i < count; i++) {
    const y = -1.5 + r() * 3.0;
    const prof = bottleRadius(y);
    // bias toward the shell so glass reads as a surface, not a solid brick
    const rad = prof * (0.72 + r() * 0.3);
    const a = r() * Math.PI * 2;
    out[i * 3] = Math.cos(a) * rad;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = Math.sin(a) * rad;
  }
}

function fillScatter(count: number, seed: number, out: Float32Array, radius = 3.2) {
  const r = rng(seed);
  for (let i = 0; i < count; i++) {
    // cube-root for even volume fill, then soften outward
    const rad = radius * Math.cbrt(r());
    const theta = r() * Math.PI * 2;
    const phi = Math.acos(2 * r() - 1);
    out[i * 3] = rad * Math.sin(phi) * Math.cos(theta);
    out[i * 3 + 1] = rad * Math.sin(phi) * Math.sin(theta) * 0.8;
    out[i * 3 + 2] = rad * Math.cos(phi);
  }
}

function fillIngredients(count: number, seed: number, out: Float32Array) {
  const r = rng(seed);
  // five floating sculptures — rose, vanilla, sandalwood, amber, oud
  const centers: Vec[] = [
    [-1.7, 0.6, -0.3],
    [-0.85, -0.7, 0.4],
    [0, 0.9, -0.2],
    [0.9, -0.5, 0.3],
    [1.75, 0.4, -0.4],
  ];
  for (let i = 0; i < count; i++) {
    const c = centers[i % centers.length];
    const rad = 0.42 * Math.cbrt(r());
    const theta = r() * Math.PI * 2;
    const phi = Math.acos(2 * r() - 1);
    out[i * 3] = c[0] + rad * Math.sin(phi) * Math.cos(theta);
    out[i * 3 + 1] = c[1] + rad * Math.sin(phi) * Math.sin(theta);
    out[i * 3 + 2] = c[2] + rad * Math.cos(phi);
  }
}

function fillArtifact(count: number, seed: number, out: Float32Array) {
  const r = rng(seed);
  const pedestal = Math.floor(count * 0.16);
  for (let i = 0; i < count; i++) {
    if (i < pedestal) {
      // obsidian pedestal — a flat disc of points beneath the bottle
      const rad = 0.4 + r() * 1.05;
      const a = r() * Math.PI * 2;
      out[i * 3] = Math.cos(a) * rad;
      out[i * 3 + 1] = -1.72 - r() * 0.12;
      out[i * 3 + 2] = Math.sin(a) * rad;
    } else {
      const y = -1.5 + r() * 3.0;
      const prof = bottleRadius(y);
      const rad = prof * (0.78 + r() * 0.24);
      const a = r() * Math.PI * 2;
      out[i * 3] = Math.cos(a) * rad;
      out[i * 3 + 1] = y * 0.95;
      out[i * 3 + 2] = Math.sin(a) * rad;
    }
  }
}

function fillConstellation(count: number, seed: number, out: Float32Array) {
  const r = rng(seed);
  // sparse nodes with faint filaments — a gallery of stars
  const nodes = 14;
  const centers: Vec[] = [];
  for (let n = 0; n < nodes; n++) {
    centers.push([
      (r() * 2 - 1) * 3.4,
      (r() * 2 - 1) * 1.9,
      (r() * 2 - 1) * 2.2,
    ]);
  }
  for (let i = 0; i < count; i++) {
    if (r() < 0.55) {
      // point clustered at a node
      const c = centers[i % nodes];
      out[i * 3] = c[0] + (r() - 0.5) * 0.3;
      out[i * 3 + 1] = c[1] + (r() - 0.5) * 0.3;
      out[i * 3 + 2] = c[2] + (r() - 0.5) * 0.3;
    } else {
      // point along a filament between two nodes
      const a = centers[Math.floor(r() * nodes)];
      const b = centers[Math.floor(r() * nodes)];
      const t = r();
      out[i * 3] = a[0] + (b[0] - a[0]) * t;
      out[i * 3 + 1] = a[1] + (b[1] - a[1]) * t;
      out[i * 3 + 2] = a[2] + (b[2] - a[2]) * t;
    }
  }
}

function fillMolecule(count: number, seed: number, out: Float32Array) {
  const r = rng(seed);
  // a lattice of atoms joined by bonds — the science of scent
  const atoms: Vec[] = [
    [0, 0, 0],
    [1.2, 0.5, 0.2],
    [-1.1, 0.4, -0.4],
    [0.5, -1.1, 0.6],
    [-0.6, -1.0, -0.5],
    [0.2, 1.3, -0.3],
    [1.4, -0.6, -0.9],
    [-1.5, -0.3, 0.8],
  ];
  const bonds: [number, number][] = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 6], [2, 7],
  ];
  for (let i = 0; i < count; i++) {
    if (r() < 0.4) {
      const c = atoms[i % atoms.length];
      const rad = 0.22 * Math.cbrt(r());
      const a = r() * Math.PI * 2;
      const p = Math.acos(2 * r() - 1);
      out[i * 3] = c[0] + rad * Math.sin(p) * Math.cos(a);
      out[i * 3 + 1] = c[1] + rad * Math.sin(p) * Math.sin(a);
      out[i * 3 + 2] = c[2] + rad * Math.cos(p);
    } else {
      const [ai, bi] = bonds[Math.floor(r() * bonds.length)];
      const t = r();
      const a = atoms[ai];
      const b = atoms[bi];
      const j = 0.04;
      out[i * 3] = a[0] + (b[0] - a[0]) * t + (r() - 0.5) * j;
      out[i * 3 + 1] = a[1] + (b[1] - a[1]) * t + (r() - 0.5) * j;
      out[i * 3 + 2] = a[2] + (b[2] - a[2]) * t + (r() - 0.5) * j;
    }
  }
}

function fillSingle(count: number, seed: number, out: Float32Array) {
  const r = rng(seed);
  for (let i = 0; i < count; i++) {
    // all but a whisper collapse to the origin; the first particle remains
    const rad = i === 0 ? 0 : 0.015 * Math.cbrt(r());
    const a = r() * Math.PI * 2;
    const p = Math.acos(2 * r() - 1);
    out[i * 3] = rad * Math.sin(p) * Math.cos(a);
    out[i * 3 + 1] = rad * Math.sin(p) * Math.sin(a);
    out[i * 3 + 2] = rad * Math.cos(p);
  }
}

export type BuiltTargets = {
  /** one buffer per BREATH (in order), each length count*3 */
  breaths: Float32Array[];
  /** the wide dust the intro assembles from */
  introScatter: Float32Array;
  count: number;
};

/** Build every morph target once. Order matches lib/stage BREATHS. */
export function buildTargets(count: number): BuiltTargets {
  const mk = () => new Float32Array(count * 3);

  const bottle = mk(); fillBottle(count, 11, bottle);
  const scatter1 = mk(); fillScatter(count, 22, scatter1);
  const ingredients = mk(); fillIngredients(count, 33, ingredients);
  const artifact = mk(); fillArtifact(count, 44, artifact);
  const scatter2 = mk(); fillScatter(count, 55, scatter2, 2.8);
  const constellation1 = mk(); fillConstellation(count, 66, constellation1);
  const molecule = mk(); fillMolecule(count, 77, molecule);
  const constellation2 = mk(); fillConstellation(count, 88, constellation2);
  const single = mk(); fillSingle(count, 99, single);

  const introScatter = mk(); fillScatter(count, 7, introScatter, 4.6);

  return {
    // must align 1:1 with BREATHS order in lib/stage.ts
    breaths: [
      bottle, // first-breath
      scatter1, // memory
      ingredients, // extraction
      artifact, // bottle
      scatter2, // maker
      constellation1, // collection
      molecule, // science
      constellation2, // time
      single, // last-memory
    ],
    introScatter,
    count,
  };
}
