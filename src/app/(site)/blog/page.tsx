import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getBlogPosts } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Industry Insights — MBA Rankings, Salary Reports & Guides",
  description: `In-depth guides on Online MBA rankings, salary reports, specializations and admissions — from ${siteConfig.name}.`,
};

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Industry Insights"
          title="Research, rankings and salary data — not fluff"
          align="center"
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-green-900/8 bg-white p-7 transition-all hover:-translate-y-1 hover:border-gold-500/30 hover:shadow-[0_20px_50px_-20px_rgba(14,43,8,0.25)]"
            >
              <span className="inline-flex w-fit items-center rounded-full bg-gold-500/10 px-2.5 py-1 text-xs font-semibold text-gold-700">
                {post.category}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-green-950 leading-snug">
                {post.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-green-900/60">{post.excerpt}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-green-900/40">{post.readTime}</span>
                <span className="flex items-center gap-1 text-sm font-semibold text-green-900/50 group-hover:text-gold-600">
                  Read
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
