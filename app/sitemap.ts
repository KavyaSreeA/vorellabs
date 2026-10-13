import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://www.vorellabs.in/", changeFrequency: "monthly", priority: 1 }];
}
