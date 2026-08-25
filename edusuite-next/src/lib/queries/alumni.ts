import { getPool } from "@/lib/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import type { AlumniRecord, AlumniSearchRequest, AlumniSearchResponse } from "@/lib/types";

const ALUMNI_COLUMNS = [
  "DepartmentId",
  "BatchId",
  "Name",
  "RegNo",
  "MccEmail",
  "NameFromForm",
  "DateOfBirth",
  "PersonalEmail",
  "ReligionCommunity",
  "Nationality",
  "AadharNo",
  "BloodGroup",
  "MobileNumber",
  "SslcSchool",
  "SslcMarks",
  "SslcPercentage",
  "SslcAchievements",
  "ModeOfConveyance",
  "HallNameRoom",
  "LocalGuardianName",
  "LocalGuardianPhone",
  "Hobbies",
  "ExtraCurricularInterests",
  "SocialFacebook",
  "SocialInstagram",
  "SocialTwitter",
  "LanguagesKnown",
  "InterestedInPartTimeJob",
  "SpecialHealthComplaint",
  "PhysicalDisability",
  "EmergencyPhone",
  "DateOfSignature",
  "ParentGuardianSignature",
  "ImagePath",
  "CollegeName",
  "Degree",
  "CompanyName",
  "JobRole",
  "Location",
  "StatusDocumentPath",
] as const;

type AlumniColumn = (typeof ALUMNI_COLUMNS)[number];

// Maps camelCase DTO field names (as used in the API/JSON) to MySQL columns.
const FIELD_TO_COLUMN: Record<string, AlumniColumn> = Object.fromEntries(
  ALUMNI_COLUMNS.map((col) => [col.charAt(0).toLowerCase() + col.slice(1), col])
) as Record<string, AlumniColumn>;

/** Mirrors AlumniService.GetAlumniAsync(id): no Department/Batch name join. */
export async function getAlumniById(id: number): Promise<AlumniRecord | null> {
  const [rows] = await getPool().query<RowDataPacket[]>(
    `SELECT
       AlumniId AS alumniId, DepartmentId AS departmentId, BatchId AS batchId,
       Name AS name, RegNo AS regNo, MccEmail AS mccEmail, NameFromForm AS nameFromForm,
       DateOfBirth AS dateOfBirth, PersonalEmail AS personalEmail, ReligionCommunity AS religionCommunity,
       Nationality AS nationality, AadharNo AS aadharNo, BloodGroup AS bloodGroup, MobileNumber AS mobileNumber,
       SslcSchool AS sslcSchool, SslcMarks AS sslcMarks, SslcPercentage AS sslcPercentage,
       SslcAchievements AS sslcAchievements, ModeOfConveyance AS modeOfConveyance, HallNameRoom AS hallNameRoom,
       LocalGuardianName AS localGuardianName, LocalGuardianPhone AS localGuardianPhone, Hobbies AS hobbies,
       ExtraCurricularInterests AS extraCurricularInterests, SocialFacebook AS socialFacebook,
       SocialInstagram AS socialInstagram, SocialTwitter AS socialTwitter, LanguagesKnown AS languagesKnown,
       InterestedInPartTimeJob AS interestedInPartTimeJob, SpecialHealthComplaint AS specialHealthComplaint,
       PhysicalDisability AS physicalDisability, EmergencyPhone AS emergencyPhone,
       DateOfSignature AS dateOfSignature, ParentGuardianSignature AS parentGuardianSignature,
       ImagePath AS imagePath, CollegeName AS collegeName, Degree AS degree,
       CompanyName AS companyName, JobRole AS jobRole, Location AS location,
       StatusDocumentPath AS statusDocumentPath,
       CreatedOn AS createdOn, ModifiedOn AS modifiedOn, CreatedBy AS createdBy, ModifiedBy AS modifiedBy
     FROM alumnis WHERE AlumniId = ? LIMIT 1`,
    [id]
  );
  if (rows.length === 0) return null;
  return rows[0] as AlumniRecord;
}

export async function deleteAlumni(id: number): Promise<void> {
  await getPool().query("DELETE FROM alumnis WHERE AlumniId = ?", [id]);
}

export async function createAlumni(dto: Partial<AlumniRecord>): Promise<number> {
  const columns: string[] = [];
  const placeholders: string[] = [];
  const values: unknown[] = [];

  for (const [field, column] of Object.entries(FIELD_TO_COLUMN)) {
    if (field in dto) {
      columns.push(column);
      placeholders.push("?");
      values.push((dto as Record<string, unknown>)[field] ?? null);
    }
  }

  const [result] = await getPool().query<ResultSetHeader>(
    `INSERT INTO alumnis (${columns.join(", ")}) VALUES (${placeholders.join(", ")})`,
    values
  );
  return result.insertId;
}

export async function updateAlumni(id: number, dto: Partial<AlumniRecord>): Promise<void> {
  const assignments: string[] = [];
  const values: unknown[] = [];

  for (const [field, column] of Object.entries(FIELD_TO_COLUMN)) {
    if (field in dto) {
      assignments.push(`${column} = ?`);
      values.push((dto as Record<string, unknown>)[field] ?? null);
    }
  }

  if (assignments.length === 0) return;

  values.push(id);
  await getPool().query(
    `UPDATE alumnis SET ${assignments.join(", ")} WHERE AlumniId = ?`,
    values
  );
}

