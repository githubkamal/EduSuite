import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireSession";
import { updateDepartment, deleteDepartment } from "@/lib/queries/lookup";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const departmentId = parseInt(id, 10);
  if (!Number.isFinite(departmentId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const body = (await req.json()) as { name?: string };
  if (!body.name?.trim()) {
    return NextResponse.json({ error: "Course name is required." }, { status: 400 });
  }

  await updateDepartment(departmentId, body.name.trim());
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const departmentId = parseInt(id, 10);
  if (!Number.isFinite(departmentId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    await deleteDepartment(departmentId);
    return NextResponse.json({ success: true });
  } catch (err) {
    const code = (err as { code?: string })?.code;
    if (code === "ER_ROW_IS_REFERENCED_2" || code === "ER_ROW_IS_REFERENCED") {
      return NextResponse.json(
        { error: "Cannot delete: this course is still assigned to alumni or students." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Failed to delete course." }, { status: 400 });
  }
}
