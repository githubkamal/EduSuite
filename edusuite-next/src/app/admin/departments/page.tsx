import { getDepartments } from "@/lib/queries/lookup";
import { DepartmentManager } from "@/components/admin/DepartmentManager";

export default async function AdminDepartmentsPage() {
  const departments = await getDepartments();

  return <DepartmentManager initialDepartments={departments} />;
}
