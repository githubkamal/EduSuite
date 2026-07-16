import { NextRequest, NextResponse } from "next/server";
import { findLoginForAuth } from "@/lib/queries/logins";
import { verifyPassword } from "@/lib/password";
import { signSession, setSessionCookie } from "@/lib/auth";

interface LoginBody {
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as LoginBody;

  if (!body.email || !body.password) {
    return NextResponse.json({ error: "Invalid username or password." }, { status: 400 });
  }

  const user = await findLoginForAuth(body.email);
  if (!user || !(await verifyPassword(body.password, user.passwordHash))) {
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  }

  const token = await signSession({
    loginId: user.id,
    email: user.email,
    name: user.fullName || "Administrator",
    roleId: user.roleId,
    role: user.roleName,
  });
  await setSessionCookie(token);

  return NextResponse.json({
    success: true,
    redirectTo: "/alumni/dashboard",
    user: { name: user.fullName || "Administrator", email: user.email, role: user.roleName },
  });
}
