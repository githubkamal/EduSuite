import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "alumni");

// Matches the randomUUID() + extension filenames written by /api/upload.
// The extension is open-ended (Current Status documents can be any file
// type) but always alphanumeric and short — see extensionFor() there.
const SAFE_FILENAME = /^[a-f0-9-]+\.[a-z0-9]{1,10}$/i;

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".csv": "text/csv",
  ".txt": "text/plain",
  ".zip": "application/zip",
};

// Types safe to render inline in the browser. Everything else — and, in
// particular, anything an uploader could pass off as HTML/SVG/script and
// have the browser execute in this app's own origin — is forced to
// download instead via Content-Disposition, regardless of what its
// (attacker-controlled) declared MIME type claims to be.
const INLINE_TYPES = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".pdf"]);

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
    const extension = path.extname(filename).toLowerCase();
    const contentType = CONTENT_TYPES[extension] || "application/octet-stream";
    const disposition = INLINE_TYPES.has(extension) ? "inline" : `attachment; filename="${filename}"`;
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": disposition,
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
}
