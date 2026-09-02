import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireSession";
import { getPool } from "@/lib/db";
import * as XLSX from "xlsx";

const HEADER_MAP: Record<string, string> = {
  // Name
  "name": "Name",
  "fullname": "Name",
  "full name": "Name",
  "student name": "Name",
  "student name (list)": "Name",

  // RegNo / Roll Number
  "regno": "RegNo",
  "reg no": "RegNo",
  "reg no.": "RegNo",
  "rollno": "RegNo",
  "roll no": "RegNo",
  "roll number": "RegNo",

  // MCC Email
  "mccemail": "MccEmail",
  "mcc email": "MccEmail",
  "mcc email id": "MccEmail",
  "email": "MccEmail",

  // Date of Birth
  "dateofbirth": "DateOfBirth",
  "date of birth": "DateOfBirth",
  "dob": "DateOfBirth",

  // Personal Email
  "personalemail": "PersonalEmail",
  "personal email": "PersonalEmail",
  "personal email-id": "PersonalEmail",
  "personal email id": "PersonalEmail",

  // Religion & Community
  "religioncommunity": "ReligionCommunity",
  "religion & community": "ReligionCommunity",
  "religion community": "ReligionCommunity",
  "religion": "ReligionCommunity",
  "community": "ReligionCommunity",

  // Nationality
  "nationality": "Nationality",

  // Aadhar Number
  "aadharno": "AadharNo",
  "aadhar no": "AadharNo",
  "aadhar number": "AadharNo",
  "aadhar": "AadharNo",

  // Blood Group
  "bloodgroup": "BloodGroup",
  "blood group": "BloodGroup",

  // Mobile Number
  "mobilenumber": "MobileNumber",
  "mobile number": "MobileNumber",
  "mobile": "MobileNumber",
  "phone": "MobileNumber",
  "phone number": "MobileNumber",

  // SSLC
  "sslcschool": "SslcSchool",
  "sslc school": "SslcSchool",
  "sslc school name": "SslcSchool",
  "s.s.l.c school": "SslcSchool",
  "s.s.l.c. school": "SslcSchool",

  "sslcmarks": "SslcMarks",
  "sslc marks": "SslcMarks",
  "s.s.l.c marks": "SslcMarks",

  "sslcpercentage": "SslcPercentage",
  "sslc percentage": "SslcPercentage",
  "s.s.l.c percentage": "SslcPercentage",

  "sslcachievements": "SslcAchievements",
  "sslc achievements": "SslcAchievements",
  "s.s.l.c achievements": "SslcAchievements",

  // HSC
  "hscschool": "HscSchool",
  "hsc school": "HscSchool",
  "hsc school name": "HscSchool",
  "h.s.c school": "HscSchool",
  "h.s.c. school": "HscSchool",

  "hscmarks": "HscMarks",
  "hsc marks": "HscMarks",
  "h.s.c marks": "HscMarks",

  "hscpercentage": "HscPercentage",
  "hsc percentage": "HscPercentage",
  "h.s.c percentage": "HscPercentage",

  "hscachievements": "HscAchievements",
  "hsc achievements": "HscAchievements",
  "h.s.c achievements": "HscAchievements",

  // Hall Name / Room
  "hallnameroom": "HallNameRoom",
  "hall name room": "HallNameRoom",
  "hall name & room": "HallNameRoom",
  "hall name/room": "HallNameRoom",
  "hall name": "HallNameRoom",

  // Parent / Guardian
  "fathername": "FatherName",
  "father name": "FatherName",
  "father's name": "FatherName",

  "fathermobile": "FatherMobile",
  "father mobile": "FatherMobile",
  "father's mobile": "FatherMobile",
  "father's mobile number": "FatherMobile",
  "father phone": "FatherMobile",

  "mothername": "MotherName",
  "mother name": "MotherName",
  "mother's name": "MotherName",

  "mothermobile": "MotherMobile",
  "mother mobile": "MotherMobile",
  "mother's mobile": "MotherMobile",
  "mother's mobile number": "MotherMobile",
  "mother phone": "MotherMobile",

  "localguardianname": "LocalGuardianName",
  "local guardian name": "LocalGuardianName",
  "guardian name": "LocalGuardianName",

  "localguardianphone": "LocalGuardianPhone",
  "local guardian phone": "LocalGuardianPhone",
  "local guardian phone number": "LocalGuardianPhone",
  "guardian phone": "LocalGuardianPhone",

  // Languages Known
  "languagesknown": "LanguagesKnown",
  "languages known": "LanguagesKnown",
  "languages": "LanguagesKnown",

  // Special Health Complaint
  "specialhealthcomplaint": "SpecialHealthComplaint",
  "special health complaint": "SpecialHealthComplaint",
  "health complaint": "SpecialHealthComplaint",
  "special health complaint/allergic to": "SpecialHealthComplaint",

  // Physical Disability
  "physicaldisability": "PhysicalDisability",
  "physical disability": "PhysicalDisability",
  "physical disability if any": "PhysicalDisability",
  "disability": "PhysicalDisability",

  // Career / Higher Studies
  "collegename": "CollegeName",
  "college name": "CollegeName",

  "degree": "Degree",

  "companyname": "CompanyName",
  "company name": "CompanyName",
  "company": "CompanyName",
  "employer": "CompanyName",

  "jobrole": "JobRole",
  "job role": "JobRole",
  "role": "JobRole",
  "designation": "JobRole",

  "location": "Location",

  "otherstatus": "OtherStatus",
  "other status": "OtherStatus",
  "other status / activity": "OtherStatus",
  "status": "OtherStatus",

  "imagepath": "ImagePath",
  "photo url": "ImagePath",

  "statusdocumentpath": "StatusDocumentPath",
  "status document url": "StatusDocumentPath",
};

