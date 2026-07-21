"use client";

import { useState } from "react";
import type { Department } from "@/lib/types";
import type { StaffListItem } from "@/lib/queries/staff";

const ROLES = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Staff" },
  { id: 3, name: "Student" },
];

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
  const [rowBusyId, setRowBusyId] = useState<number | null>(null);
  const [rowError, setRowError] = useState("");

  async function refreshStaff() {
    const refreshed = await fetch("/api/admin/staff").then((r) => r.json());
    setStaff(refreshed);
  }

  async function handleRoleChange(id: number, roleId: number) {
    setRowError("");
    setRowBusyId(id);
    try {
      const res = await fetch(`/api/admin/staff/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roleId }),
      });
      const result = await res.json();
      if (!res.ok) {
        setRowError(result.error || "Failed to update role.");
        return;
      }
      await refreshStaff();
    } catch {
      setRowError("Something went wrong. Please try again.");
    } finally {
      setRowBusyId(null);
    }
  }

  async function handleDelete(id: number, name: string) {
    if (!window.confirm(`Delete ${name}? This also removes their login and cannot be undone.`)) {
      return;
    }
    setRowError("");
    setRowBusyId(id);
    try {
      const res = await fetch(`/api/admin/staff/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (!res.ok) {
        setRowError(result.error || "Failed to delete staff.");
        return;
      }
      await refreshStaff();
    } catch {
      setRowError("Something went wrong. Please try again.");
    } finally {
      setRowBusyId(null);
    }
  }

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

      {rowError && <div className="error-message">{rowError}</div>}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Staff Code</th>
            <th>Department</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {staff.length === 0 && (
            <tr>
              <td colSpan={7} style={{ textAlign: "center", color: "var(--color-text-muted)" }}>
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
                <select
                  value={s.roleId}
                  disabled={rowBusyId === s.id}
                  onChange={(e) => handleRoleChange(s.id, Number(e.target.value))}
                >
                  {ROLES.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </td>
              <td>
                <span className={`admin-badge ${s.isActive ? "active" : "inactive"}`}>
                  {s.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  disabled={rowBusyId === s.id}
                  onClick={() => handleDelete(s.id, s.fullName)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
