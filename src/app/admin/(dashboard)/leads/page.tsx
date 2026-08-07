import Link from "next/link";
import { db } from "@/lib/db";
import type { Prisma, LeadStatus } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 20;

const statusStyles: Record<string, string> = {
  NEW: "bg-gold-500/10 text-gold-700",
  CONTACTED: "bg-blue-500/10 text-blue-700",
  INTERESTED: "bg-purple-500/10 text-purple-700",
  APPLIED: "bg-indigo-500/10 text-indigo-700",
  ADMITTED: "bg-green-500/10 text-green-700",
  ENROLLED: "bg-green-700/10 text-green-800",
  LOST: "bg-red-500/10 text-red-700",
};

const statuses = ["NEW", "CONTACTED", "INTERESTED", "APPLIED", "ADMITTED", "ENROLLED", "LOST"];

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const status = params.status ?? "";
  const page = Math.max(1, Number(params.page) || 1);

  const where: Prisma.LeadWhereInput = {
    ...(status ? { status: status as LeadStatus } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q } },
            { phone: { contains: q } },
            { email: { contains: q } },
          ],
        }
      : {}),
  };

  const [leads, total] = await Promise.all([
    db.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    db.lead.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const buildHref = (overrides: Record<string, string | number>) => {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (status) sp.set("status", status);
    if (page > 1) sp.set("page", String(page));
    for (const [k, v] of Object.entries(overrides)) {
      if (v === "" || v === 1) sp.delete(k);
      else sp.set(k, String(v));
    }
    const qs = sp.toString();
    return qs ? `/admin/leads?${qs}` : "/admin/leads";
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-green-950">Leads</h1>
          <p className="mt-1 text-sm text-green-900/55">{total} total lead{total === 1 ? "" : "s"}</p>
        </div>
      </div>

      <form method="get" className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-green-900/35" />
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search name, phone or email…"
            className="w-full rounded-xl border border-green-900/12 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
          />
        </div>
        <select
          name="status"
          defaultValue={status}
          className="rounded-xl border border-green-900/12 bg-white px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
        >
          <option value="">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-xl bg-green-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-800 transition-colors"
        >
          Filter
        </button>
        {(q || status) && (
          <Link href="/admin/leads" className="text-sm font-medium text-green-900/50 hover:text-green-900">
            Clear
          </Link>
        )}
      </form>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-green-900/8 bg-white">
        <table className="w-full min-w-[820px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-green-900/8 text-xs uppercase tracking-wide text-green-900/40">
              <th className="px-6 py-3 font-semibold">Name</th>
              <th className="px-6 py-3 font-semibold">Contact</th>
              <th className="px-6 py-3 font-semibold">Program</th>
              <th className="px-6 py-3 font-semibold">University</th>
              <th className="px-6 py-3 font-semibold">Source</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold">Received</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-sm text-green-900/40">
                  No leads match these filters.
                </td>
              </tr>
            )}
            {leads.map((lead, i) => (
              <tr
                key={lead.id}
                className={cn("border-b border-green-900/6 last:border-0", i % 2 === 1 && "bg-cream-50/50")}
              >
                <td className="px-6 py-3">
                  <Link href={`/admin/leads/${lead.id}`} className="font-medium text-green-950 hover:text-gold-600">
                    {lead.name}
                  </Link>
                </td>
                <td className="px-6 py-3 text-green-900/65">
                  <p>{lead.phone}</p>
                  <p className="text-xs text-green-900/45">{lead.email}</p>
                </td>
                <td className="px-6 py-3 text-green-900/70">{lead.program}</td>
                <td className="px-6 py-3 text-green-900/70">{lead.university || "—"}</td>
                <td className="px-6 py-3 text-green-900/70">{lead.source}</td>
                <td className="px-6 py-3">
                  <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", statusStyles[lead.status])}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-green-900/50">
                  {new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm text-green-900/60">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <Link
              href={buildHref({ page: Math.max(1, page - 1) })}
              className={cn(
                "flex items-center gap-1 rounded-lg border border-green-900/12 px-3 py-1.5 font-medium",
                page <= 1 ? "pointer-events-none opacity-40" : "hover:bg-green-900/5"
              )}
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Prev
            </Link>
            <Link
              href={buildHref({ page: Math.min(totalPages, page + 1) })}
              className={cn(
                "flex items-center gap-1 rounded-lg border border-green-900/12 px-3 py-1.5 font-medium",
                page >= totalPages ? "pointer-events-none opacity-40" : "hover:bg-green-900/5"
              )}
            >
              Next
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
