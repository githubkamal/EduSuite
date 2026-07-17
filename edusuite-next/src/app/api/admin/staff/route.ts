import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireSession";
import { listStaff, createStaff } from "@/lib/queries/staff";
import { userExists, createLogin } from "@/lib/queries/logins";
import { hashPassword } from "@/lib/password";

export async function GET() {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;

  const staff = await listStaff();
  return NextResponse.json(staff);
}

interface CreateStaffBody {
  fullName: string;
  email: string;
  password: string;
  departmentId: number;
  staffCode: string;
}

export async function POST(req: NextRequest) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = (await req.json()) as CreateStaffBody;

  if (!body.fullName || !body.email || !body.password || !body.departmentId || !body.staffCode) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (await userExists(body.email)) {
    return NextResponse.json({ error: "Email already exists." }, { status: 400 });
  }

  const passwordHash = await hashPassword(body.password);
  const loginId = await createLogin(body.email, passwordHash, 2); // 2 = Staff
  await createStaff({
    loginId,
    fullName: body.fullName,
    departmentId: body.departmentId,
    staffCode: body.staffCode,
  });

  return NextResponse.json({ success: true });
}
