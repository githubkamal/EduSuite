import { getDepartments, getBatches } from "@/lib/queries/lookup";
import { AlumniForm } from "@/components/AlumniForm";

export default async function CreateAlumniPage() {
  const [departments, batches] = await Promise.all([getDepartments(), getBatches()]);

  return <AlumniForm mode="create" departments={departments} batches={batches} />;
}
