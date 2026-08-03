"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { lazy, Suspense, useEffect, useRef, useState } from "react";

// Code-split, client-only via React.lazy + a mount guard (avoids next/dynamic).
const HeroStage = lazy(() => import("./cinematic/HeroStage"));

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Hero — mounts only after the loading scene is destroyed, so its on-mount
 * animations ARE the homepage's opening beat. The metallic V lives in a canvas
 * scoped to this section (scrolls away naturally).
 */
export default function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
    layoutEffect: false,
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* metallic V behind the type — eases in from black */}
      <motion.div
        style={{ opacity: fade }}
        className="pointer-events-none absolute inset-0"
      >
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.1, ease }}
        >
          {mounted && (
            <Suspense fallback={null}>
              <HeroStage reduced={!!reduced} />
            </Suspense>
          )}
        </motion.div>
      </motion.div>

      {/* legibility veil — fades the V toward the page at the edges */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(65% 65% at 50% 50%, transparent 22%, rgba(245,245,246,0.6) 72%, #f5f5f6 100%)",
        }}
      />

      {/* soft scrim directly behind the headline so type always reads */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[min(92vw,900px)] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(245,245,246,0.9), rgba(245,245,246,0.55) 55%, transparent 100%)",
          filter: "blur(6px)",
        }}
      />

      <motion.div
        style={{ y, opacity: fade }}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <motion.p
          className="eyebrow mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 1 }}
        >
          Software · AI · Research
        </motion.p>

        <h1 className="font-display text-[clamp(2.8rem,9vw,7.5rem)] font-semibold leading-[0.92] tracking-tightest text-silver-light">
          {["We engineer", "what's next."].map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.15 + i * 0.12, duration: 1, ease }}
              >
                {i === 1 ? (
                  <span className="text-metal text-metal-anim">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-10 max-w-md text-[15px] leading-relaxed text-silver"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          An engineering laboratory building intelligent software, AI systems,
          and research-driven products.
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-9 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-silver-dim">
            Scroll
          </span>
          <div className="h-10 w-px bg-gradient-to-b from-silver-dim to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
