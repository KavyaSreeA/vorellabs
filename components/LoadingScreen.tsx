"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BOOT, BOOT_MESSAGES, BOOT_REDUCED, TAGLINE, WORDMARK } from "@/lib/boot";

// Code-split, client-only via React.lazy + a mount guard (avoids next/dynamic).
const LoaderStage = lazy(() => import("./cinematic/LoaderStage"));

const ease = [0.22, 1, 0.36, 1] as const;
const FADE = 0.7; // scene fade-out duration (s)

/**
 * A completely standalone loading scene. It is the ONLY thing on screen while
 * active — the homepage is not mounted behind it. When the sequence finishes it
 * fades to black and calls `onComplete` (deterministic timer, so it fires even
 * if the tab was backgrounded), after which the parent unmounts it entirely.
 */
export default function LoadingScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const reduced = !!useReducedMotion();
  const [msg, setMsg] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Only mount the WebGL canvas on the client, after first paint.
  useEffect(() => setMounted(true), []);

  // Scroll is disabled for the whole lifetime of the loading scene.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Evolving system messages.
  useEffect(() => {
    if (reduced) return;
    const timers = BOOT_MESSAGES.map((_, i) =>
      window.setTimeout(
        () => setMsg(i),
        (BOOT.msgStart + i * BOOT.msgInterval) * 1000
      )
    );
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  // Sequence → fade → complete. Timer-based so the scene always tears down.
  useEffect(() => {
    const handoff = (reduced ? BOOT_REDUCED.handoff : BOOT.handoff) * 1000;
    const t1 = window.setTimeout(() => setExiting(true), handoff);
    const t2 = window.setTimeout(onComplete, handoff + FADE * 1000 + 60);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduced, onComplete]);

  const T = reduced ? BOOT_REDUCED : BOOT;

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-base"
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: FADE, ease }}
    >
      {/* 3D loader canvas */}
      <div className="absolute inset-0">
        {mounted && (
          <Suspense fallback={null}>
            <LoaderStage reduced={reduced} exiting={exiting} />
          </Suspense>
        )}
      </div>

      {/* radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 42%, transparent 45%, rgba(245,245,246,0.5) 78%, #f5f5f6 100%)",
        }}
      />

      {/* atmospheric fog drift */}
      <div className="loading-fog absolute inset-0 opacity-60" />

      {/* soft radiance around the logo (very subtle on white) */}
      <motion.div
        className="absolute left-1/2 top-[42%] h-[48vmin] w-[48vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(10,10,11,0.05), rgba(10,10,11,0.02) 45%, transparent 70%)",
          filter: "blur(10px)",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 1, 0.85], scale: [0.8, 1, 1.02] }}
        transition={{ duration: 2.4, delay: 0.4, ease, times: [0, 0.5, 1] }}
      />

      {/* film grain */}
      <div className="grain absolute inset-0" />

      {/* typography column, below the 3D logo */}
      <div className="absolute inset-x-0 top-[57%] flex flex-col items-center px-6 text-center">
        {/* soft scrim so the wordmark reads over the logo */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[36vmin] w-[min(94vw,760px)] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(closest-side, rgba(245,245,246,0.92), rgba(245,245,246,0.55) 55%, transparent 100%)",
            filter: "blur(6px)",
          }}
        />
        <div className="relative flex items-center">
          {WORDMARK.split("").map((ch, i) =>
            ch === " " ? (
              <span key={i} className="inline-block w-[0.55em]" />
            ) : (
              <motion.span
                key={i}
                className="font-display text-[clamp(1.4rem,3.4vw,2.1rem)] font-semibold uppercase tracking-[0.5em] text-silver-light"
                initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: T.wordmark + i * 0.06, duration: 0.6, ease }}
              >
                {ch}
              </motion.span>
            )
          )}
        </div>

        <motion.p
          className="relative mt-5 text-[12px] font-medium uppercase tracking-[0.42em] text-silver"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: T.tagline, duration: 0.9, ease }}
        >
          {TAGLINE}
        </motion.p>
      </div>

      {/* evolving system messages */}
      <motion.div
        className="absolute bottom-[13%] left-1/2 flex -translate-x-1/2 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduced ? 0.2 : BOOT.msgStart - 0.2, duration: 0.6 }}
      >
        <span className="mr-3 h-1.5 w-1.5 animate-pulse rounded-full bg-silver-light/80" />
        <AnimatePresence mode="wait">
          <motion.span
            key={msg}
            className="font-display text-[11px] uppercase tracking-[0.34em] text-silver"
            initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease }}
          >
            {BOOT_MESSAGES[msg]}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
