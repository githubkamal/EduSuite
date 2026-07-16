import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/requireSession";
import { createAlumni } from "@/lib/queries/alumni";
import type { AlumniRecord } from "@/lib/types";

export async function POST(req: NextRequest) {
  const { unauthorized } = await requireSession();
  if (unauthorized) return unauthorized;

  const dto = (await req.json()) as Partial<AlumniRecord>;

  try {
    const alumniId = await createAlumni(dto);
    return NextResponse.json({ success: true, alumniId });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create alumni record.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
