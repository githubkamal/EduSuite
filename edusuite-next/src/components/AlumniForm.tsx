"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Department, Batch, AlumniRecord } from "@/lib/types";
import { ALUMNI_SECTIONS, BLOOD_GROUPS, HIGHER_STUDIES_FIELDS, EMPLOYMENT_FIELDS } from "@/lib/alumniFields";
import { ImageUpload } from "@/components/ImageUpload";

type FormValues = Record<string, string>;
type CareerStatus = "" | "studying" | "working";

function initialCareerStatus(record?: Partial<AlumniRecord>): CareerStatus {
  if (record?.collegeName || record?.degree) return "studying";
  if (record?.companyName || record?.jobRole || record?.location) return "working";
  return "";
}

function toFormValues(record?: Partial<AlumniRecord>): FormValues {
  const values: FormValues = {
    departmentId: record?.departmentId ? String(record.departmentId) : "",
    batchId: record?.batchId ? String(record.batchId) : "",
  };
  for (const field of [...ALUMNI_SECTIONS.flatMap((s) => s.fields), ...HIGHER_STUDIES_FIELDS, ...EMPLOYMENT_FIELDS]) {
    const v = (record as unknown as Record<string, string | null | undefined>)?.[field.key];
    values[field.key] = v ?? "";
  }
  return values;
}

export function AlumniForm({
  mode,
  alumniId,
  departments,
  batches,
  initialValues,
}: {
  mode: "create" | "edit";
  alumniId?: number;
  departments: Department[];
  batches: Batch[];
  initialValues?: Partial<AlumniRecord>;
}) {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>(() => toFormValues(initialValues));
  const [imagePath, setImagePath] = useState<string | null>(initialValues?.imagePath ?? null);
  const [careerStatus, setCareerStatus] = useState<CareerStatus>(() => initialCareerStatus(initialValues));
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function setField(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const dto: Record<string, unknown> = {
      departmentId: Number(values.departmentId),
      batchId: Number(values.batchId),
      imagePath,
    };
    for (const section of ALUMNI_SECTIONS) {
      for (const field of section.fields) {
        dto[field.key] = values[field.key] || null;
      }
    }
    for (const field of HIGHER_STUDIES_FIELDS) {
      dto[field.key] = careerStatus === "studying" ? values[field.key] || null : null;
    }
    for (const field of EMPLOYMENT_FIELDS) {
      dto[field.key] = careerStatus === "working" ? values[field.key] || null : null;
    }

    try {
      const url = mode === "create" ? "/api/alumni" : `/api/alumni/${alumniId}`;
      const method = mode === "create" ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Something went wrong.");
        return;
      }
      router.push("/alumni/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>{mode === "create" ? "Add Alumni Information" : "Edit Alumni Information"}</h2>
        <button className="btn" type="button" onClick={() => router.push("/alumni/dashboard")}>
          &larr; Back to Dashboard
        </button>
      </div>

      {error && <div className="error-message" style={{ display: "block" }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <h3>Profile Photo</h3>
        <ImageUpload value={imagePath} onChange={setImagePath} />

        <h3>Department Information</h3>
        <div className="form-row">
          <div className="form-group">
            <label><i className="fas fa-building" /> Department *</label>
            <select value={values.departmentId} onChange={(e) => setField("departmentId", e.target.value)} required>
              <option value="">-- Select Department --</option>
              {departments.map((d) => (
                <option key={d.departmentId} value={d.departmentId}>{d.departmentName}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label><i className="fas fa-users" /> Batch *</label>
            <select value={values.batchId} onChange={(e) => setField("batchId", e.target.value)} required>
              <option value="">-- Select Batch --</option>
              {batches.map((b) => (
                <option key={b.batchId} value={b.batchId}>{b.batchName}</option>
              ))}
            </select>
          </div>
        </div>

        {ALUMNI_SECTIONS.map((section) => (
          <div key={section.title}>
            <h3>{section.title}</h3>
            <div className="form-row">
              {section.fields.map((field) => (
                <div className="form-group" key={field.key}>
                  <label><i className={`${field.iconPrefix ?? "fas"} ${field.icon}`} /> {field.label} {field.required ? "*" : ""}</label>
                  {field.key === "bloodGroup" ? (
                    <select value={values.bloodGroup} onChange={(e) => setField("bloodGroup", e.target.value)}>
                      <option value="">Select Blood Group</option>
                      {BLOOD_GROUPS.map((bg) => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={values[field.key]}
                      placeholder={field.placeholder}
                      required={field.required}
                      onChange={(e) => setField(field.key, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <h3>Current Status</h3>
        <div className="form-group">
          <label style={{ display: "flex", gap: 20, fontWeight: 400 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input
                type="radio"
                name="careerStatus"
                checked={careerStatus === "studying"}
                onChange={() => setCareerStatus("studying")}
              />
              Pursuing higher studies
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input
                type="radio"
                name="careerStatus"
                checked={careerStatus === "working"}
                onChange={() => setCareerStatus("working")}
              />
              Currently working
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input
                type="radio"
                name="careerStatus"
                checked={careerStatus === ""}
                onChange={() => setCareerStatus("")}
              />
              Not specified
            </span>
          </label>
        </div>

        {careerStatus === "studying" && (
          <div className="form-row">
            {HIGHER_STUDIES_FIELDS.map((field) => (
              <div className="form-group" key={field.key}>
                <label><i className={`${field.iconPrefix ?? "fas"} ${field.icon}`} /> {field.label}</label>
                <input
                  type={field.type}
                  value={values[field.key]}
                  placeholder={field.placeholder}
                  onChange={(e) => setField(field.key, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}

        {careerStatus === "working" && (
          <div className="form-row">
            {EMPLOYMENT_FIELDS.map((field) => (
              <div className="form-group" key={field.key}>
                <label><i className={`${field.iconPrefix ?? "fas"} ${field.icon}`} /> {field.label}</label>
                <input
                  type={field.type}
                  value={values[field.key]}
                  placeholder={field.placeholder}
                  onChange={(e) => setField(field.key, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 30 }}>
          <button type="button" className="btn btn-secondary" onClick={() => router.push("/alumni/dashboard")}>
            <i className="fas fa-times" /> Cancel
          </button>
          <button type="submit" className="btn" disabled={submitting}>
            <i className="fas fa-save" /> {mode === "create" ? "Save Alumni Information" : "Update Alumni Information"}
          </button>
        </div>
      </form>
    </>
  );
}
