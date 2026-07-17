import { getPool } from "@/lib/db";
import type { Department, Batch, Role } from "@/lib/types";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export async function getDepartments(): Promise<Department[]> {
  const [rows] = await getPool().query<RowDataPacket[]>(
    "SELECT DepartmentId AS departmentId, DepartmentName AS departmentName FROM departments ORDER BY DepartmentName"
  );
  return rows as Department[];
}

export async function getBatches(): Promise<Batch[]> {
  const [rows] = await getPool().query<RowDataPacket[]>(
    "SELECT BatchId AS batchId, BatchName AS batchName FROM batchs ORDER BY BatchName"
  );
  return rows as Batch[];
}

export async function getRoles(): Promise<Role[]> {
  const [rows] = await getPool().query<RowDataPacket[]>(
    "SELECT RoleId AS roleId, RoleName AS roleName FROM roles ORDER BY RoleId"
  );
  return rows as Role[];
}

// Departments double as the "courses" (BSc CS, BCA, MSc CS, MCA, ...) offered.
export async function createDepartment(name: string): Promise<number> {
  const [result] = await getPool().query<ResultSetHeader>(
    "INSERT INTO departments (DepartmentName, ModifiedBy) VALUES (?, 0)",
    [name]
  );
  return result.insertId;
}

export async function updateDepartment(id: number, name: string): Promise<void> {
  await getPool().query(
    "UPDATE departments SET DepartmentName = ? WHERE DepartmentId = ?",
    [name, id]
  );
}

/** Throws if the department is still referenced by alumni/students (FK restrict). */
export async function deleteDepartment(id: number): Promise<void> {
  await getPool().query("DELETE FROM departments WHERE DepartmentId = ?", [id]);
}
