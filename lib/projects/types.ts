/**
 * Project content model. Authoring lives in `content/projects/<slug>/` (a
 * meta.json + index.md); binary assets live in `public/projects/<slug>/`.
 * `lib/projects/index.ts` binds the two into the resolved `Project` shape the
 * UI consumes. See content/projects/README.md to add a new project.
 */

export type ProjectLinks = {
  live?: string;
  repo?: string;
  docs?: string;
};

/** Raw authoring shape — matches content/projects/<slug>/meta.json. */
export type ProjectMeta = {
  name: string;
  url?: string; // display URL, no protocol
  year: string;
  role: string;
  statement: string;
  tags: string[];
  stack: string[];
  process: string;
  architecture: string;
  outcome: string;
  highlight?: string; // an achievement/recognition to surface in this case study
  links?: ProjectLinks;
  accent: string;
  gallery?: string[]; // filenames inside /public/projects/<slug>/gallery/
  media?: string[]; // filenames inside /public/projects/<slug>/media/
  docs?: string[]; // filenames inside /public/projects/<slug>/docs/
};

/** Resolved shape used across the UI (asset paths are absolute /public URLs). */
export type Project = ProjectMeta & {
  slug: string;
  assets: {
    cover: string;
    desktop: string;
    mobile: string;
    logo: string;
    gallery: string[];
    media: string[];
    docs: string[];
  };
};
