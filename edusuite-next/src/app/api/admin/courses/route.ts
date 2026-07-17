import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireSession";
import { getDepartments, createDepartment } from "@/lib/queries/lookup";

export async function GET() {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;

  const departments = await getDepartments();
  return NextResponse.json(departments);
}

export async function POST(req: NextRequest) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = (await req.json()) as { name?: string };
  if (!body.name?.trim()) {
    return NextResponse.json({ error: "Course name is required." }, { status: 400 });
  }

  const departmentId = await createDepartment(body.name.trim());
  return NextResponse.json({ success: true, departmentId });
}
