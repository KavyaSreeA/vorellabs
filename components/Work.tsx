"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROJECTS, type Project } from "@/lib/projects";

function Shot({
  src,
  accent,
  ratio,
  hint,
}: {
  src: string;
  accent: string;
  ratio: string;
  hint: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative w-full overflow-hidden ${ratio}`} style={{ background: accent }}>
      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[11px] uppercase tracking-[0.25em] text-silver-dim">
            {hint}
          </span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          aria-hidden
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      )}
    </div>
  );
}

function Chapter({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const shotY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="relative border-t border-white/[0.06] py-24 md:py-36">
      <div className="shell">
        {/* chapter marker + statement */}
        <motion.div style={{ y: titleY }} className="relative">
          <div className="flex items-center gap-4">
            <span className="font-display text-sm text-silver-dim">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-16 bg-white/15" />
            <span className="text-[12px] uppercase tracking-[0.24em] text-silver-dim">
              {project.role} · {project.year}
            </span>
          </div>
          <h3 className="mt-6 font-display text-[clamp(2.6rem,8vw,6rem)] font-semibold leading-[0.95] tracking-tightest text-silver-light">
            {project.name}
          </h3>
          <p className="mt-6 max-w-2xl font-display text-xl leading-snug text-metal md:text-2xl">
            {project.statement}
          </p>
          {project.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/[0.08] px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-silver-dim"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* device reveal */}
        <motion.div
          style={{ y: shotY }}
          className="mt-16 grid items-end gap-6 md:grid-cols-[1.7fr_1fr]"
        >
          {/* desktop browser frame */}
          <div className="overflow-hidden rounded-xl border border-white/[0.1] bg-surface shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-1.5 border-b border-white/[0.07] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              {project.url && (
                <span className="ml-3 rounded-md bg-white/[0.05] px-3 py-1 text-[11px] text-silver-dim">
                  {project.url}
                </span>
              )}
            </div>
            <Shot
              src={project.assets.desktop}
              accent={project.accent}
              ratio="aspect-[16/10]"
              hint="Desktop experience"
            />
          </div>

          {/* phone frame */}
          <div className="mx-auto w-[62%] overflow-hidden rounded-[2rem] border border-white/[0.12] bg-surface p-2 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] md:w-full">
            <div className="overflow-hidden rounded-[1.5rem]">
              <Shot
                src={project.assets.mobile}
                accent={project.accent}
                ratio="aspect-[9/17]"
                hint="Mobile experience"
              />
            </div>
          </div>
        </motion.div>

        {/* chapter detail */}
        <div className="mt-16 grid gap-10 border-t border-white/[0.06] pt-12 md:grid-cols-3">
          <div>
            <p className="text-[12px] uppercase tracking-[0.2em] text-silver-dim">
              Design process
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-silver">
              {project.process}
            </p>
          </div>
          <div>
            <p className="text-[12px] uppercase tracking-[0.2em] text-silver-dim">
              Engineering
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-silver">
              {project.architecture}
            </p>
          </div>
          <div>
            <p className="text-[12px] uppercase tracking-[0.2em] text-silver-dim">
              Outcome
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-silver">
              {project.outcome}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 px-3 py-1 text-[12px] text-silver-dim"
                >
                  {t}
                </span>
              ))}
            </div>
            {project.highlight && (
              <p className="mt-6 text-[13px] text-silver">
                <span className="text-silver-dim">Recognition — </span>
                {project.highlight}
              </p>
            )}
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-7 inline-flex items-center gap-2 text-sm text-silver-light"
              >
                Visit live site
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative">
      <div className="shell pt-28 md:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="eyebrow">Selected work</p>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-tight tracking-tightest text-silver-light">
            Production engineering, told as chapters.
          </h2>
        </motion.div>
      </div>

      {PROJECTS.map((p, i) => (
        <Chapter key={p.slug} project={p} index={i} />
      ))}
    </section>
  );
}
