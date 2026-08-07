import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getPostBySlug } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="py-16 lg:py-24">
      <Container className="max-w-3xl">
        <span className="inline-flex items-center rounded-full bg-gold-500/10 px-3 py-1 text-xs font-semibold text-gold-700">
          {post.category}
        </span>
        <h1 className="mt-5 font-display text-3xl sm:text-4xl font-semibold text-green-950 text-balance">
          {post.title}
        </h1>
        <p className="mt-3 text-sm text-green-900/45">
          {new Date(post.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })} · {post.readTime}
        </p>

        <div className="mt-10 space-y-6">
          {post.content.map((para, i) => (
            <p key={i} className="text-base leading-relaxed text-green-900/70">
              {para}
            </p>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-green-950 px-8 py-10 text-center">
          <h2 className="font-display text-xl font-semibold text-white">
            Want guidance specific to your situation?
          </h2>
          <p className="mt-2 text-sm text-white/60">
            Talk to a career strategist — it&apos;s free.
          </p>
          <Button href="/contact" size="md" className="mt-6">
            Book Free Consultation
          </Button>
        </div>
      </Container>
    </article>
  );
}
