import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ChevronLeft, Phone, Mail, GraduationCap, BookOpen, Briefcase, Radio } from "lucide-react";
import { LeadStatusPanel } from "@/components/admin/LeadStatusPanel";
import { LeadNotes } from "@/components/admin/LeadNotes";

export const dynamic = "force-dynamic";

export default async function AdminLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await db.lead.findUnique({
    where: { id },
    include: { notes: { orderBy: { createdAt: "desc" } } },
  });

  if (!lead) notFound();

  const fields = [
    { icon: Phone, label: "Phone", value: lead.phone },
    { icon: Mail, label: "Email", value: lead.email },
    { icon: BookOpen, label: "Program", value: lead.program },
    { icon: GraduationCap, label: "University", value: lead.university || "Not specified" },
    { icon: Briefcase, label: "Experience", value: lead.experience },
    { icon: Radio, label: "Source", value: lead.source },
  ];

  return (
    <div className="p-6 lg:p-8">
      <Link href="/admin/leads" className="flex items-center gap-1 text-sm font-medium text-green-900/55 hover:text-green-950">
        <ChevronLeft className="h-4 w-4" />
        Back to Leads
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-green-950">{lead.name}</h1>
          <p className="mt-1 text-sm text-green-900/50">
            Received {new Date(lead.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-green-900/8 bg-white p-6">
            <h2 className="font-display text-base font-semibold text-green-950">Contact & Interest</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.label} className="flex items-start gap-3">
                  <f.icon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-green-900/40">{f.label}</p>
                    <p className="text-sm font-medium text-green-950">{f.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <LeadNotes leadId={lead.id} initialNotes={lead.notes} />
        </div>

        <div className="space-y-6">
          <LeadStatusPanel leadId={lead.id} initialStatus={lead.status} />
        </div>
      </div>
    </div>
  );
}
