import type { Metadata } from "next";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./(auth)/welcome.css";
import "./alumni/alumni.css";
import "./admin/admin.css";

export const metadata: Metadata = {
  title: "Roots and Routes - Alumni Mangement System",
  description: "Department of Computer Science (Shift-II)Madras Christian College",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
