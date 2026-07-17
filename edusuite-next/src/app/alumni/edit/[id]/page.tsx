import { notFound } from "next/navigation";
import { getDepartments, getBatches } from "@/lib/queries/lookup";
import { getAlumniById } from "@/lib/queries/alumni";
import { getSession } from "@/lib/auth";
import { AlumniForm } from "@/components/AlumniForm";

export default async function EditAlumniPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const alumniId = parseInt(id, 10);
  if (!Number.isFinite(alumniId)) notFound();

  const [departments, batches, alumni, session] = await Promise.all([
    getDepartments(),
    getBatches(),
    getAlumniById(alumniId),
    getSession(),
  ]);

  if (!alumni) notFound();

  return (
    <AlumniForm
      mode="edit"
      alumniId={alumniId}
      departments={departments}
      batches={batches}
      initialValues={alumni}
      isAdmin={session?.role === "Admin"}
    />
  );
}
