import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { universitySchema } from "@/lib/validation";

export async function GET() {
  const universities = await db.university.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(universities);
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = universitySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const existing = await db.university.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return NextResponse.json({ error: "A university with this slug already exists" }, { status: 409 });
  }

  const { accreditation, programs, highlights, approvals, feesMin, feesMax, ...rest } = parsed.data;
  const university = await db.university.create({
    data: {
      ...rest,
      feesMin,
      feesMax,
      accreditation: JSON.stringify(accreditation),
      programs: JSON.stringify(programs),
      highlights: JSON.stringify(highlights),
      approvals: JSON.stringify(approvals),
    },
  });

  return NextResponse.json(university, { status: 201 });
}
