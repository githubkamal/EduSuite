import { getPool } from "@/lib/db";
import type { ResultSetHeader } from "mysql2";

export interface NewStaff {
  loginId: number;
  staffCode: string;
  fullName: string;
  departmentId: number;
}

export async function createStaff(staff: NewStaff): Promise<number> {
  const [result] = await getPool().query<ResultSetHeader>(
    "INSERT INTO staffs (LoginId, StaffCode, FullName, DepartmentId) VALUES (?, ?, ?, ?)",
    [staff.loginId, staff.staffCode, staff.fullName, staff.departmentId]
  );
  return result.insertId;
}
