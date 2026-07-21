import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireSession";
import { deleteStaff, updateStaffRole } from "@/lib/queries/staff";

const VALID_ROLE_IDS = [1, 2, 3]; // Admin, Staff, Student

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const staffId = parseInt(id, 10);
  if (!Number.isFinite(staffId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const deleted = await deleteStaff(staffId);
  if (!deleted) {
    return NextResponse.json({ error: "Staff not found." }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}

interface UpdateRoleBody {
  roleId: number;
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const staffId = parseInt(id, 10);
  if (!Number.isFinite(staffId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const body = (await req.json()) as UpdateRoleBody;
  if (!VALID_ROLE_IDS.includes(body.roleId)) {
    return NextResponse.json({ error: "Invalid role." }, { status: 400 });
  }

  const updated = await updateStaffRole(staffId, body.roleId);
  if (!updated) {
    return NextResponse.json({ error: "Staff not found." }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
