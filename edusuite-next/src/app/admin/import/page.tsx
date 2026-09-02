import { getDepartments, getBatches } from "@/lib/queries/lookup";
import { BulkImport } from "@/components/admin/BulkImport";

export default async function AdminBulkImportPage() {
  const [departments, batches] = await Promise.all([
    getDepartments(),
    getBatches(),
  ]);

  return <BulkImport departments={departments} batches={batches} />;
}
