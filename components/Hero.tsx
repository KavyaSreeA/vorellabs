"use client";

import { motion } from "framer-motion";
import { STATS } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

/** Hero — clean centered typography, no 3D, no scroll rigging. */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center px-6 pt-24 text-center"
    >
      <div className="flex flex-col items-center">
        <motion.p
          className="eyebrow mb-8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Software · AI · Research
        </motion.p>

        <motion.h1
          className="font-display text-[clamp(2.4rem,6.2vw,5rem)] font-semibold leading-[0.98] tracking-tightest text-silver-light"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          We turn ambitious ideas into <span className="text-metal">working software.</span>
        </motion.h1>

        <motion.p
          className="mt-8 max-w-xl text-base leading-relaxed text-silver"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          We build business websites, full-stack applications and AI-powered products — from first prototype to production.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <a
            href="#work"
            className="rounded-full bg-silver-light px-7 py-3 text-sm font-medium text-base transition-transform duration-300 hover:-translate-y-0.5"
          >
            Explore our work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-black/15 px-7 py-3 text-sm font-medium text-silver-light transition-all duration-300 hover:border-black/40 hover:bg-black/[0.04]"
          >
            Start a project
          </a>
        </motion.div>

        <motion.dl
          className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-x-8 gap-y-8 border-t border-black/[0.08] pt-8 md:grid-cols-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {STATS.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <dt className="font-display text-2xl font-semibold text-silver-light md:text-3xl">
                {s.value}
              </dt>
              <dd className="mt-1 text-[12px] leading-snug text-silver-dim">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
