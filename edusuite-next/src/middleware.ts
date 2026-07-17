import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { SESSION_COOKIE } from "@/lib/auth";

// Protects all /alumni/** pages, mirroring the [Authorize] guard the original
// app only had on DashboardController — here it covers Create/Edit too.
// /admin/** additionally requires the Admin role (also re-checked in
// src/app/admin/layout.tsx, which is the authoritative check).
export const config = {
  matcher: ["/alumni/:path*", "/admin/:path*"],
};

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.SESSION_SECRET);
      const { payload } = await jwtVerify(token, secret);

      if (req.nextUrl.pathname.startsWith("/admin") && payload.role !== "Admin") {
        return NextResponse.redirect(new URL("/alumni/dashboard", req.url));
      }

      return NextResponse.next();
    } catch {
      // fall through to redirect
    }
  }

  const loginUrl = new URL("/login", req.url);
  return NextResponse.redirect(loginUrl);
}
