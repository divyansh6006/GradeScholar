import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ProgramForm } from "@/components/admin/ProgramForm";

export default function NewProgramPage() {
  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <Link href="/admin/programs" className="flex items-center gap-1 text-sm font-medium text-green-900/55 hover:text-green-950">
        <ChevronLeft className="h-4 w-4" />
        Back to Programs
      </Link>
      <h1 className="mt-4 font-display text-2xl font-semibold text-green-950">Add Program</h1>

      <div className="mt-6">
        <ProgramForm />
      </div>
    </div>
  );
}
