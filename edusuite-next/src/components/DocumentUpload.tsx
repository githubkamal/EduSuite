"use client";

import { useRef, useState } from "react";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024;

/**
 * Generic single-document uploader (image or PDF) with a filename/link
 * preview instead of the circular avatar look of ImageUpload — used for
 * status-related documents like a college ID card or offer letter.
 */
export function DocumentUpload({
  label,
  icon = "fa-file-upload",
  value,
  onChange,
}: {
  label: string;
  icon?: string;
  value: string | null;
  onChange: (url: string | null) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Unsupported file type. Use JPEG, PNG, WEBP, GIF, or PDF.");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError("File must be 5MB or smaller.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Upload failed.");
        return;
      }
      onChange(result.url);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="form-group">
      <label><i className={`fas ${icon}`} /> {label}</label>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif,application/pdf" onChange={handleFileChange} disabled={uploading} />
        {uploading && <span style={{ fontSize: 13, color: "var(--color-accent)" }}>Uploading...</span>}
        {value && !uploading && (
          <>
            <a href={value} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "var(--color-accent)" }}>
              View uploaded file
            </a>
            <button
              type="button"
              onClick={() => onChange(null)}
              style={{ background: "none", border: "none", color: "var(--color-accent)", textDecoration: "underline", cursor: "pointer", fontSize: 13, padding: 0 }}
            >
              Remove
            </button>
          </>
        )}
      </div>
      {error && <div style={{ fontSize: 13, color: "#f44336", marginTop: 4 }}>{error}</div>}
    </div>
  );
}
