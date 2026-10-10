import type { MetadataRoute } from "next";
import { DOCS } from "@/lib/docs";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/showcase", ...DOCS.map((d) => d.href)].map((path) => ({
    url: new URL(path, SITE_URL).href,
  }));
}
