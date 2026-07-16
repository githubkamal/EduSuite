import { getPool } from "@/lib/db";
import type { Department, Batch, Role } from "@/lib/types";
import type { RowDataPacket } from "mysql2";

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
