# Vorel Labs

A clean, editorial website for **Vorel Labs** — an AI-first software engineering
and deep-tech laboratory. Light, calm, oversized typography, generous whitespace,
and restrained motion. Positioned closer to Linear / Vercel / Stripe than a
traditional agency site.

## Stack

- **Next.js 14** (App Router) + **TypeScript** — SSR/SEO + static export
- **Tailwind CSS** — design tokens (off-white, near-black ink, graphite metal)
- **Framer Motion** — scroll reveals and light entrance transitions
- **GSAP** — the magnetic button effect on the Contact CTA
- **Lenis** — smooth scroll (reduced-motion aware)
- **Inter** + **Space Grotesk** via `next/font`

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. (After a `npm run build`, restart `npm run dev` so the
dev cache is clean.)

## Page structure (`components/Homepage.tsx`)

The site renders immediately — no loading screen or intro sequence.

1. **Hero** — "We engineer what's next." with two CTAs, clean typography only
2. **FounderStory** — sticky split; photography crossfades on scroll (left),
   founder statement (right)
3. **Timeline** — vertical journey timeline with a scroll-drawn progress rail
4. **Interlude** — "Ideas don't scale. Execution does."
5. **Work** — each project (BigOminds, ITHYNX, MAXIBIO, Squaddle) is a full
   case-study chapter: statement, device screenshots, process, engineering, outcome
6. **Interlude** — "Software. AI. Research."
7. **Pipeline** — a sticky, scroll-driven explorer: Research → Prototype →
   Engineering → Production → Scale
8. **DeepTech** — a node diagram across the intelligence stack
9. **Engagement** — three pricing/engagement panels (Launch, Growth, Product
   Engineering)
10. **Founder** — portrait, statement, and recognition (hackathon wins etc.)
11. **Contact** — closing CTA with a magnetic email button
12. **Footer**

## Content & assets

- Site-wide copy lives in [`lib/content.ts`](lib/content.ts).
- Per-project copy lives in `content/projects/<slug>/meta.json` — see
  [`content/projects/README.md`](content/projects/README.md) to add a new one.
- Real images are drop-in — see [`ASSETS.md`](ASSETS.md). The site renders fully
  with elegant fallbacks until you add them.

## Notes

- Everything respects `prefers-reduced-motion`.
- No 3D/canvas dependencies — kept intentionally lightweight.
