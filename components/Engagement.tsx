"use client";

import { motion } from "framer-motion";
import { ENGAGEMENT, FOUNDER } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Engagement() {
  return (
    <section id="engagement" className="relative overflow-hidden py-28 md:py-40">
      {/* faint ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 45% at 50% 20%, rgba(10,10,11,0.06), transparent 70%)",
        }}
      />
      <div className="shell relative">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto mb-16 max-w-2xl text-center md:mb-20"
        >
          <p className="eyebrow justify-center">Engagement models</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-tight tracking-tightest text-silver-light">
            Choose an engineering partnership.
          </h2>
          <p className="mt-6 text-silver">
            Not a service menu — three ways to build with us, scaled to the
            ambition of what you&rsquo;re creating.
          </p>
        </motion.div>

        {/* three vertical panels */}
        <div className="grid gap-6 md:grid-cols-3 md:gap-7">
          {ENGAGEMENT.map((tier, i) => (
            <motion.article
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease }}
              className="group relative flex flex-col overflow-hidden rounded-[20px] border border-black/[0.08] p-8 shadow-[0_1px_2px_rgba(10,10,11,0.04)] transition-all duration-500 hover:-translate-y-1.5 hover:border-black/20 hover:shadow-[0_30px_70px_-30px_rgba(10,10,11,0.22)] md:p-10"
              style={{
                background:
                  "linear-gradient(165deg, #ffffff 0%, #fcfcfd 100%)",
              }}
            >
              {/* soft hover lighting */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(90% 55% at 50% 0%, rgba(10,10,11,0.05), transparent 70%)",
                }}
              />
              {/* metallic top hairline on hover */}
              <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-black/40 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

              <div className="relative flex flex-1 flex-col">
                <span className="font-display text-sm tracking-[0.2em] text-silver-dim">
                  {tier.n}
                </span>

                <h3 className="mt-7 font-display text-3xl font-semibold tracking-tightest text-silver-light md:text-4xl">
                  {tier.name}
                </h3>

                <p className="mt-4 font-display text-2xl text-metal md:text-[1.7rem]">
                  {tier.price}
                </p>

                <p className="mt-6 text-[15px] leading-relaxed text-silver">
                  {tier.desc}
                </p>

                <div className="my-8 h-px w-full bg-black/[0.07]" />

                <ul className="flex-1 space-y-3.5">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 text-[14px] text-silver"
                    >
                      <span className="h-px w-4 flex-none bg-silver-dim transition-all duration-500 group-hover:w-6 group-hover:bg-silver-light" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={`mailto:${FOUNDER.email}?subject=${encodeURIComponent(
                    `${tier.name} — Vorel Labs`
                  )}`}
                  className="group/cta mt-10 inline-flex items-center justify-between gap-4 rounded-full border border-black/15 px-6 py-3.5 text-sm font-medium text-silver-light transition-all duration-300 hover:border-black/40 hover:bg-black/[0.05]"
                >
                  {tier.cta}
                  <span className="transition-transform duration-300 group-hover/cta:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto mt-14 max-w-xl text-center text-[13px] leading-relaxed text-silver-dim"
        >
          Pricing is determined by project scope, complexity, features,
          integrations, and timeline. Every engagement begins with a
          conversation, not a checkout.
        </motion.p>
      </div>
    </section>
  );
}