const DATE_FORMATS = [
  /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/,
  /^(\d{1,2})[/-](\d{1,2})[/-](\d{2})$/,
];

function parseDateValue(value: unknown): string | null {
  if (!value) return null;
  if (value instanceof Date) {
    if (!Number.isNaN(value.getTime())) {
      return value.toISOString().slice(0, 10);
    }
  }

  const str = String(value).trim();
  if (!str) return null;

  // Try ISO date YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}/.test(str)) {
    return str.slice(0, 10);
  }

  for (const format of DATE_FORMATS) {
    const match = str.match(format);
    if (match) {
      const [, d, m, yRaw] = match;
      const y = yRaw.length === 2 ? Number(`20${yRaw}`) : Number(yRaw);
      return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    }
  }

  const iso = new Date(str);
  if (!Number.isNaN(iso.getTime())) {
    return iso.toISOString().slice(0, 10);
  }

  return null;
}

export async function POST(req: NextRequest) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const departmentIdStr = formData.get("departmentId") as string | null;
    const batchIdStr = formData.get("batchId") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const defaultDeptId = departmentIdStr ? parseInt(departmentIdStr, 10) : null;
    const defaultBatchId = batchIdStr ? parseInt(batchIdStr, 10) : null;

    if (!defaultDeptId || !defaultBatchId) {
      return NextResponse.json(
        { error: "Please select both a Department and a Batch for the bulk import." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const workbook = XLSX.read(buffer, { type: "buffer", cellDates: true });
    if (!workbook.SheetNames.length) {
      return NextResponse.json({ error: "The uploaded spreadsheet has no sheets." }, { status: 400 });
    }

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rawRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: "" });

    if (!rawRows.length) {
      return NextResponse.json({ error: "The uploaded spreadsheet is empty." }, { status: 400 });
    }

    const recordsToInsert: Record<string, unknown>[] = [];
    let skipped = 0;

    for (const rawRow of rawRows) {
      const mappedRow: Record<string, unknown> = {
        DepartmentId: defaultDeptId,
        BatchId: defaultBatchId,
      };

      for (const [key, val] of Object.entries(rawRow)) {
        const normalizedKey = key.toLowerCase().trim().replace(/['"]/g, "");
        const targetColumn = HEADER_MAP[normalizedKey];
        if (targetColumn) {
          mappedRow[targetColumn] = val !== undefined && val !== null ? String(val).trim() : null;
        }
      }

      // Check if at least Name or RegNo is present
      const name = mappedRow.Name ? String(mappedRow.Name).trim() : "";
      const regNo = mappedRow.RegNo ? String(mappedRow.RegNo).trim() : "";
      if (!name && !regNo) {
        skipped++;
        continue;
      }

      // Process DateOfBirth
      if (mappedRow.DateOfBirth) {
        mappedRow.DateOfBirth = parseDateValue(mappedRow.DateOfBirth);
      }

      // Default Health & Disability to "None" if unset or blank
      if (!mappedRow.SpecialHealthComplaint) {
        mappedRow.SpecialHealthComplaint = "None";
      }
      if (!mappedRow.PhysicalDisability) {
        mappedRow.PhysicalDisability = "None";
      }

      recordsToInsert.push(mappedRow);
    }

    if (recordsToInsert.length === 0) {
      return NextResponse.json(
        { error: "No valid alumni records found in the file. Ensure rows have a Name or Roll Number." },
        { status: 400 }
      );
    }

    // Insert records into MySQL
    const pool = getPool();
    const columns = [
      "DepartmentId",
      "BatchId",
      "Name",
      "RegNo",
      "MccEmail",
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
      "HscSchool",
      "HscMarks",
      "HscPercentage",
      "HscAchievements",
      "HallNameRoom",
      "FatherName",
      "FatherMobile",
      "MotherName",
      "MotherMobile",
      "LocalGuardianName",
      "LocalGuardianPhone",
      "LanguagesKnown",
      "SpecialHealthComplaint",
      "PhysicalDisability",
      "ImagePath",
      "CollegeName",
      "Degree",
      "CompanyName",
      "JobRole",
      "Location",
      "OtherStatus",
      "StatusDocumentPath",
    ];

    const placeholders = `(${columns.map(() => "?").join(", ")})`;
    const sql = `INSERT INTO alumnis (${columns.join(", ")}) VALUES ${recordsToInsert.map(() => placeholders).join(", ")}`;

    const flatValues: unknown[] = [];
    for (const record of recordsToInsert) {
      for (const col of columns) {
        flatValues.push(record[col] ?? null);
      }
    }

    await pool.query(sql, flatValues);

    return NextResponse.json({
      success: true,
      importedCount: recordsToInsert.length,
      skippedCount: skipped,
      totalRows: rawRows.length,
    });
  } catch (err) {
    console.error("Bulk import error:", err);
    const message = err instanceof Error ? err.message : "Failed to process bulk import file.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
