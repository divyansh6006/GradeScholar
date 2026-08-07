import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { blogPostSchema } from "@/lib/validation";

export async function GET() {
  const posts = await db.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = blogPostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const existing = await db.blogPost.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
  }

  const { content, date, ...rest } = parsed.data;
  const post = await db.blogPost.create({
    data: {
      ...rest,
      date: new Date(date),
      content: JSON.stringify(content),
    },
  });

  return NextResponse.json(post, { status: 201 });
}
