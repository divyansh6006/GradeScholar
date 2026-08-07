import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { UniversityForm } from "@/components/admin/UniversityForm";

export default function NewUniversityPage() {
  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <Link href="/admin/universities" className="flex items-center gap-1 text-sm font-medium text-green-900/55 hover:text-green-950">
        <ChevronLeft className="h-4 w-4" />
        Back to Universities
      </Link>
      <h1 className="mt-4 font-display text-2xl font-semibold text-green-950">Add University</h1>
      <p className="mt-1 text-sm text-green-900/55">This will appear live on the site immediately if published.</p>

      <div className="mt-6">
        <UniversityForm />
      </div>
    </div>
  );
}
