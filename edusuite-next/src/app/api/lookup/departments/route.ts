import { NextResponse } from "next/server";
import { getDepartments } from "@/lib/queries/lookup";

export async function GET() {
  const departments = await getDepartments();
  return NextResponse.json(departments);
}
