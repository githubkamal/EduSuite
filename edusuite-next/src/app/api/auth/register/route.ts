import { NextRequest, NextResponse } from "next/server";
import { userExists, createLogin } from "@/lib/queries/logins";
import { createStaff } from "@/lib/queries/staff";
import { createStudent } from "@/lib/queries/students";
import { hashPassword } from "@/lib/password";

interface RegisterBody {
  fullName: string;
  email: string;
  password: string;
  roleId: number;
  departmentId: number;
  staffCode?: string;
  rollNumber?: string;
  batchId?: number;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as RegisterBody;

  if (!body.fullName || !body.email || !body.password || !body.roleId || !body.departmentId) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (await userExists(body.email)) {
    return NextResponse.json({ error: "Email already exists." }, { status: 400 });
  }

  const passwordHash = await hashPassword(body.password);
  const loginId = await createLogin(body.email, passwordHash, body.roleId);

  if (body.rollNumber) {
    await createStudent({
      loginId,
      fullName: body.fullName,
      batchId: body.batchId ?? 0,
      rollNumber: body.rollNumber,
      departmentId: body.departmentId,
    });
  } else {
    await createStaff({
      loginId,
      fullName: body.fullName,
      departmentId: body.departmentId,
      staffCode: body.staffCode ?? "",
    });
  }

  return NextResponse.json({ success: true });
}
