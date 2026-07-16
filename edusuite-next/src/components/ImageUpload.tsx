"use client";

import { useRef, useState } from "react";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024;

export function ImageUpload({
  value,
  onChange,
}: {
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
      setError("Unsupported image type. Use JPEG, PNG, WEBP, or GIF.");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError("Image must be 5MB or smaller.");
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
      <label><i className="fas fa-image" /> Profile Photo</label>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            overflow: "hidden",
            background: "#f0f0f0",
            border: "2px solid #e0e0e0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <i className="fas fa-user" style={{ fontSize: 28, color: "#bbb" }} />
          )}
        </div>
        <div>
          <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleFileChange} disabled={uploading} />
          {uploading && <div style={{ fontSize: 13, color: "#667eea", marginTop: 4 }}>Uploading...</div>}
          {error && <div style={{ fontSize: 13, color: "#f44336", marginTop: 4 }}>{error}</div>}
          {value && !uploading && (
            <button
              type="button"
              onClick={() => onChange(null)}
              style={{ marginTop: 4, background: "none", border: "none", color: "#667eea", textDecoration: "underline", cursor: "pointer", fontSize: 13, padding: 0 }}
            >
              Remove photo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
