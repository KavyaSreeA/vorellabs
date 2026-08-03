"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ACHIEVEMENTS, FOUNDER } from "@/lib/content";

export default function Founder() {
  const [failed, setFailed] = useState(false);
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="relative py-28 md:py-40">
      <div className="shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-2xl"
        >
          <p className="eyebrow">The founder</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-tight tracking-tightest text-silver-light">
            The people behind the engineering.
          </h2>
        </motion.div>

        <div className="grid items-center gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          {/* portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-black/[0.08]"
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg,#ececed,#f6f6f7 70%),radial-gradient(60% 50% at 30% 20%,rgba(10,10,11,0.05),transparent)",
              }}
            />
            {!failed && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/founder/kavya5.jpg"
                alt=""
                aria-hidden
                onError={() => setFailed(true)}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            )}
          </motion.div>

          {/* statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h3 className="font-display text-4xl font-semibold text-silver-light md:text-5xl">
              {FOUNDER.name}
            </h3>
            <p className="mt-3 text-[15px] uppercase tracking-[0.2em] text-silver-dim">
              {FOUNDER.role} — {FOUNDER.company}
            </p>
            <p className="mt-8 max-w-lg font-display text-2xl leading-snug text-metal">
              {FOUNDER.line}
            </p>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-[14px] text-silver">
              <span>{FOUNDER.location}</span>
              <a
                href={`mailto:${FOUNDER.email}`}
                className="text-silver-light transition-colors hover:text-black"
              >
                {FOUNDER.email}
              </a>
            </div>

            {/* recognition — woven in, not a standalone "wins" section */}
            <div className="mt-10 border-t border-black/[0.08] pt-8">
              <p className="text-[11px] uppercase tracking-[0.28em] text-silver-dim">
                Recognition
              </p>
              <div className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {ACHIEVEMENTS.map((a, i) => (
                  <motion.div
                    key={a.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease }}
                    className="flex items-baseline justify-between gap-4 border-b border-black/[0.05] pb-3"
                  >
                    <span className="text-[15px] text-silver-light">
                      {a.title}
                    </span>
                    <span className="whitespace-nowrap text-[12px] uppercase tracking-[0.12em] text-silver-dim">
                      {a.meta}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
