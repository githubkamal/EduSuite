"use client";

import { useRouter } from "next/navigation";

export function AppHeader({ userName }: { userName: string }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <div className="header">
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
        <button className="btn btn-logout" onClick={logout}>
          Logout
        </button>
      </div>
      <div className="header-content">
        <h1>Alumni Management System</h1>
        <p>B.Sc. Computer Science, Madras Christian College</p>
      </div>
    </div>
  );
}
