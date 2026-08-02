"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";

/**
 * Wraps an element so it eases toward the pointer while hovered — the subtle
 * "magnetic" pull used on premium sites. Falls back to no motion when the
 * pointer is coarse (touch) or reduced-motion is requested.
 */
export default function Magnetic({
  children,
  strength = 0.4,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const xTo = useRef<((v: number) => void) | null>(null);
  const yTo = useRef<((v: number) => void) | null>(null);

  const setup = () => {
    if (!ref.current || xTo.current) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    )
      return;
    xTo.current = gsap.quickTo(ref.current, "x", { duration: 0.5, ease: "power3" });
    yTo.current = gsap.quickTo(ref.current, "y", { duration: 0.5, ease: "power3" });
  };

  const onMove = (e: React.MouseEvent) => {
    setup();
    if (!ref.current || !xTo.current || !yTo.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    xTo.current(x);
    yTo.current(y);
  };

  const onLeave = () => {
    xTo.current?.(0);
    yTo.current?.(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ display: "inline-block", willChange: "transform" }}
    >
      {children}
    </div>
  );
}
