import { listStaff } from "@/lib/queries/staff";
import { getDepartments } from "@/lib/queries/lookup";
import { StaffManager } from "@/components/admin/StaffManager";

export default async function AdminStaffPage() {
  const [staff, departments] = await Promise.all([listStaff(), getDepartments()]);

  return <StaffManager initialStaff={staff} departments={departments} />;
}
