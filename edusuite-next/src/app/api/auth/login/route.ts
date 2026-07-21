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

  // Admin logins have no Staff/Student profile row, so fullName is always
  // blank for them — "Administrator" is the intended display name in that
  // case. For any other role, a blank fullName means a missing profile row
  // (a data problem), so fall back to the email rather than mislabeling
  // them as an administrator.
  const displayName = user.fullName || (user.roleName === "Admin" ? "Administrator" : user.email);

  const token = await signSession({
    loginId: user.id,
    email: user.email,
    name: displayName,
    roleId: user.roleId,
    role: user.roleName,
  });
  await setSessionCookie(token);

  return NextResponse.json({
    success: true,
    redirectTo: "/alumni/dashboard",
    user: { name: displayName, email: user.email, role: user.roleName },
  });
}
