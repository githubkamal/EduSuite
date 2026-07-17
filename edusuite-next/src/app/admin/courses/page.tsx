import { getDepartments } from "@/lib/queries/lookup";
import { CourseManager } from "@/components/admin/CourseManager";

export default async function AdminCoursesPage() {
  const courses = await getDepartments();

  return <CourseManager initialCourses={courses} />;
}
