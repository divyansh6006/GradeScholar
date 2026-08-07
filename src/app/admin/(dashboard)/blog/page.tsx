import Link from "next/link";
import { db } from "@/lib/db";
import { Plus, Pencil } from "lucide-react";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await db.blogPost.findMany({ orderBy: { date: "desc" } });

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-green-950">Blog</h1>
          <p className="mt-1 text-sm text-green-900/55">{posts.length} post{posts.length === 1 ? "" : "s"}</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-green-950 hover:bg-gold-400 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-green-900/8 bg-white">
        <table className="w-full min-w-[700px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-green-900/8 text-xs uppercase tracking-wide text-green-900/40">
              <th className="px-6 py-3 font-semibold">Title</th>
              <th className="px-6 py-3 font-semibold">Category</th>
              <th className="px-6 py-3 font-semibold">Date</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p, i) => (
              <tr key={p.id} className={cn("border-b border-green-900/6 last:border-0", i % 2 === 1 && "bg-cream-50/50")}>
                <td className="px-6 py-3">
                  <p className="font-medium text-green-950">{p.title}</p>
                  <p className="text-xs text-green-900/45">/{p.slug}</p>
                </td>
                <td className="px-6 py-3 text-green-900/70">{p.category}</td>
                <td className="px-6 py-3 text-green-900/70">
                  {new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </td>
                <td className="px-6 py-3">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                      p.published ? "bg-green-500/10 text-green-700" : "bg-green-900/8 text-green-900/50"
                    )}
                  >
                    {p.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/blog/${p.id}/edit`}
                      className="rounded-lg p-1.5 text-green-900/40 hover:bg-green-900/5 hover:text-green-950 transition-colors"
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteButton url={`/api/admin/blog/${p.id}`} label={p.title} />
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
