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
  nameFromForm: string | null;
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
  modeOfConveyance: string | null;
  hallNameRoom: string | null;
  localGuardianName: string | null;
  localGuardianPhone: string | null;
  hobbies: string | null;
  extraCurricularInterests: string | null;
  socialFacebook: string | null;
  socialInstagram: string | null;
  socialTwitter: string | null;
  languagesKnown: string | null;
  interestedInPartTimeJob: string | null;
  specialHealthComplaint: string | null;
  physicalDisability: string | null;
  emergencyPhone: string | null;
  dateOfSignature: string | null;
  parentGuardianSignature: string | null;
  imagePath: string | null;
  collegeName: string | null;
  degree: string | null;
  companyName: string | null;
  jobRole: string | null;
  location: string | null;
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
