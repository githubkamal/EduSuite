import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireSession";
import { getBatches, createBatch } from "@/lib/queries/lookup";

export async function GET() {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;

  const batches = await getBatches();
  return NextResponse.json(batches);
}

export async function POST(req: NextRequest) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = (await req.json()) as { name?: string };
  if (!body.name?.trim()) {
    return NextResponse.json({ error: "Batch name is required." }, { status: 400 });
  }

  try {
    const batchId = await createBatch(body.name.trim());
    return NextResponse.json({ success: true, batchId });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create batch.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
