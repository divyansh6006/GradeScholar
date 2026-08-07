import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { programSchema } from "@/lib/validation";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const program = await db.program.findUnique({ where: { id } });
  if (!program) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(program);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const parsed = programSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const existing = await db.program.findFirst({ where: { slug: parsed.data.slug, NOT: { id } } });
  if (existing) {
    return NextResponse.json({ error: "A program with this slug already exists" }, { status: 409 });
  }

  const { specializations, bestFor, outcomes, universities, ...rest } = parsed.data;
  const program = await db.program.update({
    where: { id },
    data: {
      ...rest,
      specializations: JSON.stringify(specializations),
      bestFor: JSON.stringify(bestFor),
      outcomes: JSON.stringify(outcomes),
      universities: JSON.stringify(universities),
    },
  });

  return NextResponse.json(program);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await db.program.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
