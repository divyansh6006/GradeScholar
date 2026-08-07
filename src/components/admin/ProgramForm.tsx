"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import type { Program as DbProgram, University as DbUniversity } from "@/generated/prisma/client";

type Props = {
  program?: DbProgram;
};

function toFormState(p?: DbProgram) {
  return {
    name: p?.name ?? "",
    slug: p?.slug ?? "",
    shortName: p?.shortName ?? "",
    tagline: p?.tagline ?? "",
    duration: p?.duration ?? "2 Years",
    eligibility: p?.eligibility ?? "",
    specializations: p ? (JSON.parse(p.specializations) as string[]).join(", ") : "",
    bestFor: p ? (JSON.parse(p.bestFor) as string[]).join(", ") : "",
    outcomes: p ? (JSON.parse(p.outcomes) as string[]).join("\n") : "",
    universities: p ? (JSON.parse(p.universities) as string[]) : ([] as string[]),
    published: p?.published ?? true,
  };
}

export function ProgramForm({ program }: Props) {
  const router = useRouter();
  const isEdit = Boolean(program);
  const [form, setForm] = useState(toFormState(program));
  const [allUniversities, setAllUniversities] = useState<DbUniversity[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/universities")
      .then((res) => res.json())
      .then(setAllUniversities);
  }, []);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleUniversity = (slug: string) => {
    setForm((f) => ({
      ...f,
      universities: f.universities.includes(slug)
        ? f.universities.filter((s) => s !== slug)
        : [...f.universities, slug],
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      name: form.name,
      slug: form.slug,
      shortName: form.shortName,
      tagline: form.tagline,
      duration: form.duration,
      eligibility: form.eligibility,
      specializations: splitCsv(form.specializations),
      bestFor: splitCsv(form.bestFor),
      outcomes: splitLines(form.outcomes),
      universities: form.universities,
      published: form.published,
    };

    try {
      const url = isEdit ? `/api/admin/programs/${program!.id}` : "/api/admin/programs";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.formErrors?.[0] ?? data.error ?? "Save failed");
      router.push("/admin/programs");
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

      <Section title="Identity">
        <Grid>
          <Field label="Program Name">
            <Input value={form.name} onChange={(v) => set("name", v)} required placeholder="Online MBA" />
          </Field>
          <Field label="Slug (URL)">
            <Input value={form.slug} onChange={(v) => set("slug", v.toLowerCase())} required placeholder="online-mba" />
          </Field>
          <Field label="Short Name">
            <Input value={form.shortName} onChange={(v) => set("shortName", v)} required placeholder="MBA" />
          </Field>
          <Field label="Duration">
            <Input value={form.duration} onChange={(v) => set("duration", v)} required placeholder="2 Years" />
          </Field>
          <Field label="Tagline" full>
            <Input value={form.tagline} onChange={(v) => set("tagline", v)} required />
          </Field>
          <Field label="Eligibility" full>
            <Input value={form.eligibility} onChange={(v) => set("eligibility", v)} required placeholder="Graduation in any discipline (min 50%)" />
          </Field>
        </Grid>
      </Section>

      <Section title="Details">
        <Grid>
          <Field label="Specializations (comma separated)" full>
            <Input value={form.specializations} onChange={(v) => set("specializations", v)} required placeholder="Finance, Marketing, HR" />
          </Field>
          <Field label="Best For (comma separated)" full>
            <Input value={form.bestFor} onChange={(v) => set("bestFor", v)} required placeholder="Working Professionals, IT Professionals" />
          </Field>
          <Field label="Career Outcomes (one per line)" full>
            <Textarea value={form.outcomes} onChange={(v) => set("outcomes", v)} rows={3} required />
          </Field>
        </Grid>
      </Section>

      <Section title="Offered By">
        <div className="flex flex-wrap gap-2">
          {allUniversities.map((u) => (
            <label
              key={u.slug}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-green-900/12 px-3.5 py-2 text-sm has-[:checked]:border-gold-500 has-[:checked]:bg-gold-500/8"
            >
              <input
                type="checkbox"
                checked={form.universities.includes(u.slug)}
                onChange={() => toggleUniversity(u.slug)}
                className="h-3.5 w-3.5 rounded border-green-900/30"
              />
              {u.shortName}
            </label>
          ))}
        </div>
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
          {isEdit ? "Save Changes" : "Create Program"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/programs")}
          className="rounded-full border border-green-900/12 px-6 py-3 text-sm font-semibold text-green-900/70 hover:bg-green-900/5 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function splitCsv(value: string) {
  return value.split(",").map((v) => v.trim()).filter(Boolean);
}
function splitLines(value: string) {
  return value.split("\n").map((v) => v.trim()).filter(Boolean);
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
