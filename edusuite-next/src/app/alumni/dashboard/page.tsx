import { getDepartments, getBatches } from "@/lib/queries/lookup";
import { getSession } from "@/lib/auth";
import { DashboardGrid } from "@/components/DashboardGrid";

export default async function DashboardPage() {
  const [departments, batches, session] = await Promise.all([
    getDepartments(),
    getBatches(),
    getSession(),
  ]);

  return (
    <DashboardGrid
      departments={departments}
      batches={batches}
      isAdmin={session?.role === "Admin"}
    />
  );
}
