import { getDepartments, getBatches } from "@/lib/queries/lookup";
import { DashboardGrid } from "@/components/DashboardGrid";

export default async function DashboardPage() {
  const [departments, batches] = await Promise.all([getDepartments(), getBatches()]);

  return <DashboardGrid departments={departments} batches={batches} />;
}
