import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/requireSession";
import { searchStudents, type TabulatorRequest } from "@/lib/queries/students";

/** Parity with the original AlumniController.GetData Tabulator-style endpoint (scaffolded, unused by any page). */
export async function POST(req: NextRequest) {
  const { unauthorized } = await requireSession();
  if (unauthorized) return unauthorized;

  const request = (await req.json()) as TabulatorRequest;
  const result = await searchStudents({
    page: request.page || 1,
    size: request.size || 10,
    sortField: request.sortField,
    sortDir: request.sortDir,
    filters: request.filters || [],
  });

  return NextResponse.json(result);
}
