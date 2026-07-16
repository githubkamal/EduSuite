import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AppHeader } from "@/components/AppHeader";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./alumni.css";

export default async function AlumniLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="alumni-body">
      <div className="container">
        <AppHeader userName={session.name} />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
