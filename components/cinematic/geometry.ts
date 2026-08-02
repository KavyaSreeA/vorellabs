import * as THREE from "three";

/** 2D silhouette of the Vorel chevron, in local units (matches the extrude). */
export const V_OUTLINE: [number, number][] = [
  [-1.0, 1.0],
  [0, -1.15],
  [1.0, 1.0],
  [0.6, 1.0],
  [0, -0.38],
  [-0.6, 1.0],
];

export function makeVShape() {
  const shape = new THREE.Shape();
  V_OUTLINE.forEach(([x, y], i) => (i ? shape.lineTo(x, y) : shape.moveTo(x, y)));
  shape.closePath();
  return shape;
}

/** Solid, beveled V geometry — the assembled logo / hero monolith. */
export function makeVGeometry() {
  const geo = new THREE.ExtrudeGeometry(makeVShape(), {
    depth: 0.34,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.07,
    bevelSegments: 6,
    steps: 1,
  });
  geo.center();
  geo.computeVertexNormals();
  return geo;
}

/** Central bright shard geometry (the logo's spine highlight). */
export function makeShardGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.98);
  shape.lineTo(0.13, 0.1);
  shape.lineTo(0, -0.95);
  shape.lineTo(-0.13, 0.1);
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.44,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.04,
    bevelSegments: 4,
    steps: 1,
  });
  geo.center();
  geo.computeVertexNormals();
  return geo;
}

function pointInPolygon(x: number, y: number, poly: [number, number][]) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

/**
 * Sample `n` target points that lie inside the V silhouette (random depth), so a
 * particle cloud can lock into the shape. Deterministic given a seed so the
 * animation is identical every mount (no reliance on Math.random at module load).
 */
export function sampleVPoints(n: number, seed = 1): Float32Array {
  const out = new Float32Array(n * 3);
  // small seeded PRNG (mulberry32)
  let s = seed >>> 0;
  const rand = () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  let i = 0;
  let guard = 0;
  while (i < n && guard < n * 200) {
    guard++;
    const x = -1.05 + rand() * 2.1;
    const y = -1.2 + rand() * 2.25;
    if (!pointInPolygon(x, y, V_OUTLINE)) continue;
    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = (rand() - 0.5) * 0.34;
    i++;
  }
  return out;
}

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
export const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
