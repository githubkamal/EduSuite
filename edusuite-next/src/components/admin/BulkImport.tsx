"use client";

import { useState, useRef } from "react";
import type { Department, Batch } from "@/lib/types";

const TEMPLATE_HEADERS = [
  "Roll Number",
  "Full Name",
  "MCC Email",
  "Date of Birth",
  "Personal Email",
  "Mobile Number",
  "Religion & Community",
  "Nationality",
  "Aadhar Number",
  "Blood Group",
  "Languages Known",
  "Special Health Complaint",
  "Physical Disability",
  "SSLC School Name",
  "SSLC Marks",
  "SSLC Percentage",
  "SSLC Achievements",
  "HSC School Name",
  "HSC Marks",
  "HSC Percentage",
  "HSC Achievements",
  "Hall Name / Room",
  "Father's Name",
  "Father's Mobile Number",
  "Mother's Name",
  "Mother's Mobile Number",
  "Local Guardian Name",
  "Local Guardian Phone",
  "College Name",
  "Degree",
  "Company Name",
  "Role",
  "Location",
  "Other Status",
];

const SAMPLE_ROW: Record<string, string> = {
  "Roll Number": "21CS001",
  "Full Name": "John Doe",
  "MCC Email": "john.doe@mcc.edu",
  "Date of Birth": "2003-05-15",
  "Personal Email": "johndoe@gmail.com",
  "Mobile Number": "9876543210",
  "Religion & Community": "Christian - BC",
  "Nationality": "Indian",
  "Aadhar Number": "123456789012",
  "Blood Group": "O+",
  "Languages Known": "English, Tamil",
  "Special Health Complaint": "None",
  "Physical Disability": "None",
  "SSLC School Name": "St. Joseph Higher Secondary School",
  "SSLC Marks": "465",
  "SSLC Percentage": "93%",
  "SSLC Achievements": "School 2nd Rank",
  "HSC School Name": "St. Joseph Higher Secondary School",
  "HSC Marks": "560",
  "HSC Percentage": "93.3%",
  "HSC Achievements": "Science Club Leader",
  "Hall Name / Room": "Selaiyur Hall Room 12",
  "Father's Name": "David Doe",
  "Father's Mobile Number": "9876543211",
  "Mother's Name": "Mary Doe",
  "Mother's Mobile Number": "9876543212",
  "Local Guardian Name": "Robert Doe",
  "Local Guardian Phone": "9876543213",
  "College Name": "Madras Christian College",
  "Degree": "M.Sc Computer Science",
  "Company Name": "Infosys",
  "Role": "Software Engineer",
  "Location": "Chennai, India",
  "Other Status": "",
};

