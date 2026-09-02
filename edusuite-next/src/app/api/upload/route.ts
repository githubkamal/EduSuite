import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { requireSession } from "@/lib/requireSession";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "alumni");
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

// "image" (Profile Photo) stays restricted to actual images. "document"
// (Current Status uploads — College ID card, offer letter, etc.) accepts
// any file type; see extensionFor() below.
const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

// Known MIME types get a canonical extension; anything else falls back to
// the extension on the original filename (sanitized), or ".bin".
const KNOWN_TYPES: Record<string, string> = {
  ...IMAGE_TYPES,
  "application/pdf": ".pdf",
  "application/msword": ".doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
  "application/vnd.ms-excel": ".xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ".xlsx",
  "application/vnd.ms-powerpoint": ".ppt",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": ".pptx",
  "text/csv": ".csv",
  "text/plain": ".txt",
  "application/zip": ".zip",
};

function extensionFor(file: File): string {
  if (KNOWN_TYPES[file.type]) return KNOWN_TYPES[file.type];
  const fromName = path.extname(file.name || "").toLowerCase().replace(/[^a-z0-9.]/g, "");
  if (/^\.[a-z0-9]{1,10}$/.test(fromName)) return fromName;
  return ".bin";
}

export async function POST(req: NextRequest) {
  const { unauthorized } = await requireSession();
  if (unauthorized) return unauthorized;

  const formData = await req.formData();
  const file = formData.get("file");
  const kind = formData.get("kind") === "image" ? "image" : "document";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  let extension: string;
  if (kind === "image") {
    const imageExt = IMAGE_TYPES[file.type];
    if (!imageExt) {
      return NextResponse.json(
        { error: "Unsupported image type. Use JPEG, PNG, WEBP, or GIF." },
        { status: 400 }
      );
    }
    extension = imageExt;
  } else {
    extension = extensionFor(file);
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "File must be 5MB or smaller." }, { status: 400 });
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  const filename = `${randomUUID()}${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  return NextResponse.json({ url: `/api/uploads/alumni/${filename}` });
}
