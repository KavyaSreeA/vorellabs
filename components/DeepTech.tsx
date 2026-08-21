"use client";

import { motion } from "framer-motion";
import { DEEP_TECH } from "@/lib/content";

const NODES = [
  { x: 190, y: 120 },
  { x: 500, y: 90 },
  { x: 810, y: 120 },
  { x: 900, y: 300 },
  { x: 810, y: 480 },
  { x: 500, y: 510 },
  { x: 190, y: 480 },
  { x: 100, y: 300 },
];

const CENTER = { x: 500, y: 300 };
const ease = [0.22, 1, 0.36, 1] as const;

export default function DeepTech() {
  return (
    <section
      id="deeptech"
      className="section-divide relative overflow-hidden py-28 md:py-40"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 45% at 50% 50%, rgba(10,10,11,0.08), transparent 70%)",
        }}
      />
      <div className="shell relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="eyebrow justify-center">Deep tech</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-tight tracking-tightest text-silver-light">
            An engineering laboratory.
          </h2>
          <p className="mt-6 text-silver">
            Research-grade systems across the full intelligence stack — connected,
            composable, production-ready.
          </p>
        </motion.div>

        {/* constellation (desktop) */}
        <div className="relative mt-16 hidden md:block">
          <svg viewBox="0 0 1000 600" className="w-full">
            {/* links */}
            {NODES.map((n, i) => (
              <motion.line
                key={`l${i}`}
                x1={CENTER.x}
                y1={CENTER.y}
                x2={n.x}
                y2={n.y}
                stroke="rgba(10,10,11,0.16)"
                strokeWidth={1}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 + i * 0.08, ease }}
              />
            ))}

            {/* core */}
            <motion.circle
              cx={CENTER.x}
              cy={CENTER.y}
              r={44}
              fill="none"
              stroke="rgba(10,10,11,0.25)"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              style={{ transformOrigin: "center", transformBox: "fill-box" }}
            />
            <motion.circle
              cx={CENTER.x}
              cy={CENTER.y}
              r={6}
              fill="#0a0a0b"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <text
              x={CENTER.x}
              y={CENTER.y + 74}
              textAnchor="middle"
              className="fill-silver-light font-display"
              style={{ fontSize: 15, letterSpacing: 4, textTransform: "uppercase" }}
            >
              VOREL
            </text>

            {/* nodes */}
            {NODES.map((n, i) => (
              <motion.g
                key={`n${i}`}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.08, ease }}
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}
              >
                <circle cx={n.x} cy={n.y} r={4} fill="#c7ccd1" />
                <circle cx={n.x} cy={n.y} r={11} fill="none" stroke="rgba(10,10,11,0.14)" />
                <text
                  x={n.x}
                  y={n.y > CENTER.y ? n.y + 30 : n.y - 20}
                  textAnchor="middle"
                  className="fill-silver"
                  style={{ fontSize: 15 }}
                >
                  {DEEP_TECH[i]}
                </text>
              </motion.g>
            ))}
          </svg>
        </div>

        {/* list (mobile) */}
        <div className="mt-12 grid grid-cols-2 gap-3 md:hidden">
          {DEEP_TECH.map((d, i) => (
            <motion.div
              key={d}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass rounded-xl px-4 py-4 text-[14px] text-silver-light"
            >
              {d}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
