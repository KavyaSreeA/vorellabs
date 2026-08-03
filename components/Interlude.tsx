"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Full-screen editorial moment between chapters. Two lines of oversized type
 * drift on a subtle parallax as they pass through the viewport.
 */
export default function Interlude({
  lead,
  emphasis,
}: {
  lead: string;
  emphasis: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [0, 1, 1, 0]
  );

  return (
    <section
      ref={ref}
      className="relative flex min-h-[80vh] items-center justify-center overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(10,10,11,0.07), transparent 70%)",
        }}
      />
      <motion.div
        style={{ y, opacity }}
        className="shell text-center"
      >
        <p className="font-display text-[clamp(2.2rem,6.5vw,5rem)] font-semibold leading-[1.02] tracking-tightest text-silver-dim">
          {lead}
        </p>
        <p className="font-display text-[clamp(2.2rem,6.5vw,5rem)] font-semibold leading-[1.02] tracking-tightest text-metal text-metal-anim">
          {emphasis}
        </p>
      </motion.div>
    </section>
  );
}
