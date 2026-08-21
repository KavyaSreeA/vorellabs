"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";

const LINKS = [
  { label: "Story", href: "#story" },
  { label: "Work", href: "#work" },
  { label: "Pipeline", href: "#pipeline" },
  { label: "Deep Tech", href: "#deeptech" },
];

export default function Nav() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.07] bg-white/75 shadow-[0_1px_0_rgba(10,10,11,0.03),0_12px_28px_-20px_rgba(10,10,11,0.18)] backdrop-blur-xl"
        >
          <nav className="shell flex h-[64px] items-center justify-between">
            <a href="#top" className="flex items-center gap-2.5">
              <Logo size={24} />
              <span className="font-display text-[13px] font-semibold uppercase tracking-[0.3em] text-silver-light">
                Vorel
              </span>
            </a>

            <div className="hidden items-center gap-9 md:flex">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-[13px] text-silver-dim transition-colors duration-300 hover:text-silver-light"
                >
                  {l.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className="hidden rounded-full border border-black/15 px-5 py-2 text-[13px] font-medium text-silver-light transition-all duration-300 hover:border-black/40 hover:bg-black/[0.04] md:inline-flex"
              >
                Start a project
              </a>
              <button
                aria-label="Toggle menu"
                onClick={() => setOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/12 md:hidden"
              >
                <div className="space-y-[5px]">
                  <span className={`block h-px w-4 bg-silver-light transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
                  <span className={`block h-px w-4 bg-silver-light transition-opacity ${open ? "opacity-0" : ""}`} />
                  <span className={`block h-px w-4 bg-silver-light transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
                </div>
              </button>
            </div>
          </nav>

          <motion.div
            initial={false}
            animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-black/[0.06] md:hidden"
          >
            <div className="shell flex flex-col gap-1 py-4">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-2 text-sm text-silver-dim hover:text-silver-light"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex w-fit rounded-full border border-black/15 px-5 py-2 text-sm text-silver-light"
              >
                Start a project
              </a>
            </div>
          </motion.div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
