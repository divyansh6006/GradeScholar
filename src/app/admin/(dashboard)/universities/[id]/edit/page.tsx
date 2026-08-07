import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { db } from "@/lib/db";
import { UniversityForm } from "@/components/admin/UniversityForm";

export const dynamic = "force-dynamic";

export default async function EditUniversityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const university = await db.university.findUnique({ where: { id } });
  if (!university) notFound();

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <Link href="/admin/universities" className="flex items-center gap-1 text-sm font-medium text-green-900/55 hover:text-green-950">
        <ChevronLeft className="h-4 w-4" />
        Back to Universities
      </Link>
      <h1 className="mt-4 font-display text-2xl font-semibold text-green-950">Edit {university.shortName}</h1>

      <div className="mt-6">
        <UniversityForm university={university} />
      </div>
    </div>
  );
}
