"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TIMELINE } from "@/lib/content";

function Milestone({ item, i }: { item: (typeof TIMELINE)[number]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid grid-cols-[64px_1fr] gap-6 pb-16 md:grid-cols-[120px_1fr] md:gap-10"
    >
      <div className="text-right">
        <span className="font-display text-lg font-semibold text-silver-light md:text-2xl">
          {item.year}
        </span>
      </div>
      <div className="relative pl-8 md:pl-10">
        {/* node */}
        <span className="absolute left-[-5px] top-1.5 h-2.5 w-2.5 rounded-full bg-silver-light shadow-[0_0_0_5px_rgba(10,10,11,0.06)]" />
        <h3 className="font-display text-xl font-semibold text-silver-light md:text-2xl">
          {item.title}
        </h3>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-silver">
          {item.body}
        </p>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
    layoutEffect: false,
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="section-divide relative py-28 md:py-40">
      <div className="shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="eyebrow">The path so far</p>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-tight tracking-tightest text-silver-light">
            One line, drawn forward.
          </h2>
        </motion.div>

        <div ref={ref} className="relative">
          {/* progress rail — sits on the divider between year and content */}
          <div className="absolute left-[64px] top-0 h-full w-px bg-black/[0.12] md:left-[120px]">
            <motion.div
              style={{ height }}
              className="w-px bg-gradient-to-b from-black to-silver-dim"
            />
          </div>

          {TIMELINE.map((item, i) => (
            <Milestone key={item.title + i} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
