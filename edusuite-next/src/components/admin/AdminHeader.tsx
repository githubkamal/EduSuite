"use client";

import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/LogoutButton";

export function AdminHeader({ userName }: { userName: string }) {
  const pathname = usePathname();

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
          <h1 style={{ margin: 0, fontSize: "1.35rem", lineHeight: 1.2 }}>Admin Panel</h1>
          <p style={{ margin: "4px 0 0 0", fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
            Manage departments, batches, bulk data import, and staff accounts
          </p>
        </div>
      </div>
      <div className="header-user">
        <nav className="admin-nav">
          <a
            href="/admin/departments"
            className={pathname?.startsWith("/admin/departments") || pathname?.startsWith("/admin/courses") ? "active" : ""}
          >
            Departments
          </a>
          <a
            href="/admin/batches"
            className={pathname?.startsWith("/admin/batches") ? "active" : ""}
          >
            Batches
          </a>
          <a
            href="/admin/import"
            className={pathname?.startsWith("/admin/import") ? "active" : ""}
          >
            Bulk Import
          </a>
          <a
            href="/admin/staff"
            className={pathname?.startsWith("/admin/staff") ? "active" : ""}
          >
            Staff
          </a>
          <a href="/alumni/dashboard">Dashboard</a>
        </nav>
        <span className="user-name">
          <span className="user-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </span>
          <span>Welcome, {userName}</span>
        </span>
        <LogoutButton />
      </div>
    </div>
  );
}
