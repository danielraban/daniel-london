import type { MetadataRoute } from "next";
import { profile } from "@/lib/content/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/work", "/projects", "/music", "/uses", "/contact"];

  return routes.map((route) => ({
    url: `${profile.site}${route}`,
    lastModified: new Date(),
  }));
}
