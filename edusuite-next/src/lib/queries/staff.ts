import { getPool } from "@/lib/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export interface NewStaff {
  loginId: number;
  staffCode: string;
  fullName: string;
  departmentId: number;
}

export interface StaffListItem {
  id: number;
  loginId: number;
  staffCode: string;
  fullName: string;
  departmentId: number;
  departmentName: string;
  email: string;
  isActive: boolean;
}

export async function createStaff(staff: NewStaff): Promise<number> {
  const [result] = await getPool().query<ResultSetHeader>(
    "INSERT INTO staffs (LoginId, StaffCode, FullName, DepartmentId) VALUES (?, ?, ?, ?)",
    [staff.loginId, staff.staffCode, staff.fullName, staff.departmentId]
  );
  return result.insertId;
}

export async function listStaff(): Promise<StaffListItem[]> {
  const [rows] = await getPool().query<RowDataPacket[]>(
    `SELECT
       s.Id AS id, s.LoginId AS loginId, s.StaffCode AS staffCode, s.FullName AS fullName,
       s.DepartmentId AS departmentId, d.DepartmentName AS departmentName,
       l.Email AS email, l.IsActive AS isActive
     FROM staffs s
     JOIN logins l ON l.Id = s.LoginId
     JOIN departments d ON d.DepartmentId = s.DepartmentId
     ORDER BY s.FullName`
  );
  return rows as StaffListItem[];
}
