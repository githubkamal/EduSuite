export interface Department {
  departmentId: number;
  departmentName: string;
}

export interface Batch {
  batchId: number;
  batchName: string;
}

export interface Role {
  roleId: number;
  roleName: string;
}

export interface Login {
  id: number;
  email: string;
  passwordHash: string;
  roleId: number;
  isActive: boolean;
}

export interface AlumniRecord {
  alumniId: number;
  departmentId: number;
  departmentName?: string;
  batchId: number;
  batchName?: string;
  name: string | null;
  regNo: string | null;
  mccEmail: string | null;
  dateOfBirth: string | null;
  personalEmail: string | null;
  religionCommunity: string | null;
  nationality: string | null;
  aadharNo: string | null;
  bloodGroup: string | null;
  mobileNumber: string | null;
  sslcSchool: string | null;
  sslcMarks: string | null;
  sslcPercentage: string | null;
  sslcAchievements: string | null;
  hscSchool: string | null;
  hscMarks: string | null;
  hscPercentage: string | null;
  hscAchievements: string | null;
  hallNameRoom: string | null;
  fatherName: string | null;
  fatherMobile: string | null;
  motherName: string | null;
  motherMobile: string | null;
  localGuardianName: string | null;
  localGuardianPhone: string | null;
  languagesKnown: string | null;
  specialHealthComplaint: string | null;
  physicalDisability: string | null;
  imagePath: string | null;
  collegeName: string | null;
  degree: string | null;
  companyName: string | null;
  jobRole: string | null;
  location: string | null;
  otherStatus: string | null;
  statusDocumentPath: string | null;
  createdOn?: string;
  modifiedOn?: string;
  createdBy?: number | null;
  modifiedBy?: number | null;
}

export interface AlumniSearchRequest {
  page: number;
  pageSize: number;
  search?: string;
  sortColumn?: string;
  sortDir?: string;
  filters?: Record<string, string[]>;
}

export interface AlumniSearchResponse {
  data: AlumniRecord[];
  total: number;
}
