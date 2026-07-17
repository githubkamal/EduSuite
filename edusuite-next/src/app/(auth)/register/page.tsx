"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
      <div className="auth-image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/login.png" alt="" />
      </div>

      <div className="auth-panel">
        <div className="header">
          <h1>Alumni Management System</h1>
          <p>B.Sc. Computer Science, Madras Christian College</p>
        </div>

        <div className="content">
          <h2>Staff Registration</h2>
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
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" required />
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
