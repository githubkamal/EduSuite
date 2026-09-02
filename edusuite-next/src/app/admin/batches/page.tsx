import { getBatches } from "@/lib/queries/lookup";
import { BatchManager } from "@/components/admin/BatchManager";

export default async function AdminBatchesPage() {
  const batches = await getBatches();

  return <BatchManager initialBatches={batches} />;
}
