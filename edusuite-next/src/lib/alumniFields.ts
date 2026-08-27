export type FieldType = "text" | "email" | "tel" | "date";

export interface AlumniField {
  key: string;
  label: string;
  icon: string;
  iconPrefix?: "fas" | "fab";
  type: FieldType;
  placeholder?: string;
  required?: boolean;
}

export interface AlumniSection {
  title: string;
  fields: AlumniField[];
}

export const ALUMNI_SECTIONS: AlumniSection[] = [
  {
    title: "Personal Information",
    fields: [
      { key: "name", label: "Name", icon: "fa-user", type: "text", placeholder: "Enter full name", required: true },
      { key: "regNo", label: "RegNo", icon: "fa-id-card", type: "text", placeholder: "e.g., REG2024001", required: true },
      { key: "mccEmail", label: "MccEmail", icon: "fa-envelope", type: "email", placeholder: "example@mcc.edu", required: true },
      { key: "dateOfBirth", label: "Date of Birth", icon: "fa-calendar-alt", type: "date", required: true },
      { key: "personalEmail", label: "Personal Email", icon: "fa-at", type: "email", placeholder: "yourname@gmail.com", required: true },
      { key: "mobileNumber", label: "Mobile Number", icon: "fa-mobile-alt", type: "tel", placeholder: "10-digit mobile number", required: true },
      { key: "religionCommunity", label: "Religion & Community", icon: "fa-pray", type: "text", placeholder: "e.g., Hindu - OC", required: true },
      { key: "nationality", label: "Nationality", icon: "fa-flag", type: "text", placeholder: "Indian", required: true },
      { key: "aadharNo", label: "Aadhar Number", icon: "fa-fingerprint", type: "text", placeholder: "12-digit Aadhar number", required: true },
      { key: "bloodGroup", label: "Blood Group", icon: "fa-tint", type: "text" },
      { key: "languagesKnown", label: "Languages Known", icon: "fa-language", type: "text", placeholder: "e.g., English, Tamil, Hindi", required: true },
      { key: "specialHealthComplaint", label: "Special Health Complaint", icon: "fa-heartbeat", type: "text", placeholder: "Any health conditions (default: None)" },
      { key: "physicalDisability", label: "Physical Disability", icon: "fa-wheelchair", type: "text", placeholder: "Any disabilities (default: None)" },
    ],
  },
  {
    title: "Academic History",
    fields: [
      { key: "sslcSchool", label: "SSLC School Name", icon: "fa-school", type: "text", placeholder: "Name of your 10th standard school" },
      { key: "sslcMarks", label: "SSLC Marks", icon: "fa-chart-line", type: "text", placeholder: "Total marks obtained" },
      { key: "sslcPercentage", label: "SSLC Percentage", icon: "fa-percent", type: "text", placeholder: "e.g., 85.5%" },
      { key: "sslcAchievements", label: "SSLC Achievements", icon: "fa-trophy", type: "text", placeholder: "Awards, distinctions, etc." },
      { key: "hscSchool", label: "HSC School Name", icon: "fa-graduation-cap", type: "text", placeholder: "Name of your 12th standard school" },
      { key: "hscMarks", label: "HSC Marks", icon: "fa-chart-line", type: "text", placeholder: "Total marks obtained" },
      { key: "hscPercentage", label: "HSC Percentage", icon: "fa-percent", type: "text", placeholder: "e.g., 88.5%" },
      { key: "hscAchievements", label: "HSC Achievements", icon: "fa-trophy", type: "text", placeholder: "Awards, distinctions, etc." },
      { key: "hallNameRoom", label: "Hall Name / Room", icon: "fa-home", type: "text", placeholder: "Hostel/Hall name and room number (Optional)" },
    ],
  },
  {
    title: "Parent / Guardian Details",
    fields: [
      { key: "fatherName", label: "Father's Name", icon: "fa-user-tie", type: "text", placeholder: "Father's full name" },
      { key: "fatherMobile", label: "Father's Mobile Number", icon: "fa-phone", type: "tel", placeholder: "10-digit mobile number" },
      { key: "motherName", label: "Mother's Name", icon: "fa-user", type: "text", placeholder: "Mother's full name" },
      { key: "motherMobile", label: "Mother's Mobile Number", icon: "fa-phone", type: "tel", placeholder: "10-digit mobile number" },
      { key: "localGuardianName", label: "Local Guardian Name", icon: "fa-user-shield", type: "text", placeholder: "Name of local guardian" },
      { key: "localGuardianPhone", label: "Local Guardian Phone", icon: "fa-phone", type: "tel", placeholder: "10-digit phone number" },
    ],
  },
];

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// Higher-studies fields, shown when careerStatus === "studying" (optional; see AlumniForm).
export const HIGHER_STUDIES_FIELDS: AlumniField[] = [
  { key: "collegeName", label: "College Name", icon: "fa-university", type: "text", placeholder: "Name of college/university" },
  { key: "degree", label: "Degree", icon: "fa-graduation-cap", type: "text", placeholder: "e.g., M.Sc. Computer Science" },
];

