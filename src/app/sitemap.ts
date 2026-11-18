import { readdirSync } from "fs";
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/projects`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/map`, changeFrequency: "yearly", priority: 0.5 },
  ];

  let posts: MetadataRoute.Sitemap = [];
  try {
    posts = readdirSync("src/content/posts")
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => ({
        url: `${SITE_URL}/blog/${file.replace(/\.mdx$/, "")}`,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
  } catch {
    posts = [];
  }

  return [...staticRoutes, ...posts];
}
