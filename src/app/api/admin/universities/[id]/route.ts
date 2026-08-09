import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { universitySchema } from "@/lib/validation";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const university = await db.university.findUnique({ where: { id } });
  if (!university) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(university);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const parsed = universitySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const existing = await db.university.findFirst({
    where: { slug: parsed.data.slug, NOT: { id } },
  });
  if (existing) {
    return NextResponse.json({ error: "A university with this slug already exists" }, { status: 409 });
  }

  const { accreditation, programs, highlights, approvals, feePlans, ...rest } = parsed.data;
  const university = await db.university.update({
    where: { id },
    data: {
      ...rest,
      accreditation: JSON.stringify(accreditation),
      programs: JSON.stringify(programs),
      highlights: JSON.stringify(highlights),
      approvals: JSON.stringify(approvals),
      feePlans: feePlans ? JSON.stringify(feePlans) : null,
    },
  });

  return NextResponse.json(university);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await db.university.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
