# Projects — content & assets

Case studies are **plug-and-play**. Each project owns two folders:

```
content/projects/<slug>/     # authoring (text)
  meta.json                  # metadata: tech stack, links, tags, copy
  index.md                   # long-form case study (optional, for future MDX)

public/projects/<slug>/      # binaries (served at /projects/<slug>/…)
  cover.jpg                  # cover / hero image        (~1600×1000)
  desktop.jpg                # desktop screenshot         (~1600×1000)
  mobile.jpg                 # mobile screenshot          (~500×950)
  logo.svg                   # project logo / icon
  gallery/                   # extra images (1.jpg, 2.jpg, …)
  media/                     # videos / GIFs (demo.mp4, demo.gif)
  docs/                      # optional PDFs / decks (overview.pdf, deck.pptx)
```

## Add a new project (3 steps)

1. **Assets** — create `public/projects/<slug>/` and drop in `cover.jpg`,
   `desktop.jpg`, `mobile.jpg`, `logo.svg`, plus anything under
   `gallery/ media/ docs/`.
2. **Content** — create `content/projects/<slug>/meta.json` (copy an existing
   one) and, optionally, `index.md`.
3. **Register** — add one line to `ENTRIES` in
   [`lib/projects/index.ts`](../../lib/projects/index.ts):
   ```ts
   import myproj from "@/content/projects/<slug>/meta.json";
   // …
   ["<slug>", myproj as ProjectMeta],
   ```

That's it — the Work section, asset URLs, tags, links, and device mockups all
pick it up automatically. The site renders with graceful fallbacks if an image
is missing, so you can register a project before every asset is ready.

## meta.json fields

| field | required | notes |
|-------|----------|-------|
| `name` | ✓ | Project title |
| `url` |  | Display URL shown in the browser frame (no protocol) |
| `year`, `role` | ✓ | Shown in the chapter marker |
| `statement` | ✓ | One-line hook |
| `tags` | ✓ | Short chips (e.g. "Web App", "Production") |
| `stack` | ✓ | Technologies used |
| `process`, `architecture`, `outcome` | ✓ | The three detail columns |
| `highlight` |  | A recognition/award to surface in this case study |
| `links` |  | `{ live, repo, docs }` |
| `accent` | ✓ | CSS gradient used behind the screenshots |
| `desktopFile`, `mobileFile`, `coverFile` |  | Override the default filename (default: `desktop.jpg`, `mobile.jpg`, `cover.jpg`). Use this if your screenshot is a `.png` or has a different name — no need to rename the file. |
| `gallery`, `media`, `docs` |  | Filenames inside the matching `public/` subfolders |

The resolved `Project` type (with absolute asset URLs) lives in
[`lib/projects/types.ts`](../../lib/projects/types.ts).
