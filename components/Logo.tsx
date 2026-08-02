"use client";

/**
 * Vorel Labs mark — a faceted metallic "V" built from discrete polygon facets
 * so it can be rendered static (nav/footer) or assembled facet-by-facet in the
 * loading sequence. Vector, so it stays razor-sharp at any size.
 */

export type Facet = { d: string; fill: string };

export const FACETS: Facet[] = [
  // left outer blade (bright)
  { d: "M8 16 L40 16 L50 74 L30 50 Z", fill: "url(#vl-a)" },
  // right outer blade (cool, darker)
  { d: "M92 16 L60 16 L50 74 L70 50 Z", fill: "url(#vl-b)" },
  // left inner facet (mid)
  { d: "M30 50 L50 74 L46 40 L40 16 Z", fill: "url(#vl-c)" },
  // right inner facet (dark)
  { d: "M70 50 L50 74 L54 40 L60 16 Z", fill: "url(#vl-d)" },
  // central spine (brightest)
  { d: "M42 16 L58 16 L50 86 Z", fill: "url(#vl-core)" },
];

export function LogoDefs() {
  return (
    <defs>
      <linearGradient id="vl-a" x1="8" y1="16" x2="46" y2="70" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" />
        <stop offset="0.5" stopColor="#d3d8dd" />
        <stop offset="1" stopColor="#8a9099" />
      </linearGradient>
      <linearGradient id="vl-b" x1="92" y1="16" x2="54" y2="70" gradientUnits="userSpaceOnUse">
        <stop stopColor="#e9edf0" />
        <stop offset="0.55" stopColor="#9aa0a7" />
        <stop offset="1" stopColor="#4b4f55" />
      </linearGradient>
      <linearGradient id="vl-c" x1="30" y1="20" x2="50" y2="74" gradientUnits="userSpaceOnUse">
        <stop stopColor="#c2c7cd" />
        <stop offset="1" stopColor="#70757c" />
      </linearGradient>
      <linearGradient id="vl-d" x1="70" y1="20" x2="50" y2="74" gradientUnits="userSpaceOnUse">
        <stop stopColor="#82878e" />
        <stop offset="1" stopColor="#3b3e43" />
      </linearGradient>
      <linearGradient id="vl-core" x1="50" y1="16" x2="50" y2="86" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" />
        <stop offset="1" stopColor="#9298a0" />
      </linearGradient>
    </defs>
  );
}

export default function Logo({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-label="Vorel Labs"
      role="img"
    >
      <LogoDefs />
      {FACETS.map((f, i) => (
        <path key={i} d={f.d} fill={f.fill} />
      ))}
    </svg>
  );
}
