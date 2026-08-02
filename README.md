# Vorel Labs

A cinematic, editorial website for **Vorel Labs** — an AI-first software engineering
and deep-tech laboratory. Dark, luxurious, oversized typography, a 3D metallic V
monolith, and scroll-driven storytelling. Positioned closer to Apple / Linear /
Vercel / OpenAI than a traditional agency.

## Stack

- **Next.js 14** (App Router) + **TypeScript** — SSR/SEO + static export
- **Tailwind CSS** — design tokens (matte black, metallic silver, glass)
- **React Three Fiber** + **drei** + **three** — the hero V monolith
- **Framer Motion** — reveals, parallax, scroll-driven sequences
- **GSAP** — magnetic buttons
- **Lenis** — smooth scroll (reduced-motion aware)
- **Inter** + **Space Grotesk** via `next/font`

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. (After a `npm run build`, restart `npm run dev` so the
dev cache is clean.)

## The cinematic stage (one continuous shot)

The loading sequence and the hero share **one persistent R3F canvas**
(`components/cinematic/CinematicStage.tsx`) that never unmounts — so the loader's
metallic V *becomes* the hero monolith with no page cut. All timing lives in
[`lib/boot.ts`](lib/boot.ts); the DOM overlay and the 3D stage read the same clock.

- `CinematicStage` — persistent Canvas: HDR `Environment`, ACES tone mapping,
  subtle `Bloom` (postprocessing), fades out as you scroll past the hero.
- `VMonolith` — ~1,300 faceted metallic particles assemble and lock into the V,
  a real specular highlight sweeps across it, it settles ~4.5°, then hands off
  (scales forward + recenters) into a slow continuous hero rotation.
- `Dust` — barely-there floating ambient particles.
- `LoadingOverlay` — DOM layer: vignette, volumetric glow, film grain, drifting
  fog, `VOREL LABS` letter by letter, tagline, and evolving system messages
  (Initializing Research… → Launching Vorel…). No percentage.

## Experience map (`app/page.tsx`)

1. **Boot → Hero** — the shared stage above, flowing straight into…
2. **Hero** — oversized "We engineer what's next." over the same rotating metallic
   V. Nav is hidden until you scroll; typography reveals exactly as the logo hands
   off (`booted`).
3. **FounderStory** — sticky split; photography crossfades on scroll (left),
   founder statement (right)
4. **Timeline** — animated vertical timeline with a scroll-drawn rail
5. **Interlude** — "Ideas don't scale. Execution does."
6. **Work** — each project (BigOminds, ITHYNX, MAXIBIO, Squaddle) is a full
   immersive chapter: statement, device reveals, process, engineering, outcome
7. **Interlude** — "Software. AI. Research."
8. **Pipeline** — Research → Prototype → Engineering → Production → Scale
9. **DeepTech** — animated node constellation across the intelligence stack
10. **Achievements** — "Built. Presented. Won." editorial reveals (SIH Winner…)
11. **Founder** — "The people behind the engineering." + contact
12. **Contact** — "Let's build something worth remembering." (magnetic CTA)
13. **Footer**

## Content & assets

- All copy lives in [`lib/content.ts`](lib/content.ts).
- Real images are drop-in — see [`ASSETS.md`](ASSETS.md). The site renders fully
  with elegant fallbacks until you add them.

## Notes

- Everything respects `prefers-reduced-motion` (Lenis, monolith spin, reveals).
- `@react-three/drei` pulls an older `three-mesh-bvh` that raises an `npm audit`
  warning — transitive and unused by this site's code.
