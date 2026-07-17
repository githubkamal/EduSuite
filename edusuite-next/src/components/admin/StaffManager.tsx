"use client";

import { useState } from "react";
import type { Department } from "@/lib/types";
import type { StaffListItem } from "@/lib/queries/staff";

export function StaffManager({
  initialStaff,
  departments,
}: {
  initialStaff: StaffListItem[];
  departments: Department[];
}) {
  const [staff, setStaff] = useState<StaffListItem[]>(initialStaff);
  const [showForm, setShowForm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [staffCode, setStaffCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function resetForm() {
    setFullName("");
    setStaffCode("");
    setEmail("");
    setPassword("");
    setDepartmentId("");
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          staffCode,
          email,
          password,
          departmentId: Number(departmentId),
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Failed to add staff.");
        return;
      }

      const refreshed = await fetch("/api/admin/staff").then((r) => r.json());
      setStaff(refreshed);
      resetForm();
      setShowForm(false);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>Staff Accounts</h2>
        <button className="btn" onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Cancel" : "+ Add Staff"}
        </button>
      </div>

      {showForm && (
        <div className="admin-section-card">
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Staff Code</label>
                <input value={staffCode} onChange={(e) => setStaffCode(e.target.value)} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Department</label>
                <select value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} required>
                  <option value="">-- Select Department --</option>
                  {departments.map((d) => (
                    <option key={d.departmentId} value={d.departmentId}>{d.departmentName}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Temporary Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn" disabled={submitting}>
              {submitting ? "Adding..." : "Add Staff"}
            </button>
          </form>
        </div>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Staff Code</th>
            <th>Department</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {staff.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", color: "var(--color-text-muted)" }}>
                No staff accounts yet.
              </td>
            </tr>
          )}
          {staff.map((s) => (
            <tr key={s.id}>
              <td>{s.fullName}</td>
              <td>{s.staffCode}</td>
              <td>{s.departmentName}</td>
              <td>{s.email}</td>
              <td>
                <span className={`admin-badge ${s.isActive ? "active" : "inactive"}`}>
                  {s.isActive ? "Active" : "Inactive"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
