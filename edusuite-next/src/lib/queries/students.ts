import { getPool } from "@/lib/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export interface NewStudent {
  loginId: number;
  rollNumber: string;
  fullName: string;
  departmentId: number;
  batchId: number;
}

export interface StudentRecord {
  id: number;
  loginId: number;
  rollNumber: string;
  fullName: string;
  departmentId: number;
  batchId: number;
  createdOn: string;
  modifiedOn: string;
}

export interface TabulatorFilter {
  field: string;
  value: string | string[] | number[];
}

export interface TabulatorRequest {
  page: number;
  size: number;
  sortField?: string | null;
  sortDir?: string | null;
  filters: TabulatorFilter[];
}

export interface TabulatorResponse<T> {
  data: T[];
  totalRecords: number;
  lastPage: number;
}

export async function createStudent(student: NewStudent): Promise<number> {
  const [result] = await getPool().query<ResultSetHeader>(
    "INSERT INTO students (LoginId, RollNumber, FullName, DepartmentId, BatchId) VALUES (?, ?, ?, ?, ?)",
    [student.loginId, student.rollNumber, student.fullName, student.departmentId, student.batchId]
  );
  return result.insertId;
}

// Whitelist mirroring the C# Student entity properties reachable via OrderByDynamic.
const SORT_COLUMNS: Record<string, string> = {
  id: "Id",
  loginid: "LoginId",
  rollnumber: "RollNumber",
  fullname: "FullName",
  departmentid: "DepartmentId",
  batchid: "BatchId",
  modifiedby: "ModifiedBy",
  createdon: "CreatedOn",
  modifiedon: "ModifiedOn",
};

/** Mirrors AlumniService.GetData (the Tabulator-style endpoint scaffolded for Students). */
export async function searchStudents(
  request: TabulatorRequest
): Promise<TabulatorResponse<StudentRecord>> {
  const where: string[] = [];
  const params: unknown[] = [];

  for (const filter of request.filters) {
    if (filter.field === "departmentId" && Array.isArray(filter.value) && filter.value.length > 0) {
      where.push(`DepartmentId IN (${filter.value.map(() => "?").join(",")})`);
      params.push(...filter.value);
    } else if (filter.field === "batchId" && Array.isArray(filter.value) && filter.value.length > 0) {
      where.push(`BatchId IN (${filter.value.map(() => "?").join(",")})`);
      params.push(...filter.value);
    } else if (filter.field === "fullName" && typeof filter.value === "string" && filter.value) {
      where.push("FullName LIKE ?");
      params.push(`%${filter.value}%`);
    } else if (filter.field === "roleNumber" && typeof filter.value === "string" && filter.value) {
      // Field is named "roleNumber" (not a typo we introduced) to match the
      // original Tabulator request contract, but it filters RollNumber.
      where.push("RollNumber LIKE ?");
      params.push(`%${filter.value}%`);
    }
  }

  const whereSql = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

  const [countRows] = await getPool().query<RowDataPacket[]>(
    `SELECT COUNT(*) AS total FROM students ${whereSql}`,
    params
  );
  const totalRecords = (countRows[0] as { total: number }).total;

  const sortColumn = request.sortField ? SORT_COLUMNS[request.sortField.toLowerCase()] : undefined;
  const orderSql = sortColumn
    ? `ORDER BY ${sortColumn} ${request.sortDir === "asc" ? "ASC" : "DESC"}`
    : "ORDER BY Id ASC";

  const size = request.size || 10;
  const page = request.page || 1;
  const offset = (page - 1) * size;

  const [rows] = await getPool().query<RowDataPacket[]>(
    `SELECT
       Id AS id, LoginId AS loginId, RollNumber AS rollNumber, FullName AS fullName,
       DepartmentId AS departmentId, BatchId AS batchId, CreatedOn AS createdOn, ModifiedOn AS modifiedOn
     FROM students
     ${whereSql}
     ${orderSql}
     LIMIT ? OFFSET ?`,
    [...params, size, offset]
  );

  return {
    data: rows as StudentRecord[],
    totalRecords,
    lastPage: Math.ceil(totalRecords / size),
  };
}
