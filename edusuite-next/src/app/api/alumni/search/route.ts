import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/requireSession";
import { searchAlumni } from "@/lib/queries/alumni";
import type { AlumniSearchRequest } from "@/lib/types";

export async function POST(req: NextRequest) {
  const { unauthorized } = await requireSession();
  if (unauthorized) return unauthorized;

  const request = (await req.json()) as AlumniSearchRequest;
  const result = await searchAlumni({
    page: request.page || 1,
    pageSize: request.pageSize || 10,
    search: request.search,
    sortColumn: request.sortColumn,
    sortDir: request.sortDir,
    filters: request.filters,
  });

  return NextResponse.json({ data: result.data, total: result.total });
}
