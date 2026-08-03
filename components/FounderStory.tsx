"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { FOUNDER } from "@/lib/content";

function Photo({
  src,
  label,
  active,
}: {
  src: string;
  label: string;
  active: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <motion.div
      className="absolute inset-0"
      initial={false}
      animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 1.04 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* fallback panel — shows until a real photo is dropped in */}
      <div
        className="absolute inset-0 flex items-end p-8"
        style={{
          background:
            "linear-gradient(160deg,#ececed,#f6f6f7 70%),radial-gradient(60% 50% at 30% 20%,rgba(10,10,11,0.05),transparent)",
        }}
      >
        <span
          className="text-[12px] uppercase tracking-[0.28em] text-silver-dim transition-opacity duration-500"
          style={{ opacity: active ? 1 : 0 }}
        >
          {label}
        </span>
      </div>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          aria-hidden
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
    </motion.div>
  );
}

export default function FounderStory() {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
    layoutEffect: false,
  });
  const progress = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  useMotionValueEvent(progress, "change", (v) => {
    const n = FOUNDER.photos.length;
    const i = Math.min(n - 1, Math.max(0, Math.floor(v * n)));
    setIndex(i);
  });

  return (
    <section id="story" ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="shell grid w-full items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* crossfading photography */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-black/[0.08]">
            {FOUNDER.photos.map((p, i) => (
              <Photo key={p.src} src={p.src} label={p.label} active={i === index} />
            ))}
            {/* progress ticks */}
            <div className="absolute bottom-6 right-6 flex gap-1.5">
              {FOUNDER.photos.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === index ? "w-6 bg-black" : "w-1.5 bg-black/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* founder statement */}
          <div>
            <p className="eyebrow">About Vorel Labs</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-tight tracking-tightest text-silver-light">
              {FOUNDER.name}
            </h2>
            <p className="mt-3 text-[15px] uppercase tracking-[0.2em] text-silver-dim">
              {FOUNDER.role} — {FOUNDER.company}
            </p>
            <p className="mt-8 max-w-md font-display text-2xl leading-snug text-silver-light">
              {FOUNDER.line}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
