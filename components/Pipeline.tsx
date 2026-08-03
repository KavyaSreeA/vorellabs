"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { PIPELINE } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * "How we build" — a sticky, scroll-driven process explorer. As you move
 * through the section, the active stage advances along a filling rail and the
 * large detail panel crossfades. Stages are also clickable to jump. Distinct
 * from the vertical journey timeline elsewhere on the page.
 */
export default function Pipeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
    layoutEffect: false,
  });
  const railFill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(PIPELINE.length - 1, Math.floor(v * PIPELINE.length));
    setActive(i < 0 ? 0 : i);
  });

  const jump = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = window.scrollY + el.getBoundingClientRect().top;
    const target = top + ((i + 0.5) / PIPELINE.length) * total;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  const stage = PIPELINE[active];

  return (
    <section
      id="pipeline"
      ref={sectionRef}
      className="relative"
      style={{ height: `${PIPELINE.length * 60}vh` }}
    >
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden py-24">
        <div className="shell w-full">
          {/* header */}
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">How we build</p>
              <h2 className="mt-4 max-w-xl font-display text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-tight tracking-tightest text-silver-light">
                One pipeline, idea to scale.
              </h2>
            </div>
            <p className="max-w-xs text-silver">
              Research → Prototype → Engineering → Production → Scale. Every stage
              compounds into the next.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
            {/* index rail */}
            <div className="relative flex gap-6">
              {/* rail */}
              <div className="relative mt-2 w-px flex-none bg-black/[0.08]">
                <motion.div
                  style={{ height: railFill }}
                  className="absolute left-0 top-0 w-px bg-gradient-to-b from-black to-silver-dim"
                />
              </div>

              <ul className="flex flex-1 flex-col gap-6">
                {PIPELINE.map((s, i) => {
                  const on = i === active;
                  return (
                    <li key={s.stage}>
                      <button
                        onClick={() => jump(i)}
                        className="group flex w-full items-center gap-4 text-left"
                      >
                        <span
                          className={`font-display text-xs tabular-nums transition-colors duration-300 ${
                            on ? "text-silver-light" : "text-silver-dim"
                          }`}
                        >
                          {s.n}
                        </span>
                        <span
                          className={`font-display text-2xl font-semibold tracking-tightest transition-all duration-500 md:text-[2rem] ${
                            on
                              ? "text-silver-light"
                              : "text-black/25 group-hover:text-black/45"
                          }`}
                        >
                          {s.stage}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* active detail panel */}
            <div className="relative min-h-[300px] md:min-h-[340px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-display text-[clamp(3.5rem,10vw,7rem)] font-semibold leading-none tracking-tightest text-black/[0.07]">
                      {stage.n}
                    </span>
                    <span className="h-px flex-1 bg-black/10" />
                  </div>

                  <h3 className="mt-6 font-display text-4xl font-semibold tracking-tightest text-silver-light md:text-5xl">
                    {stage.stage}
                  </h3>
                  <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-silver">
                    {stage.body}
                  </p>

                  <div className="mt-9 flex flex-wrap gap-2.5">
                    {stage.tech.map((t, ti) => (
                      <motion.span
                        key={t}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + ti * 0.06, duration: 0.4 }}
                        className="rounded-lg border border-black/[0.08] bg-black/[0.02] px-3.5 py-1.5 text-[13px] text-silver"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* stage counter */}
              <div className="mt-12 flex items-center gap-3 text-[12px] text-silver-dim">
                <span className="tabular-nums text-silver-light">
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span className="h-px w-8 bg-black/15" />
                <span className="tabular-nums">
                  {String(PIPELINE.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
