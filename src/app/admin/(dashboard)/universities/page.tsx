import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { Plus, Pencil } from "lucide-react";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminUniversitiesPage() {
  const universities = await db.university.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-green-950">Universities</h1>
          <p className="mt-1 text-sm text-green-900/55">{universities.length} partner{universities.length === 1 ? "" : "s"}</p>
        </div>
        <Link
          href="/admin/universities/new"
          className="flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-green-950 hover:bg-gold-400 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add University
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-green-900/8 bg-white">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-green-900/8 text-xs uppercase tracking-wide text-green-900/40">
              <th className="px-6 py-3 font-semibold">University</th>
              <th className="px-6 py-3 font-semibold">NAAC</th>
              <th className="px-6 py-3 font-semibold">Fees</th>
              <th className="px-6 py-3 font-semibold">Rating</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {universities.map((u, i) => (
              <tr key={u.id} className={cn("border-b border-green-900/6 last:border-0", i % 2 === 1 && "bg-cream-50/50")}>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-14 shrink-0 items-center justify-center rounded-lg border border-green-900/8 bg-cream-50 p-1">
                      <Image src={u.logo} alt="" width={u.logoWidth} height={u.logoHeight} className="max-h-7 w-auto object-contain" unoptimized />
                    </div>
                    <div>
                      <p className="font-medium text-green-950">{u.shortName}</p>
                      <p className="text-xs text-green-900/45">/{u.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3 text-green-900/70">{u.naac}</td>
                <td className="px-6 py-3 text-green-900/70">
                  ₹{(u.feesMin / 100000).toFixed(1)}L – ₹{(u.feesMax / 100000).toFixed(1)}L
                </td>
                <td className="px-6 py-3 text-green-900/70">{u.rating} / 5</td>
                <td className="px-6 py-3">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                      u.published ? "bg-green-500/10 text-green-700" : "bg-green-900/8 text-green-900/50"
                    )}
                  >
                    {u.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/universities/${u.id}/edit`}
                      className="rounded-lg p-1.5 text-green-900/40 hover:bg-green-900/5 hover:text-green-950 transition-colors"
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteButton url={`/api/admin/universities/${u.id}`} label={u.shortName} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
