# Drop-in assets

The site renders fully without these (elegant fallbacks stand in). Add the real
files at these exact paths and they appear automatically — no code changes.

## Logo (optional)
The mark is drawn in code (SVG in the nav/footer, a 3D V monolith in the hero),
so a logo file is **not required**. If you want your raster mark anywhere, drop:
```
public/logo.png            # transparent PNG, square, ~512px
```

## Founder photography — /public/founder/
Used by the scroll-crossfade "About" section (5 shots) and the Founder coda.
```
public/founder/1.jpg       # Leadership (formal)          — portrait, ~1200×1500
public/founder/2.jpg       # Public speaking
public/founder/3.jpg       # Technical presentation
public/founder/4.jpg       # Teaching / mentoring
public/founder/5.jpg       # Casual portrait
public/founder/portrait.jpg # used in the closing Founder section
```

## Projects — /public/projects/<slug>/
Each case study owns a folder. The immersive chapters use `desktop.jpg` and
`mobile.jpg`; `cover.jpg`, `gallery/`, `media/`, and `docs/` are available for
future use.
```
public/projects/bigominds/desktop.jpg   ~1600×1000
public/projects/bigominds/mobile.jpg     ~500×950
public/projects/bigominds/cover.jpg
public/projects/ithynx/…  public/projects/maxibio/…  public/projects/squaddle/…
```
Full convention + how to add a new project (plug-and-play):
**[content/projects/README.md](content/projects/README.md)**.

## Editing copy
Site-wide copy (timeline, pipeline, deep-tech, achievements, contact) lives in
`lib/content.ts`. Per-project copy lives in `content/projects/<slug>/meta.json`.
