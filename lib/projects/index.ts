import type { Project, ProjectMeta } from "./types";

// Authoring metadata (content/projects/<slug>/meta.json).
import bigominds from "@/content/projects/bigominds/meta.json";
import ithynx from "@/content/projects/ithynx/meta.json";
import maxibio from "@/content/projects/maxibio/meta.json";
import squaddle from "@/content/projects/squaddle/meta.json";

/**
 * Registry of case studies. To ADD A PROJECT (plug-and-play):
 *   1. Create `public/projects/<slug>/` (cover.jpg, desktop.jpg, mobile.jpg,
 *      logo.svg, + gallery/ media/ docs/). See public/projects/README.md.
 *   2. Create `content/projects/<slug>/meta.json` and `index.md`.
 *   3. Add one line to ENTRIES below: `[slug, meta]`.
 * Everything else (asset URLs, the Work section) picks it up automatically.
 */
const ENTRIES: [string, ProjectMeta][] = [
  ["bigominds", bigominds as ProjectMeta],
  ["ithynx", ithynx as ProjectMeta],
  ["maxibio", maxibio as ProjectMeta],
  ["squaddle", squaddle as ProjectMeta],
];

const base = (slug: string) => `/projects/${slug}`;

function resolve(slug: string, meta: ProjectMeta): Project {
  const root = base(slug);
  return {
    ...meta,
    slug,
    assets: {
      cover: `${root}/${meta.coverFile ?? "cover.jpg"}`,
      desktop: `${root}/${meta.desktopFile ?? "desktop.jpg"}`,
      mobile: `${root}/${meta.mobileFile ?? "mobile.jpg"}`,
      logo: `${root}/logo.svg`,
      gallery: (meta.gallery ?? []).map((f) => `${root}/gallery/${f}`),
      media: (meta.media ?? []).map((f) => `${root}/media/${f}`),
      docs: (meta.docs ?? []).map((f) => `${root}/docs/${f}`),
    },
  };
}

export const PROJECTS: Project[] = ENTRIES.map(([slug, meta]) =>
  resolve(slug, meta)
);

export const getProject = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug);

export type { Project, ProjectMeta } from "./types";
