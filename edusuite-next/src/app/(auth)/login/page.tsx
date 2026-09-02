"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthSlideshow } from "@/components/AuthSlideshow";

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
          <h2 style={{ textAlign: "center", marginBottom: 20 }}>Staff Login</h2>
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
                zIndex: 999,
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
                placeholder="staff@mcc.edu.in"
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
                placeholder="Enter your password"
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
