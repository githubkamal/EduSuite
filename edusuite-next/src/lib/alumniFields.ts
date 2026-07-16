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

// Mirrors the field order/labels/required-ness from the original
// Areas/Alumni/Views/Alumni/Create.cshtml form.
export const ALUMNI_SECTIONS: AlumniSection[] = [
  {
    title: "Personal Information",
    fields: [
      { key: "name", label: "Name", icon: "fa-user", type: "text", placeholder: "Enter full name", required: true },
      { key: "regNo", label: "RegNo", icon: "fa-id-card", type: "text", placeholder: "e.g., REG2024001", required: true },
      { key: "mccEmail", label: "MccEmail", icon: "fa-envelope", type: "email", placeholder: "example@mcc.edu", required: true },
      { key: "nameFromForm", label: "NameFromForm", icon: "fa-file-signature", type: "text", placeholder: "Name as per official records", required: true },
      { key: "dateOfBirth", label: "Date of Birth", icon: "fa-calendar-alt", type: "date", required: true },
      { key: "personalEmail", label: "Personal Email", icon: "fa-at", type: "email", placeholder: "yourname@gmail.com", required: true },
      { key: "mobileNumber", label: "Mobile Number", icon: "fa-mobile-alt", type: "tel", placeholder: "10-digit mobile number", required: true },
      { key: "religionCommunity", label: "Religion & Community", icon: "fa-pray", type: "text", placeholder: "e.g., Hindu - OC", required: true },
      { key: "nationality", label: "Nationality", icon: "fa-flag", type: "text", placeholder: "Indian", required: true },
      { key: "aadharNo", label: "Aadhar Number", icon: "fa-fingerprint", type: "text", placeholder: "12-digit Aadhar number", required: true },
      { key: "bloodGroup", label: "Blood Group", icon: "fa-tint", type: "text" },
      { key: "languagesKnown", label: "Languages Known", icon: "fa-language", type: "text", placeholder: "e.g., English, Tamil, Hindi", required: true },
      { key: "specialHealthComplaint", label: "Special Health Complaint", icon: "fa-heartbeat", type: "text", placeholder: "Any health conditions (if none, type 'None')", required: true },
      { key: "physicalDisability", label: "Physical Disability", icon: "fa-wheelchair", type: "text", placeholder: "Any disabilities (if none, type 'None')", required: true },
    ],
  },
  {
    title: "Academic History",
    fields: [
      { key: "sslcSchool", label: "SSLC School Name", icon: "fa-school", type: "text", placeholder: "Name of your 10th standard school" },
      { key: "sslcMarks", label: "SSLC Marks", icon: "fa-chart-line", type: "text", placeholder: "Total marks obtained" },
      { key: "sslcPercentage", label: "Sslc Percentage", icon: "fa-percent", type: "text", placeholder: "e.g., 85.5%" },
      { key: "sslcAchievements", label: "Sslc Achievements", icon: "fa-trophy", type: "text", placeholder: "Awards, distinctions, etc." },
      { key: "modeOfConveyance", label: "Mode Of Conveyance", icon: "fa-bus", type: "text", placeholder: "e.g., Bus, Bike, Hostel" },
      { key: "hallNameRoom", label: "Hall Name Room", icon: "fa-home", type: "text", placeholder: "Hostel/Hall name and room number" },
    ],
  },
  {
    title: "Guardian Details",
    fields: [
      { key: "localGuardianName", label: "Local Guardian Name", icon: "fa-user-shield", type: "text", placeholder: "Name of local guardian" },
      { key: "localGuardianPhone", label: "Local Guardian Phone", icon: "fa-phone", type: "tel", placeholder: "10-digit phone number" },
      { key: "parentGuardianSignature", label: "Parent Guardian Signature", icon: "fa-signature", type: "text", placeholder: "Parent/Guardian signature" },
      { key: "emergencyPhone", label: "Emergency Phone", icon: "fa-exclamation-triangle", type: "tel", placeholder: "Emergency contact number" },
    ],
  },
  {
    title: "Hobbies & Interests",
    fields: [
      { key: "hobbies", label: "Hobbies", icon: "fa-heart", type: "text", placeholder: "e.g., Reading, Sports, Music" },
      { key: "extraCurricularInterests", label: "Extra Curricular Interests", icon: "fa-star", type: "text", placeholder: "e.g., Drama, Debate, Photography" },
      { key: "interestedInPartTimeJob", label: "Interested In PartTime Job", icon: "fa-briefcase", type: "text", placeholder: "Yes/No" },
    ],
  },
  {
    title: "Social Platforms",
    fields: [
      { key: "socialFacebook", label: "Facebook", icon: "fa-facebook", iconPrefix: "fab", type: "text", placeholder: "Facebook profile URL or username" },
      { key: "socialInstagram", label: "Instagram", icon: "fa-instagram", iconPrefix: "fab", type: "text", placeholder: "Instagram handle" },
      { key: "socialTwitter", label: "Twitter", icon: "fa-twitter", iconPrefix: "fab", type: "text", placeholder: "Twitter handle" },
      { key: "dateOfSignature", label: "Date Of Signature", icon: "fa-calendar-check", type: "date" },
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

// Used by the dashboard detail card (mirrors detailFields in the original Dashboard/Index.cshtml).
export const DETAIL_FIELDS: { key: string; label: string; date?: boolean }[] = [
  { key: "nameFromForm", label: "Name From Form" },
  { key: "dateOfBirth", label: "Date Of Birth", date: true },
  { key: "personalEmail", label: "Personal Email" },
  { key: "religionCommunity", label: "Religion Community" },
  { key: "nationality", label: "Nationality" },
  { key: "aadharNo", label: "Aadhar Number" },
  { key: "bloodGroup", label: "Blood Group" },
  { key: "mobileNumber", label: "Mobile Number" },
  { key: "sslcSchool", label: "SSLC School" },
  { key: "sslcMarks", label: "SSLC Marks" },
  { key: "sslcPercentage", label: "SSLC Percentage" },
  { key: "sslcAchievements", label: "SSLC Achievements" },
  { key: "modeOfConveyance", label: "Mode Of Conveyance" },
  { key: "hallNameRoom", label: "Hall Name/Room" },
  { key: "localGuardianName", label: "Local Guardian Name" },
  { key: "localGuardianPhone", label: "Local Guardian Phone" },
  { key: "hobbies", label: "Hobbies" },
  { key: "extraCurricularInterests", label: "Extra-Curricular Interests" },
  { key: "socialFacebook", label: "Facebook" },
  { key: "socialInstagram", label: "Instagram" },
  { key: "socialTwitter", label: "Twitter" },
  { key: "languagesKnown", label: "Languages Known" },
  { key: "interestedInPartTimeJob", label: "Interested In Part-Time Job" },
  { key: "specialHealthComplaint", label: "Special Health Complaint" },
  { key: "physicalDisability", label: "Physical Disability" },
  { key: "emergencyPhone", label: "Emergency Phone" },
  { key: "dateOfSignature", label: "Date Of Signature", date: true },
  { key: "parentGuardianSignature", label: "Parent/Guardian Signature" },
  { key: "collegeName", label: "College Name" },
  { key: "degree", label: "Degree" },
  { key: "companyName", label: "Company Name" },
  { key: "jobRole", label: "Role" },
  { key: "location", label: "Location" },
];
