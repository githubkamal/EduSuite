import { getPool } from "@/lib/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export interface AuthenticatedLogin {
  id: number;
  email: string;
  passwordHash: string;
  roleId: number;
  roleName: string;
  fullName: string;
}

export async function userExists(email: string): Promise<boolean> {
  const [rows] = await getPool().query<RowDataPacket[]>(
    "SELECT Id FROM logins WHERE Email = ? LIMIT 1",
    [email]
  );
  return rows.length > 0;
}

export async function createLogin(
  email: string,
  passwordHash: string,
  roleId: number
): Promise<number> {
  const [result] = await getPool().query<ResultSetHeader>(
    "INSERT INTO logins (PasswordHash, Email, RoleId, IsActive) VALUES (?, ?, ?, 1)",
    [passwordHash, email, roleId]
  );
  return result.insertId;
}

/**
 * Mirrors AccountService.AuthenticateAsync: loads the login row, then joins
 * Staff or Student for the full name (role 2 = Staff, role 3 = Student),
 * plus the role name.
 */
export async function findLoginForAuth(email: string): Promise<AuthenticatedLogin | null> {
  const [rows] = await getPool().query<RowDataPacket[]>(
    `SELECT
       l.Id AS id,
       l.Email AS email,
       l.PasswordHash AS passwordHash,
       l.RoleId AS roleId,
       r.RoleName AS roleName,
       COALESCE(st.FullName, sd.FullName, '') AS fullName
     FROM logins l
     LEFT JOIN roles r ON r.RoleId = l.RoleId
     LEFT JOIN staffs st ON st.LoginId = l.Id AND l.RoleId = 2
     LEFT JOIN students sd ON sd.LoginId = l.Id AND l.RoleId = 3
     WHERE l.Email = ? AND l.IsActive = 1
     LIMIT 1`,
    [email]
  );
  if (rows.length === 0) return null;
  return rows[0] as AuthenticatedLogin;
}
