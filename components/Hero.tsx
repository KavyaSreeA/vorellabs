"use client";

import { motion } from "framer-motion";

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
          className="font-display text-[clamp(2.6rem,7.5vw,6.2rem)] font-semibold leading-[0.98] tracking-tightest text-silver-light"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          We engineer
          <br />
          <span className="text-metal">what&rsquo;s next.</span>
        </motion.h1>

        <motion.p
          className="mt-8 max-w-md text-[15px] leading-relaxed text-silver"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          An engineering laboratory building intelligent software, AI systems,
          and research-driven products.
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
            See our work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-black/15 px-7 py-3 text-sm font-medium text-silver-light transition-all duration-300 hover:border-black/40 hover:bg-black/[0.04]"
          >
            Start a project
          </a>
        </motion.div>
      </div>
    </section>
  );
}
