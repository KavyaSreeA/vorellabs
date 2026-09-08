# Drop-in assets

The site renders fully without these (elegant fallbacks stand in). Add the real
files at these exact paths and they appear automatically — no code changes.

## Logo (optional)
The mark is drawn in code (SVG in the nav/footer), so a logo file is **not
required**. If you want your raster mark anywhere, drop:
```
public/logo.png            # transparent PNG, square, ~512px
```

## Founder photography — /public/founder/
Used by the scroll-crossfade "About" section and the Founder coda. The photo
list is an array in `lib/content.ts` (`FOUNDER.photos`) — filenames don't need
to follow a fixed convention, just point `src`/the coda `<img>` at whatever's
actually in this folder and give each a short caption.
```
public/founder/image.png    # Leadership — St. Joseph's, formal, trophies
public/founder/kavya2.jpg   # Technical presentation — at the podium
public/founder/kavya5.jpg   # Smart India Hackathon — Winner (also the Founder coda portrait)
public/founder/kavya3.jpg   # Off the clock — casual portrait
```
Wired in [`lib/content.ts`](lib/content.ts) (`FOUNDER.photos`) and
[`components/Founder.tsx`](components/Founder.tsx) (closing portrait).

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
