"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Services() {
  return (
    <section id="services" className="section-divide relative py-28 md:py-40">
      <div className="shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mb-16 max-w-2xl"
        >
          <p className="eyebrow">What we build</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-tight tracking-tightest text-silver-light">
            Four things you can hire us to build.
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
              className="group relative rounded-2xl border border-black/10 bg-white p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-black/20 hover:shadow-lift md:p-10"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-sm tracking-[0.2em] text-silver-dim">
                  {s.n}
                </span>
                <span className="text-silver-dim transition-all duration-500 group-hover:translate-x-1 group-hover:text-silver-light">
                  →
                </span>
              </div>
              <h3 className="mt-8 font-display text-2xl font-semibold tracking-tightest text-silver-light md:text-3xl">
                {s.name}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-silver">
                {s.body}
              </p>
              <ul className="mt-7 grid gap-2 sm:grid-cols-2">
                {s.deliver.map((d) => (
                  <li key={d} className="flex items-center gap-2.5 text-[13px] text-silver">
                    <span className="h-px w-3 flex-none bg-silver-dim" />
                    {d}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
