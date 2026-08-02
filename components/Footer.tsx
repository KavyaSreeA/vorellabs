"use client";

import Logo from "./Logo";
import { FOUNDER } from "@/lib/content";

const NAV = [
  { label: "Story", href: "#story" },
  { label: "Work", href: "#work" },
  { label: "Pipeline", href: "#pipeline" },
  { label: "Deep Tech", href: "#deeptech" },
];

export default function Footer({ className = "" }: { className?: string }) {
  const year = 2026;
  return (
    <footer className={`relative border-t border-white/[0.07] py-16 ${className}`}>
      <div className="shell">
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
          <div>
            <a href="#top" className="flex items-center gap-3">
              <Logo size={30} />
              <span className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-silver-light">
                Vorel Labs
              </span>
            </a>
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-silver-dim">
              Building tomorrow. An engineering laboratory for intelligent
              software, AI systems, and research-driven products.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-3">
            {NAV.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[14px] text-silver transition-colors duration-300 hover:text-silver-light"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="text-[14px] text-silver-dim">
            <a
              href={`mailto:${FOUNDER.email}`}
              className="block text-silver-light transition-colors hover:text-white"
            >
              {FOUNDER.email}
            </a>
            <span className="mt-1 block">{FOUNDER.location}</span>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-8 text-[13px] text-silver-dim md:flex-row">
          <p>© {year} Vorel Labs. All rights reserved.</p>
          <p className="tracking-[0.2em]">BUILDING TOMORROW.</p>
        </div>
      </div>
    </footer>
  );
}
