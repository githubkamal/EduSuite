"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (searchParams.get("registered") === "1") {
      setShowSuccessToast(true);
      const timer = setTimeout(() => setShowSuccessToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Invalid username or password.");
        return;
      }
      router.push(result.redirectTo || "/alumni/dashboard");
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
          <h2>Staff Login</h2>
          {error && <div className="error-message">{error}</div>}

          {showSuccessToast && (
            <div
              style={{
                position: "fixed",
                bottom: 20,
                right: 20,
                background: "#166534",
                color: "white",
                padding: "12px 20px",
                borderRadius: 8,
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              Registration successful! Please log in.
            </div>
          )}

          <form onSubmit={handleSubmit} id="loginForm">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn" disabled={submitting}>
              {submitting ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="link">
            <a href="/register">Don&rsquo;t have an account? Register here</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginPageInner />
    </Suspense>
  );
}
