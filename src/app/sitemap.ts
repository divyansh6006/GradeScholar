import type { MetadataRoute } from "next";
import { getUniversities, getPrograms, getBlogPosts } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

const BASE_URL = siteConfig.url;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [universities, programs, blogPosts] = await Promise.all([
    getUniversities(),
    getPrograms(),
    getBlogPosts(),
  ]);

  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/universities",
    "/programs",
    "/compare-universities",
    "/career-assessment",
    "/scholarships",
    "/success-stories",
    "/blog",
    "/faq",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));

  const universityRoutes = universities.map((u) => ({
    url: `${BASE_URL}/universities/${u.slug}`,
    lastModified: new Date(),
  }));

  const programRoutes = programs.map((p) => ({
    url: `${BASE_URL}/programs/${p.slug}`,
    lastModified: new Date(),
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticRoutes, ...universityRoutes, ...programRoutes, ...blogRoutes];
}
