"use client";

import { LogoutButton } from "@/components/LogoutButton";

export function AppHeader({ userName, role }: { userName: string; role?: string }) {
  return (
    <div className="header">
      <div className="header-content" style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.jpg"
          alt="MCC Logo"
          style={{ height: 68, width: "auto", objectFit: "contain", flexShrink: 0 }}
        />
        <div>
          <h1 style={{ margin: 0, fontSize: "1.35rem", lineHeight: 1.2 }}>
            Roots and Routes - Alumni Management System
          </h1>
          <p style={{ margin: "4px 0 0 0", fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
            Department of Computer Science (Shift-II), Madras Christian College
          </p>
        </div>
      </div>
      <div className="header-user">
        <span className="user-name">
          <span className="user-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </span>
          <span>Welcome, {userName}</span>
        </span>
        {role === "Admin" && (
          <a href="/admin/departments" className="btn-logout">
            Admin Panel
          </a>
        )}
        <LogoutButton />
      </div>
    </div>
  );
}
