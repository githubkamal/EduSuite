"use client";

import { useState } from "react";
import type { Batch } from "@/lib/types";

export function BatchManager({ initialBatches }: { initialBatches: Batch[] }) {
  const [batches, setBatches] = useState<Batch[]>(initialBatches);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  async function refresh() {
    const res = await fetch("/api/admin/batches");
    if (res.ok) {
      setBatches(await res.json());
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/batches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim() }),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Failed to add batch.");
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

  function startEdit(batch: Batch) {
    setEditingId(batch.batchId);
    setEditingName(batch.batchName);
    setError("");
  }

  async function saveEdit(id: number) {
    if (!editingName.trim()) return;
    setError("");
    try {
      const res = await fetch(`/api/admin/batches/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editingName.trim() }),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Failed to update batch.");
        return;
      }
      setEditingId(null);
      await refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    }
  }

  async function handleDelete(id: number, name: string) {
    if (!confirm(`Delete batch "${name}"? This cannot be undone.`)) return;
    setError("");
    try {
      const res = await fetch(`/api/admin/batches/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Failed to delete batch.");
        return;
      }
      await refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div>
      <h2>Batches</h2>

      <div className="admin-section-card">
        {error && <div className="error-message" style={{ display: "block", marginBottom: 16 }}>{error}</div>}
        <form onSubmit={handleAdd} style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label>New Batch Name</label>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g., 2021-2024"
              required
            />
          </div>
          <button type="submit" className="btn" disabled={submitting}>
            {submitting ? "Adding..." : "Add Batch"}
          </button>
        </form>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Batch Name</th>
            <th style={{ width: 120 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {batches.length === 0 && (
            <tr>
              <td colSpan={2} style={{ textAlign: "center", color: "var(--color-text-muted)" }}>
                No batches yet.
              </td>
            </tr>
          )}
          {batches.map((b) => (
            <tr key={b.batchId}>
              <td>
                {editingId === b.batchId ? (
                  <input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    autoFocus
                    style={{ width: "100%" }}
                  />
                ) : (
                  b.batchName
                )}
              </td>
              <td>
                <div className="admin-inline-actions">
                  {editingId === b.batchId ? (
                    <>
                      <button type="button" className="admin-icon-btn" onClick={() => saveEdit(b.batchId)} title="Save">
                        <i className="fas fa-check" />
                      </button>
                      <button type="button" className="admin-icon-btn" onClick={() => setEditingId(null)} title="Cancel">
                        <i className="fas fa-times" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button type="button" className="admin-icon-btn" onClick={() => startEdit(b)} title="Edit">
                        <i className="fas fa-edit" />
                      </button>
                      <button
                        type="button"
                        className="admin-icon-btn danger"
                        onClick={() => handleDelete(b.batchId, b.batchName)}
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
