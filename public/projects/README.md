# public/projects/<slug>/

Binary assets for each case study, served from the site root — e.g.
`public/projects/bigominds/cover.jpg` → `/projects/bigominds/cover.jpg`.

```
<slug>/
  cover.jpg      cover / hero image    (~1600×1000, jpg)
  desktop.jpg    desktop screenshot    (~1600×1000)
  mobile.jpg     mobile screenshot     (~500×950, tall)
  logo.svg       project logo / icon
  gallery/       extra images: 1.jpg, 2.jpg, …
  media/         videos / GIFs: demo.mp4, demo.gif
  docs/          optional PDFs / decks: overview.pdf, deck.pptx
```

Authoring text (metadata + markdown) lives in `content/projects/<slug>/`.
Full instructions: [content/projects/README.md](../../content/projects/README.md).

The site expects `.jpg` for cover/desktop/mobile — keep the extensions as above,
or update the resolver in `lib/projects/index.ts`. Missing images degrade
gracefully to a labelled placeholder, so projects can be registered before all
assets exist.
