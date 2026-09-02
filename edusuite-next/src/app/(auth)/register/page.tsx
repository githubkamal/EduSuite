"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthSlideshow } from "@/components/AuthSlideshow";
import type { Department } from "@/lib/types";

export default function RegisterPage() {
  const router = useRouter();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [fullName, setFullName] = useState("");
  const [staffCode, setStaffCode] = useState("");
  const [email, setEmail] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/lookup/departments")
      .then((res) => res.json())
      .then(setDepartments)
      .catch(() => setDepartments([]));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          staffCode,
          email,
          departmentId: Number(departmentId),
          password,
          roleId: 2, // Staff, mirrors the hidden RoleId field on the original Register form
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Registration failed.");
        return;
      }
      router.push("/login?registered=1");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-card">
      <AuthSlideshow />

      <div className="auth-panel">
        <div
          className="header"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 10,
            marginBottom: 24,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.jpg"
            alt="MCC Logo"
            style={{ height: 80, width: "auto", objectFit: "contain" }}
          />
          <div>
            <h1 style={{ margin: "4px 0 0 0", fontSize: "1.3rem", lineHeight: 1.25 }}>
              Roots and Routes - Alumni Management System
            </h1>
            <p style={{ margin: "4px 0 0 0", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
              Department of Computer Science (Shift-II) Madras Christian College
            </p>
          </div>
        </div>

        <div className="content">
          <h2 style={{ textAlign: "center", marginBottom: 20 }}>Staff Registration</h2>
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} id="signupForm">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="form-control" required />
              </div>
              <div className="form-group">
                <label>StaffCode</label>
                <input value={staffCode} onChange={(e) => setStaffCode(e.target.value)} className="form-control" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="staff@mcc.edu.in" required />
              </div>
              <div className="form-group">
                <label>Department</label>
                <select value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} className="form-control" required>
                  <option value="">-- Select Department --</option>
                  {departments.map((d) => (
                    <option key={d.departmentId} value={d.departmentId}>
                      {d.departmentName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required />
            </div>
            <button type="submit" className="btn" disabled={submitting}>
              {submitting ? "Signing up..." : "Sign Up"}
            </button>
          </form>
          <div className="link">
            <a href="/login">Already have an account? Login here</a>
          </div>
        </div>
      </div>
    </div>
  );
}
