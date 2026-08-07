import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = file.type === "image/svg+xml" ? "svg" : (file.type.split("/")[1] ?? "png");
  const filename = `logo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const destDir = path.join(process.cwd(), "public", "logos");
  await fs.mkdir(destDir, { recursive: true });
  await fs.writeFile(path.join(destDir, filename), buffer);

  let width = 200;
  let height = 80;
  if (file.type !== "image/svg+xml") {
    const meta = await sharp(buffer).metadata();
    width = meta.width ?? width;
    height = meta.height ?? height;
  }

  return NextResponse.json({ path: `/logos/${filename}`, width, height });
}
