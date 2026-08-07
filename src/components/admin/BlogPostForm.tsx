"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import type { BlogPost as DbBlogPost } from "@/generated/prisma/client";

type Props = {
  post?: DbBlogPost;
};

function toFormState(p?: DbBlogPost) {
  return {
    title: p?.title ?? "",
    slug: p?.slug ?? "",
    category: p?.category ?? "",
    excerpt: p?.excerpt ?? "",
    content: p ? (JSON.parse(p.content) as string[]).join("\n\n") : "",
    readTime: p?.readTime ?? "5 min read",
    date: p ? new Date(p.date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
    published: p?.published ?? true,
  };
}

export function BlogPostForm({ post }: Props) {
  const router = useRouter();
  const isEdit = Boolean(post);
  const [form, setForm] = useState(toFormState(post));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      title: form.title,
      slug: form.slug,
      category: form.category,
      excerpt: form.excerpt,
      content: form.content.split("\n\n").map((p) => p.trim()).filter(Boolean),
      readTime: form.readTime,
      date: form.date,
      published: form.published,
    };

    try {
      const url = isEdit ? `/api/admin/blog/${post!.id}` : "/api/admin/blog";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.formErrors?.[0] ?? data.error ?? "Save failed");
      router.push("/admin/blog");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <Section title="Post Details">
        <Grid>
          <Field label="Title" full>
            <Input value={form.title} onChange={(v) => set("title", v)} required />
          </Field>
          <Field label="Slug (URL)">
            <Input value={form.slug} onChange={(v) => set("slug", v.toLowerCase())} required placeholder="2026-online-mba-salary-report" />
          </Field>
          <Field label="Category">
            <Input value={form.category} onChange={(v) => set("category", v)} required placeholder="Salary" />
          </Field>
          <Field label="Publish Date">
            <Input type="date" value={form.date} onChange={(v) => set("date", v)} required />
          </Field>
          <Field label="Read Time">
            <Input value={form.readTime} onChange={(v) => set("readTime", v)} required placeholder="6 min read" />
          </Field>
          <Field label="Excerpt" full>
            <Textarea value={form.excerpt} onChange={(v) => set("excerpt", v)} rows={2} required />
          </Field>
          <Field label="Content (paragraphs separated by a blank line)" full>
            <Textarea value={form.content} onChange={(v) => set("content", v)} rows={10} required />
          </Field>
        </Grid>
      </Section>

      <Section title="Display Settings">
        <label className="flex items-center gap-2 text-sm text-green-900/70">
          <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} className="h-4 w-4 rounded border-green-900/30" />
          Published — visible on live site
        </label>
      </Section>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-green-950 hover:bg-gold-400 disabled:opacity-60 transition-colors"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {isEdit ? "Save Changes" : "Publish Post"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/blog")}
          className="rounded-full border border-green-900/12 px-6 py-3 text-sm font-semibold text-green-900/70 hover:bg-green-900/5 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-green-900/8 bg-white p-6">
      <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-green-900/50">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={full ? "sm:col-span-2 block" : "block"}>
      <span className="mb-1.5 block text-sm font-medium text-green-900/70">{label}</span>
      {children}
    </label>
  );
}

function Input({
  value,
  onChange,
  type = "text",
  ...rest
}: {
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  return (
    <input
      {...rest}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-green-900/12 bg-white px-4 py-2.5 text-sm text-green-950 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
    />
  );
}

function Textarea({
  value,
  onChange,
  rows = 3,
  ...rest
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange">) {
  return (
    <textarea
      {...rest}
      value={value}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-green-900/12 bg-white px-4 py-2.5 text-sm text-green-950 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
    />
  );
}
