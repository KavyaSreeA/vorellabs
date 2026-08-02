"use client";

import { motion } from "framer-motion";
import { FOUNDER } from "@/lib/content";
import Magnetic from "./Magnetic";

export default function Contact() {
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      id="contact"
      className="relative flex min-h-[90vh] items-center overflow-hidden py-28"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 55% at 50% 45%, rgba(180,190,200,0.10), transparent 70%)",
        }}
      />
      <div className="shell relative w-full text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          className="mx-auto max-w-4xl font-display text-[clamp(2.4rem,6.5vw,5.5rem)] font-semibold leading-[1.0] tracking-tightest text-silver-light"
        >
          Let&rsquo;s build something
          <br />
          <span className="text-metal text-metal-anim">worth remembering.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="mx-auto mt-8 max-w-xl text-lg text-silver"
        >
          Tell us what you&rsquo;re building. We reply personally, with a point of
          view — no forms, no funnels.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Magnetic>
            <a
              href={`mailto:${FOUNDER.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-black transition-transform duration-300 hover:-translate-y-0.5"
            >
              {FOUNDER.email}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </Magnetic>
          <a
            href={`tel:${FOUNDER.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-3.5 text-sm font-medium text-silver-light transition-all duration-300 hover:border-white/40 hover:bg-white/[0.04]"
          >
            {FOUNDER.phone}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
