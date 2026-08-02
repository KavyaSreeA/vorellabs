/**
 * Single source of truth for the cinematic boot timeline. Both the DOM overlay
 * (Framer/GSAP) and the 3D stage (useFrame) read these timings so the sequence
 * stays perfectly in sync — the logo, typography, and messages are one clock.
 * All values are seconds from stage mount.
 */

export const BOOT_MESSAGES = [
  "Initializing Research…",
  "Loading Intelligent Systems…",
  "Compiling Architecture…",
  "Rendering Experiences…",
  "Synchronizing Infrastructure…",
  "Launching Vorel…",
];

export const WORDMARK = "VOREL LABS";
export const TAGLINE = "Building Tomorrow.";

const msgStart = 2.6;
const msgInterval = 0.44;
const msgEnd = msgStart + BOOT_MESSAGES.length * msgInterval;

export const BOOT = {
  ambient: 0.4, // ambient particles emerge
  assembleStart: 0.8, // metallic particles begin assembling
  assembled: 1.9, // logo locks together
  reflection: 2.2, // brushed-metal sweep across the logo
  reflectionDur: 1.0,
  settle: 2.9, // 3–5° settle rotation
  wordmark: 2.6, // letters appear
  tagline: 3.05, // tagline fades in
  msgStart,
  msgInterval,
  msgEnd,
  handoff: Math.max(4.5, msgEnd + 0.15), // begin continuous transition into hero
  overlayFade: 0.9, // how long the DOM overlay takes to clear
} as const;

export const BOOT_DONE = BOOT.handoff + BOOT.overlayFade;

/** Reduced-motion collapses the whole sequence into a short, calm reveal. */
export const BOOT_REDUCED = {
  wordmark: 0.2,
  tagline: 0.4,
  handoff: 1.0,
  done: 1.6,
} as const;
