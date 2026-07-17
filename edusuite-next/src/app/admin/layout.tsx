import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  if (session.role !== "Admin") {
    redirect("/alumni/dashboard");
  }

  return (
    <div className="alumni-body">
      <div className="container">
        <AdminHeader userName={session.name} />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
