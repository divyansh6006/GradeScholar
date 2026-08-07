import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leadSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const lead = await db.lead.create({
    data: {
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      program: parsed.data.program,
      university: parsed.data.university || null,
      experience: parsed.data.experience,
      source: parsed.data.source || "website",
    },
  });

  return NextResponse.json({ ok: true, id: lead.id });
}
