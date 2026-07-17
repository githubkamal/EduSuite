import { NextRequest, NextResponse } from "next/server";
import { requireSession, requireAdmin } from "@/lib/requireSession";
import { getAlumniById, updateAlumni, deleteAlumni } from "@/lib/queries/alumni";
import type { AlumniRecord } from "@/lib/types";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { unauthorized } = await requireSession();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const alumniId = parseInt(id, 10);
  if (!Number.isFinite(alumniId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const alumni = await getAlumniById(alumniId);
  if (!alumni) {
    return NextResponse.json({ error: "Alumni not found" }, { status: 404 });
  }
  return NextResponse.json(alumni);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { unauthorized } = await requireSession();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const alumniId = parseInt(id, 10);
  if (!Number.isFinite(alumniId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const dto = (await req.json()) as Partial<AlumniRecord>;

  try {
    const existing = await getAlumniById(alumniId);
    if (!existing) {
      return NextResponse.json({ error: "Alumni not found" }, { status: 404 });
    }
    await updateAlumni(alumniId, dto);
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update alumni record.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

/** Only Admin accounts can delete alumni records. */
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const alumniId = parseInt(id, 10);
  if (!Number.isFinite(alumniId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const existing = await getAlumniById(alumniId);
  if (!existing) {
    return NextResponse.json({ error: "Alumni not found" }, { status: 404 });
  }

  await deleteAlumni(alumniId);
  return NextResponse.json({ success: true });
}
