"use client";

import { useCallback, useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Homepage from "@/components/Homepage";

/**
 * True state-based flow. The loader and homepage are never mounted together:
 *
 *   loading  →  loader fades to black & calls onComplete
 *            →  "handoff": loader UNMOUNTS, one black frame (nothing else mounted)
 *            →  "home": Homepage mounts fresh in its own clean commit, fades in
 *
 * The one-frame black "handoff" guarantees the loader is fully gone before the
 * homepage initializes, so nothing overlaps and the scroll-linked homepage
 * components measure in a clean commit.
 */
type Phase = "loading" | "handoff" | "home";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("loading");
  const finish = useCallback(() => setPhase("handoff"), []);

  useEffect(() => {
    if (phase !== "handoff") return;
    const id = window.setTimeout(() => setPhase("home"), 16);
    return () => clearTimeout(id);
  }, [phase]);

  if (phase === "loading") {
    return <LoadingScreen onComplete={finish} />;
  }

  if (phase === "handoff") {
    // Loader is gone; homepage not yet mounted — pure black, no scroll.
    return <div className="fixed inset-0 bg-base" />;
  }

  return <Homepage />;
}
