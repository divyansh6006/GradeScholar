import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { programSchema } from "@/lib/validation";

export async function GET() {
  const programs = await db.program.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(programs);
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = programSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const existing = await db.program.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return NextResponse.json({ error: "A program with this slug already exists" }, { status: 409 });
  }

  const { specializations, bestFor, outcomes, universities, ...rest } = parsed.data;
  const program = await db.program.create({
    data: {
      ...rest,
      specializations: JSON.stringify(specializations),
      bestFor: JSON.stringify(bestFor),
      outcomes: JSON.stringify(outcomes),
      universities: JSON.stringify(universities),
    },
  });

  return NextResponse.json(program, { status: 201 });
}
