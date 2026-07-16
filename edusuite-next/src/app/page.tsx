import { redirect } from "next/navigation";

// Mirrors the original default MVC route: {controller=Account}/{action=Login}
export default function RootPage() {
  redirect("/login");
}
