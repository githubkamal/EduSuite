"use client";

import { useState } from "react";
import type { Department } from "@/lib/types";

export function DepartmentManager({ initialDepartments }: { initialDepartments: Department[] }) {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  async function refresh() {
    const res = await fetch("/api/admin/departments");
    if (res.ok) {
      setDepartments(await res.json());
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/departments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim() }),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Failed to add department.");
        return;
      }
      setNewName("");
      await refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function startEdit(dept: Department) {
    setEditingId(dept.departmentId);
    setEditingName(dept.departmentName);
    setError("");
  }

  async function saveEdit(id: number) {
    if (!editingName.trim()) return;
    setError("");
    try {
      const res = await fetch(`/api/admin/departments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editingName.trim() }),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Failed to update department.");
        return;
      }
      setEditingId(null);
      await refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    }
  }

  async function handleDelete(id: number, name: string) {
    if (!confirm(`Delete department "${name}"? This cannot be undone.`)) return;
    setError("");
    try {
      const res = await fetch(`/api/admin/departments/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Failed to delete department.");
        return;
      }
      await refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div>
      <h2>Departments</h2>

      <div className="admin-section-card">
        {error && <div className="error-message" style={{ display: "block", marginBottom: 16 }}>{error}</div>}
        <form onSubmit={handleAdd} style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label>New Department Name</label>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g., Computer Science (B.Sc)"
              required
            />
          </div>
          <button type="submit" className="btn" disabled={submitting}>
            {submitting ? "Adding..." : "Add Department"}
          </button>
        </form>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Department Name</th>
            <th style={{ width: 120 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.length === 0 && (
            <tr>
              <td colSpan={2} style={{ textAlign: "center", color: "var(--color-text-muted)" }}>
                No departments yet.
              </td>
            </tr>
          )}
          {departments.map((d) => (
            <tr key={d.departmentId}>
              <td>
                {editingId === d.departmentId ? (
                  <input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    autoFocus
                    style={{ width: "100%" }}
                  />
                ) : (
                  d.departmentName
                )}
              </td>
              <td>
                <div className="admin-inline-actions">
                  {editingId === d.departmentId ? (
                    <>
                      <button type="button" className="admin-icon-btn" onClick={() => saveEdit(d.departmentId)} title="Save">
                        <i className="fas fa-check" />
                      </button>
                      <button type="button" className="admin-icon-btn" onClick={() => setEditingId(null)} title="Cancel">
                        <i className="fas fa-times" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button type="button" className="admin-icon-btn" onClick={() => startEdit(d)} title="Edit">
                        <i className="fas fa-edit" />
                      </button>
                      <button
                        type="button"
                        className="admin-icon-btn danger"
                        onClick={() => handleDelete(d.departmentId, d.departmentName)}
                        title="Delete"
                      >
                        <i className="fas fa-trash" />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