// Employment fields, shown when careerStatus === "working" (optional; see AlumniForm).
export const EMPLOYMENT_FIELDS: AlumniField[] = [
  { key: "companyName", label: "Company Name", icon: "fa-building", type: "text", placeholder: "Name of employer" },
  { key: "jobRole", label: "Role", icon: "fa-user-tie", type: "text", placeholder: "e.g., Software Engineer" },
  { key: "location", label: "Location", icon: "fa-map-marker-alt", type: "text", placeholder: "City, Country" },
];

// Used by the dashboard detail card
export const DETAIL_FIELDS: { key: string; label: string; date?: boolean }[] = [
  { key: "dateOfBirth", label: "Date Of Birth", date: true },
  { key: "personalEmail", label: "Personal Email" },
  { key: "religionCommunity", label: "Religion & Community" },
  { key: "nationality", label: "Nationality" },
  { key: "aadharNo", label: "Aadhar Number" },
  { key: "bloodGroup", label: "Blood Group" },
  { key: "mobileNumber", label: "Mobile Number" },
  { key: "languagesKnown", label: "Languages Known" },
  { key: "specialHealthComplaint", label: "Special Health Complaint" },
  { key: "physicalDisability", label: "Physical Disability" },
  { key: "sslcSchool", label: "SSLC School" },
  { key: "sslcMarks", label: "SSLC Marks" },
  { key: "sslcPercentage", label: "SSLC Percentage" },
  { key: "sslcAchievements", label: "SSLC Achievements" },
  { key: "hscSchool", label: "HSC School" },
  { key: "hscMarks", label: "HSC Marks" },
  { key: "hscPercentage", label: "HSC Percentage" },
  { key: "hscAchievements", label: "HSC Achievements" },
  { key: "hallNameRoom", label: "Hall Name / Room" },
  { key: "fatherName", label: "Father's Name" },
  { key: "fatherMobile", label: "Father's Mobile Number" },
  { key: "motherName", label: "Mother's Name" },
  { key: "motherMobile", label: "Mother's Mobile Number" },
  { key: "localGuardianName", label: "Local Guardian Name" },
  { key: "localGuardianPhone", label: "Local Guardian Phone" },
  { key: "collegeName", label: "College Name" },
  { key: "degree", label: "Degree" },
  { key: "companyName", label: "Company Name" },
  { key: "jobRole", label: "Role" },
  { key: "location", label: "Location" },
  { key: "otherStatus", label: "Other Status / Activity" },
];

// Every column on the AlumniRecord, for the dashboard's Excel/CSV export
export const EXPORT_COLUMNS: { key: string; label: string; date?: boolean }[] = [
  { key: "alumniId", label: "ID" },
  { key: "regNo", label: "Roll Number" },
  { key: "name", label: "Full Name" },
  { key: "mccEmail", label: "MCC Email" },
  { key: "departmentName", label: "Department" },
  { key: "batchName", label: "Batch" },
  ...DETAIL_FIELDS,
  { key: "imagePath", label: "Photo URL" },
  { key: "statusDocumentPath", label: "Status Document URL" },
  { key: "createdOn", label: "Created On" },
  { key: "modifiedOn", label: "Modified On" },
];
