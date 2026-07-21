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
  roleId: number;
  roleName: string;
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
       l.Email AS email, l.IsActive AS isActive, l.RoleId AS roleId, r.RoleName AS roleName
     FROM staffs s
     JOIN logins l ON l.Id = s.LoginId
     JOIN departments d ON d.DepartmentId = s.DepartmentId
     JOIN roles r ON r.RoleId = l.RoleId
     ORDER BY s.FullName`
  );
  return rows as StaffListItem[];
}

/** Deletes the staff profile and its login. Returns false if no such staff row exists. */
export async function deleteStaff(id: number): Promise<boolean> {
  const [rows] = await getPool().query<RowDataPacket[]>(
    "SELECT LoginId FROM staffs WHERE Id = ?",
    [id]
  );
  if (rows.length === 0) return false;
  const loginId = rows[0].LoginId as number;

  await getPool().query("DELETE FROM staffs WHERE Id = ?", [id]);
  await getPool().query("DELETE FROM logins WHERE Id = ?", [loginId]);
  return true;
}

/** Changes the role (Admin/Staff/Student) of the login backing a staff row. */
export async function updateStaffRole(id: number, roleId: number): Promise<boolean> {
  const [rows] = await getPool().query<RowDataPacket[]>(
    "SELECT LoginId FROM staffs WHERE Id = ?",
    [id]
  );
  if (rows.length === 0) return false;
  const loginId = rows[0].LoginId as number;

  await getPool().query("UPDATE logins SET RoleId = ? WHERE Id = ?", [roleId, loginId]);
  return true;
}