const SORT_COLUMNS: Record<string, string> = {
  id: "s.AlumniId",
  rollnumber: "s.RegNo",
  fullname: "s.Name",
  departmentname: "d.DepartmentName",
  batchname: "b.BatchName",
};

/** Mirrors AlumniService.GetAlumnisAsync: search + column filters + sort + pagination. */
export async function searchAlumni(request: AlumniSearchRequest): Promise<AlumniSearchResponse> {
  const where: string[] = [];
  const params: unknown[] = [];

  if (request.search) {
    where.push(
      "(s.Name LIKE ? OR s.RegNo LIKE ? OR d.DepartmentName LIKE ? OR b.BatchName LIKE ?)"
    );
    const like = `%${request.search}%`;
    params.push(like, like, like, like);
  }

  if (request.filters) {
    for (const [rawKey, values] of Object.entries(request.filters)) {
      if (!values || values.length === 0) continue;
      const key = rawKey.toLowerCase();

      switch (key) {
        case "rollnumber":
          where.push(`(${values.map(() => "s.RegNo LIKE ?").join(" OR ")})`);
          params.push(...values.map((v) => `%${v}%`));
          break;
        case "fullname":
          where.push(`(${values.map(() => "s.Name LIKE ?").join(" OR ")})`);
          params.push(...values.map((v) => `%${v}%`));
          break;
        case "departmentid": {
          const ids = values.map((v) => parseInt(v, 10)).filter((n) => n > 0);
          if (ids.length > 0) {
            where.push(`s.DepartmentId IN (${ids.map(() => "?").join(",")})`);
            params.push(...ids);
          }
          break;
        }
        case "departmentname":
          where.push(`d.DepartmentName IN (${values.map(() => "?").join(",")})`);
          params.push(...values);
          break;
        case "batchid": {
          const ids = values.map((v) => parseInt(v, 10)).filter((n) => n > 0);
          if (ids.length > 0) {
            where.push(`s.BatchId IN (${ids.map(() => "?").join(",")})`);
            params.push(...ids);
          }
          break;
        }
        case "batchname":
          where.push(`b.BatchName IN (${values.map(() => "?").join(",")})`);
          params.push(...values);
          break;
      }
    }
  }

  const whereSql = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";
  const pool = getPool();

  const [countRows] = await pool.query<RowDataPacket[]>(
    `SELECT COUNT(*) AS total
     FROM alumnis s
     JOIN departments d ON d.DepartmentId = s.DepartmentId
     JOIN batchs b ON b.BatchId = s.BatchId
     ${whereSql}`,
    params
  );
  const total = (countRows[0] as { total: number }).total;

  const sortColumn = request.sortColumn ? SORT_COLUMNS[request.sortColumn.toLowerCase()] : undefined;
  const orderSql = sortColumn
    ? `ORDER BY ${sortColumn} ${request.sortDir?.toLowerCase() === "desc" ? "DESC" : "ASC"}`
    : "ORDER BY s.AlumniId ASC";

  const pageSize = request.pageSize || 10;
  const page = request.page || 1;
  const offset = (page - 1) * pageSize;

  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT
       s.AlumniId AS alumniId, s.RegNo AS regNo, s.Name AS name,
       s.DepartmentId AS departmentId, d.DepartmentName AS departmentName,
       s.BatchId AS batchId, b.BatchName AS batchName,
       s.MccEmail AS mccEmail, s.NameFromForm AS nameFromForm, s.DateOfBirth AS dateOfBirth,
       s.PersonalEmail AS personalEmail, s.MobileNumber AS mobileNumber,
       s.ReligionCommunity AS religionCommunity, s.Nationality AS nationality, s.AadharNo AS aadharNo,
       s.BloodGroup AS bloodGroup, s.SslcSchool AS sslcSchool, s.SslcMarks AS sslcMarks,
       s.SslcPercentage AS sslcPercentage, s.SslcAchievements AS sslcAchievements,
       s.ModeOfConveyance AS modeOfConveyance, s.HallNameRoom AS hallNameRoom,
       s.LocalGuardianName AS localGuardianName, s.LocalGuardianPhone AS localGuardianPhone,
       s.ParentGuardianSignature AS parentGuardianSignature, s.EmergencyPhone AS emergencyPhone,
       s.Hobbies AS hobbies, s.ExtraCurricularInterests AS extraCurricularInterests,
       s.InterestedInPartTimeJob AS interestedInPartTimeJob, s.SocialFacebook AS socialFacebook,
       s.SocialInstagram AS socialInstagram, s.SocialTwitter AS socialTwitter,
       s.LanguagesKnown AS languagesKnown, s.SpecialHealthComplaint AS specialHealthComplaint,
       s.PhysicalDisability AS physicalDisability, s.DateOfSignature AS dateOfSignature,
       s.ImagePath AS imagePath, s.CollegeName AS collegeName, s.Degree AS degree,
       s.CompanyName AS companyName, s.JobRole AS jobRole, s.Location AS location,
       s.StatusDocumentPath AS statusDocumentPath,
       s.CreatedBy AS createdBy, s.CreatedOn AS createdOn, s.ModifiedBy AS modifiedBy, s.ModifiedOn AS modifiedOn
     FROM alumnis s
     JOIN departments d ON d.DepartmentId = s.DepartmentId
     JOIN batchs b ON b.BatchId = s.BatchId
     ${whereSql}
     ${orderSql}
     LIMIT ? OFFSET ?`,
    [...params, pageSize, offset]
  );

  return { data: rows as AlumniRecord[], total };
}
