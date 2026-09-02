// Bulk-imports alumni records from a CSV export
// Usage:
//   npm run import-alumni-csv -- <path-to-csv> [departmentId] [batchId]

import fs from "node:fs";
import mysql from "mysql2/promise";
import { parse } from "csv-parse/sync";

const [, , csvPath, departmentIdArg, batchIdArg] = process.argv;

if (!csvPath) {
  console.error("Usage: npm run import-alumni-csv -- <path-to-csv> [departmentId] [batchId]");
  process.exit(1);
}

const departmentId = departmentIdArg ? Number(departmentIdArg) : 1;
const batchId = batchIdArg ? Number(batchIdArg) : 1;

const COLUMN_MAP = {
  Name: "Student Name (List)",
  RegNo: "Reg No",
  MccEmail: "MCC Email",
  DateOfBirth: "Date of Birth",
  PersonalEmail: "Personal Email-Id",
  ReligionCommunity: "Religion & Community",
  Nationality: "Nationality",
  AadharNo: "Aadhar No",
  BloodGroup: "Blood Group",
  MobileNumber: "Mobile Number",
  SslcSchool: "S.S.L.C School",
  SslcMarks: "S.S.L.C Marks",
  SslcPercentage: "S.S.L.C Percentage",
  SslcAchievements: "S.S.L.C Achievements",
  HscSchool: "H.S.C School",
  HscMarks: "H.S.C Marks",
  HscPercentage: "H.S.C Percentage",
  HscAchievements: "H.S.C Achievements",
  HallNameRoom: "Hall Name & Room",
  FatherName: "Father Name",
  FatherMobile: "Father Mobile",
  MotherName: "Mother Name",
  MotherMobile: "Mother Mobile",
  LocalGuardianName: "Local Guardian Name",
  LocalGuardianPhone: "Local Guardian Phone Number",
  LanguagesKnown: "Languages Known",
  SpecialHealthComplaint: "Special Health Complaint/Allergic to",
  PhysicalDisability: "Physical Disability if any",
};

const DATE_FORMATS = [
  // dd/MM/yyyy, d/M/yyyy, dd-MM-yyyy, d-M-yyyy, dd/MM/yy, d/M/yy
  /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/,
  /^(\d{1,2})[/-](\d{1,2})[/-](\d{2})$/,
];

function get(row, column) {
  if (!column) return null;
  const value = row[column];
  return value ? String(value).trim() : null;
}

function toDate(value) {
  if (!value) return null;

  const iso = new Date(value);
  if (!Number.isNaN(iso.getTime())) {
    return iso.toISOString().slice(0, 10);
  }

  for (const format of DATE_FORMATS) {
    const match = value.match(format);
    if (match) {
      const [, d, m, yRaw] = match;
      const y = yRaw.length === 2 ? Number(`20${yRaw}`) : Number(yRaw);
      return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    }
  }

  return null;
}

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "edusuite_db",
});

try {
  const csvContent = fs.readFileSync(csvPath, "utf-8");
  const records = parse(csvContent, { columns: true, skip_empty_lines: true, trim: true });

  for (const row of records) {
    await pool.query(
      `INSERT INTO alumnis (
         DepartmentId, BatchId, Name, RegNo, MccEmail, DateOfBirth, PersonalEmail,
         ReligionCommunity, Nationality, AadharNo, BloodGroup, MobileNumber,
         SslcSchool, SslcMarks, SslcPercentage, SslcAchievements,
         HscSchool, HscMarks, HscPercentage, HscAchievements,
         HallNameRoom, FatherName, FatherMobile, MotherName, MotherMobile,
         LocalGuardianName, LocalGuardianPhone, LanguagesKnown,
         SpecialHealthComplaint, PhysicalDisability
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        departmentId,
        batchId,
        get(row, COLUMN_MAP.Name),
        get(row, COLUMN_MAP.RegNo),
        get(row, COLUMN_MAP.MccEmail),
        toDate(get(row, COLUMN_MAP.DateOfBirth)),
        get(row, COLUMN_MAP.PersonalEmail),
        get(row, COLUMN_MAP.ReligionCommunity),
        get(row, COLUMN_MAP.Nationality),
        get(row, COLUMN_MAP.AadharNo),
        get(row, COLUMN_MAP.BloodGroup),
        get(row, COLUMN_MAP.MobileNumber),
        get(row, COLUMN_MAP.SslcSchool),
        get(row, COLUMN_MAP.SslcMarks),
        get(row, COLUMN_MAP.SslcPercentage),
        get(row, COLUMN_MAP.SslcAchievements),
        get(row, COLUMN_MAP.HscSchool),
        get(row, COLUMN_MAP.HscMarks),
        get(row, COLUMN_MAP.HscPercentage),
        get(row, COLUMN_MAP.HscAchievements),
        get(row, COLUMN_MAP.HallNameRoom),
        get(row, COLUMN_MAP.FatherName),
        get(row, COLUMN_MAP.FatherMobile),
        get(row, COLUMN_MAP.MotherName),
        get(row, COLUMN_MAP.MotherMobile),
        get(row, COLUMN_MAP.LocalGuardianName),
        get(row, COLUMN_MAP.LocalGuardianPhone),
        get(row, COLUMN_MAP.LanguagesKnown),
        get(row, COLUMN_MAP.SpecialHealthComplaint) || "None",
        get(row, COLUMN_MAP.PhysicalDisability) || "None",
      ]
    );
  }

  console.log(`Imported ${records.length} alumni records from ${csvPath}.`);
} finally {
  await pool.end();
}
