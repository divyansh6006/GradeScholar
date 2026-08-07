import { NextResponse } from "next/server";
import { getUniversities } from "@/lib/data";

export async function GET() {
  const universities = await getUniversities();
  return NextResponse.json(universities);
}
