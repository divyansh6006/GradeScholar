import Link from "next/link";
import { db } from "@/lib/db";
import { Users, GraduationCap, BookOpen, Newspaper, TrendingUp, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function getStats() {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - 7);

  const [
    totalLeads,
    leadsToday,
    leadsThisWeek,
    newLeads,
    universityCount,
    programCount,
    blogCount,
    recentLeads,
  ] = await Promise.all([
    db.lead.count(),
    db.lead.count({ where: { createdAt: { gte: startOfToday } } }),
    db.lead.count({ where: { createdAt: { gte: startOfWeek } } }),
    db.lead.count({ where: { status: "NEW" } }),
    db.university.count(),
    db.program.count(),
    db.blogPost.count(),
    db.lead.findMany({ orderBy: { createdAt: "desc" }, take: 8 }),
  ]);

  return {
    totalLeads,
    leadsToday,
    leadsThisWeek,
    newLeads,
    universityCount,
    programCount,
    blogCount,
    recentLeads,
  };
}

const statusStyles: Record<string, string> = {
  NEW: "bg-gold-500/10 text-gold-700",
  CONTACTED: "bg-blue-500/10 text-blue-700",
  INTERESTED: "bg-purple-500/10 text-purple-700",
  APPLIED: "bg-indigo-500/10 text-indigo-700",
  ADMITTED: "bg-green-500/10 text-green-700",
  ENROLLED: "bg-green-700/10 text-green-800",
  LOST: "bg-red-500/10 text-red-700",
};

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const cards = [
    { label: "Total Leads", value: stats.totalLeads, icon: Users, href: "/admin/leads" },
    { label: "New Leads", value: stats.newLeads, icon: TrendingUp, href: "/admin/leads?status=NEW" },
    { label: "Leads Today", value: stats.leadsToday, icon: Users, href: "/admin/leads" },
    { label: "Leads This Week", value: stats.leadsThisWeek, icon: Users, href: "/admin/leads" },
    { label: "Universities", value: stats.universityCount, icon: GraduationCap, href: "/admin/universities" },
    { label: "Programs", value: stats.programCount, icon: BookOpen, href: "/admin/programs" },
    { label: "Blog Posts", value: stats.blogCount, icon: Newspaper, href: "/admin/blog" },
  ];

  return (
    <div className="p-6 lg:p-8">
      <h1 className="font-display text-2xl font-semibold text-green-950">Dashboard</h1>
      <p className="mt-1 text-sm text-green-900/55">Overview of leads and content.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-2xl border border-green-900/8 bg-white p-5 transition-colors hover:border-gold-500/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-950/5">
                <c.icon className="h-4 w-4 text-green-800" />
              </div>
            </div>
            <p className="mt-3 font-display text-2xl font-semibold text-green-950">{c.value}</p>
            <p className="mt-0.5 text-xs text-green-900/50">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-green-900/8 bg-white">
        <div className="flex items-center justify-between border-b border-green-900/8 px-6 py-4">
          <h2 className="font-display text-base font-semibold text-green-950">Recent Leads</h2>
          <Link href="/admin/leads" className="flex items-center gap-1 text-sm font-semibold text-gold-600 hover:text-gold-500">
            View all
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-green-900/8 text-xs uppercase tracking-wide text-green-900/40">
                <th className="px-6 py-3 font-semibold">Name</th>
                <th className="px-6 py-3 font-semibold">Program</th>
                <th className="px-6 py-3 font-semibold">Source</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Received</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentLeads.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-sm text-green-900/40">
                    No leads yet. They&apos;ll show up here as soon as someone fills out a form.
                  </td>
                </tr>
              )}
              {stats.recentLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-green-900/6 last:border-0">
                  <td className="px-6 py-3">
                    <Link href={`/admin/leads/${lead.id}`} className="font-medium text-green-950 hover:text-gold-600">
                      {lead.name}
                    </Link>
                    <p className="text-xs text-green-900/45">{lead.phone}</p>
                  </td>
                  <td className="px-6 py-3 text-green-900/70">{lead.program}</td>
                  <td className="px-6 py-3 text-green-900/70">{lead.source}</td>
                  <td className="px-6 py-3">
                    <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", statusStyles[lead.status])}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-green-900/50">
                    {new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
