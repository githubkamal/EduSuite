"use client";

import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/LogoutButton";

export function AdminHeader({ userName }: { userName: string }) {
  const pathname = usePathname();

  return (
    <div className="header">
      <div className="header-content">
        <h1>Admin Panel</h1>
        <p>Manage staff accounts and courses</p>
      </div>
      <div className="header-user">
        <nav className="admin-nav">
          <a href="/admin/staff" className={pathname?.startsWith("/admin/staff") ? "active" : ""}>
            Staff
          </a>
          <a href="/admin/courses" className={pathname?.startsWith("/admin/courses") ? "active" : ""}>
            Courses
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
