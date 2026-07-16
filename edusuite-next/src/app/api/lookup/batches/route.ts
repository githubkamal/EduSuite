import { NextResponse } from "next/server";
import { getBatches } from "@/lib/queries/lookup";

export async function GET() {
  const batches = await getBatches();
  return NextResponse.json(batches);
}