export function BulkImport({
  departments,
  batches,
}: {
  departments: Department[];
  batches: Batch[];
}) {
  const [departmentId, setDepartmentId] = useState<string>(departments[0]?.departmentId ? String(departments[0].departmentId) : "");
  const [batchId, setBatchId] = useState<string>(batches[0]?.batchId ? String(batches[0].batchId) : "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    importedCount?: number;
    skippedCount?: number;
    totalRows?: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleDownloadTemplate(format: "xlsx" | "csv") {
    const XLSX = await import("xlsx");
    const ws = XLSX.utils.json_to_sheet([SAMPLE_ROW], { header: TEMPLATE_HEADERS });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Alumni_Template");

    if (format === "xlsx") {
      XLSX.writeFile(wb, "EduSuite_Alumni_Bulk_Import_Template.xlsx");
    } else {
      const csv = XLSX.utils.sheet_to_csv(ws);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "EduSuite_Alumni_Bulk_Import_Template.csv";
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedFile) {
      setResult({ success: false, message: "Please select an Excel or CSV file to import." });
      return;
    }
    if (!departmentId || !batchId) {
      setResult({ success: false, message: "Please select both a Department and a Batch." });
      return;
    }

    setUploading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("departmentId", departmentId);
    formData.append("batchId", batchId);

    try {
      const res = await fetch("/api/admin/import", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        setResult({
          success: false,
          message: data.error || "Failed to import file.",
        });
        return;
      }

      setResult({
        success: true,
        message: `Successfully imported ${data.importedCount} alumni record(s).`,
        importedCount: data.importedCount,
        skippedCount: data.skippedCount,
        totalRows: data.totalRows,
      });

      // Clear selected file
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      setResult({
        success: false,
        message: "An unexpected network error occurred while uploading. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <h2 style={{ margin: 0 }}>Bulk Import Alumni Data</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => handleDownloadTemplate("xlsx")}
            title="Download Excel spreadsheet template with all alumni columns"
          >
            <i className="fas fa-file-excel" style={{ color: "#166534" }} /> Download Excel Template
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => handleDownloadTemplate("csv")}
            title="Download CSV spreadsheet template with all alumni columns"
          >
            <i className="fas fa-file-csv" style={{ color: "#2563eb" }} /> Download CSV Template
          </button>
        </div>
      </div>

      <div className="admin-section-card">
        <p style={{ color: "var(--color-text-muted)", marginTop: 0, marginBottom: 24, fontSize: 14 }}>
          Upload a spreadsheet (.xlsx, .xls, or .csv) containing alumni records to import them directly into the database.
          Select the default Department and Batch to associate with the imported alumni.
        </p>

        {result && (
          <div
            className={result.success ? "success-message" : "error-message"}
            style={{
              display: "block",
              marginBottom: 20,
              padding: "12px 16px",
              borderRadius: "8px",
              background: result.success ? "#f0fdf4" : "#fef2f2",
              border: result.success ? "1px solid #bbf7d0" : "1px solid #fecaca",
              color: result.success ? "#166534" : "#991b1b",
              fontWeight: 500,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <i className={result.success ? "fas fa-check-circle" : "fas fa-exclamation-circle"} />
              <span>{result.message}</span>
            </div>
            {result.success && result.skippedCount !== undefined && result.skippedCount > 0 && (
              <div style={{ fontSize: 13, marginTop: 4, opacity: 0.9 }}>
                Note: {result.skippedCount} row(s) were skipped because they lacked both a Name and Roll Number.
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleUpload}>
          <div className="form-row">
            <div className="form-group" style={{ flex: 1 }}>
              <label><i className="fas fa-building" /> Department *</label>
              <select
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                required
              >
                <option value="">-- Select Department --</option>
                {departments.map((d) => (
                  <option key={d.departmentId} value={d.departmentId}>{d.departmentName}</option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label><i className="fas fa-users" /> Batch *</label>
              <select
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                required
              >
                <option value="">-- Select Batch --</option>
                {batches.map((b) => (
                  <option key={b.batchId} value={b.batchId}>{b.batchName}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginTop: 12 }}>
            <label><i className="fas fa-file-upload" /> Select Excel (.xlsx, .xls) or CSV (.csv) File *</label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx, .xls, .csv"
              required
              onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                border: "2px dashed #d1d5db",
                borderRadius: "10px",
                background: "#fafafa",
                cursor: "pointer",
              }}
            />
            {selectedFile && (
              <div style={{ marginTop: 8, fontSize: 13, color: "var(--color-text-muted)" }}>
                Selected: <strong>{selectedFile.name}</strong> ({(selectedFile.size / 1024).toFixed(1)} KB)
              </div>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 }}>
            <button
              type="submit"
              className="btn"
              disabled={uploading || !selectedFile}
              style={{ padding: "10px 24px", display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <i className={uploading ? "fas fa-spinner fa-spin" : "fas fa-cloud-upload-alt"} />
              {uploading ? "Importing Data..." : "Upload & Bulk Import"}
            </button>
          </div>
        </form>
      </div>

      <div className="admin-section-card">
        <h3 style={{ marginTop: 0, marginBottom: 12 }}>Supported Column Headers</h3>
        <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 16 }}>
          The bulk importer automatically matches any of the standard headers below:
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {TEMPLATE_HEADERS.map((h) => (
            <span
              key={h}
              style={{
                background: "#f3f4f6",
                border: "1px solid #e5e7eb",
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "12px",
                color: "#374151",
              }}
            >
              {h}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
