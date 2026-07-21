import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "alumni");

// Matches the randomUUID() + extension filenames written by /api/upload.
const SAFE_FILENAME = /^[a-f0-9-]+\.(jpg|jpeg|png|webp|gif)$/i;

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

// next start snapshots the public/ directory at boot, so files written there
// after the server has started (i.e. every upload) 404 when requested
// through Next's static file serving. Reading the file directly here on
// every request sidesteps that.
export async function GET(req: NextRequest, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;

  if (!SAFE_FILENAME.test(filename)) {
    return NextResponse.json({ error: "Invalid filename." }, { status: 400 });
  }

  try {
    const buffer = await readFile(path.join(UPLOAD_DIR, filename));
    const contentType = CONTENT_TYPES[path.extname(filename).toLowerCase()] || "application/octet-stream";
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
}
