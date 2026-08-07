import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { body } = await request.json();

  if (!body || typeof body !== "string" || !body.trim()) {
    return NextResponse.json({ error: "Note body is required" }, { status: 400 });
  }

  const note = await db.leadNote.create({
    data: { leadId: id, body: body.trim() },
  });

  return NextResponse.json(note);
}
