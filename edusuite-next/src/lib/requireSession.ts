import { NextResponse } from "next/server";
import { getSession, type SessionPayload } from "@/lib/auth";

/** Returns the session, or an already-built 401 NextResponse to return early. */
export async function requireSession(): Promise<
  { session: SessionPayload; unauthorized: null } | { session: null; unauthorized: NextResponse }
> {
  const session = await getSession();
  if (!session) {
    return {
      session: null,
      unauthorized: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  return { session, unauthorized: null };
}

/** Same as requireSession, but also requires the Admin role. */
export async function requireAdmin(): Promise<
  { session: SessionPayload; unauthorized: null } | { session: null; unauthorized: NextResponse }
> {
  const session = await getSession();
  if (!session) {
    return {
      session: null,
      unauthorized: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  if (session.role !== "Admin") {
    return {
      session: null,
      unauthorized: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }
  return { session, unauthorized: null };
}
