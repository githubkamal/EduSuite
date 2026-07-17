"use client";

import { useState } from "react";
import type { Department } from "@/lib/types";

export function CourseManager({ initialCourses }: { initialCourses: Department[] }) {
  const [courses, setCourses] = useState<Department[]>(initialCourses);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  async function refresh() {
    const res = await fetch("/api/admin/courses");
    setCourses(await res.json());
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim() }),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Failed to add course.");
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

  function startEdit(course: Department) {
    setEditingId(course.departmentId);
    setEditingName(course.departmentName);
    setError("");
  }

  async function saveEdit(id: number) {
    if (!editingName.trim()) return;
    setError("");
    try {
      const res = await fetch(`/api/admin/courses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editingName.trim() }),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Failed to update course.");
        return;
      }
      setEditingId(null);
      await refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    }
  }

  async function handleDelete(id: number, name: string) {
    if (!confirm(`Delete "${name}"? This can't be undone.`)) return;
    setError("");
    try {
      const res = await fetch(`/api/admin/courses/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Failed to delete course.");
        return;
      }
      await refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div>
      <h2>Courses</h2>

      <div className="admin-section-card">
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleAdd} style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label>New Course Name</label>
            <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g., B.Com" />
          </div>
          <button type="submit" className="btn" disabled={submitting}>
            {submitting ? "Adding..." : "Add Course"}
          </button>
        </form>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th style={{ width: 120 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length === 0 && (
            <tr>
              <td colSpan={2} style={{ textAlign: "center", color: "var(--color-text-muted)" }}>
                No courses yet.
              </td>
            </tr>
          )}
          {courses.map((c) => (
            <tr key={c.departmentId}>
              <td>
                {editingId === c.departmentId ? (
                  <input value={editingName} onChange={(e) => setEditingName(e.target.value)} autoFocus />
                ) : (
                  c.departmentName
                )}
              </td>
              <td>
                <div className="admin-inline-actions">
                  {editingId === c.departmentId ? (
                    <>
                      <button type="button" className="admin-icon-btn" onClick={() => saveEdit(c.departmentId)} title="Save">
                        <i className="fas fa-check" />
                      </button>
                      <button type="button" className="admin-icon-btn" onClick={() => setEditingId(null)} title="Cancel">
                        <i className="fas fa-times" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button type="button" className="admin-icon-btn" onClick={() => startEdit(c)} title="Edit">
                        <i className="fas fa-edit" />
                      </button>
                      <button
                        type="button"
                        className="admin-icon-btn danger"
                        onClick={() => handleDelete(c.departmentId, c.departmentName)}
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
