"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, Upload } from "lucide-react";
import type { University as DbUniversity } from "@/generated/prisma/client";
import type { FeePlans } from "@/lib/data";

type Props = {
  university?: DbUniversity;
};

function parseFeePlans(raw: string | null | undefined): FeePlans | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as FeePlans;
  } catch {
    return null;
  }
}

function toFormState(u?: DbUniversity) {
  const feePlans = parseFeePlans(u?.feePlans);
  return {
    name: u?.name ?? "",
    slug: u?.slug ?? "",
    shortName: u?.shortName ?? "",
    tagline: u?.tagline ?? "",
    logo: u?.logo ?? "",
    logoWidth: u?.logoWidth ?? 0,
    logoHeight: u?.logoHeight ?? 0,
    accreditation: u ? (JSON.parse(u.accreditation) as string[]).join(", ") : "",
    naac: u?.naac ?? "",
    established: u?.established ?? new Date().getFullYear(),
    bestFor: u?.bestFor ?? "",
    feesMin: u?.feesMin ?? 0,
    feesMax: u?.feesMax ?? 0,
    emiStarts: u?.emiStarts ?? 0,
    duration: u?.duration ?? "2 Years",
    programs: u ? (JSON.parse(u.programs) as string[]).join(", ") : "",
    highlights: u ? (JSON.parse(u.highlights) as string[]).join("\n") : "",
    overview: u?.overview ?? "",
    approvals: u ? (JSON.parse(u.approvals) as string[]).join(", ") : "",
    placementSupport: u?.placementSupport ?? true,
    avgSalary: u?.avgSalary ?? "",
    rating: u?.rating ?? 4.5,
    color: u?.color ?? "#14400C",
    published: u?.published ?? true,
    semesterAmounts: feePlans?.semesterWise?.semesters.join(", ") ?? "",
    semesterTotal: feePlans?.semesterWise?.total ?? "",
    annualAmounts: feePlans?.annual?.years.join(", ") ?? "",
    annualTotal: feePlans?.annual?.total ?? "",
    onePaymentLabel: feePlans?.onePayment?.label ?? "One-Time Payment (Self Payment)",
    onePaymentTotal: feePlans?.onePayment?.total ?? "",
    emiLabel: feePlans?.noCostEmi?.label ?? "No-Cost EMI",
    emiMonthly: feePlans?.noCostEmi?.monthly ?? "",
    emiMonths: feePlans?.noCostEmi?.months ?? 24,
  };
}

function buildFeePlans(form: ReturnType<typeof toFormState>): FeePlans | null {
  const plans: FeePlans = {};

  const semesters = splitCsv(String(form.semesterAmounts)).map(Number).filter((n) => !isNaN(n));
  if (semesters.length && form.semesterTotal !== "") {
    plans.semesterWise = { semesters, total: Number(form.semesterTotal) };
  }

  const years = splitCsv(String(form.annualAmounts)).map(Number).filter((n) => !isNaN(n));
  if (years.length && form.annualTotal !== "") {
    plans.annual = { years, total: Number(form.annualTotal) };
  }

  if (form.onePaymentTotal !== "") {
    plans.onePayment = { label: form.onePaymentLabel || undefined, total: Number(form.onePaymentTotal) };
  }

  if (form.emiMonthly !== "" && form.emiMonths) {
    plans.noCostEmi = {
      label: form.emiLabel || undefined,
      monthly: Number(form.emiMonthly),
      months: Number(form.emiMonths),
    };
  }

  return Object.keys(plans).length ? plans : null;
}

export function UniversityForm({ university }: Props) {
  const router = useRouter();
  const isEdit = Boolean(university);
  const [form, setForm] = useState(toFormState(university));
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onLogoChange = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      setForm((f) => ({ ...f, logo: data.path, logoWidth: data.width, logoHeight: data.height }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
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
      logo: form.logo,
      logoWidth: Number(form.logoWidth),
      logoHeight: Number(form.logoHeight),
      accreditation: splitCsv(form.accreditation),
      naac: form.naac,
      established: Number(form.established),
      bestFor: form.bestFor,
      feesMin: Number(form.feesMin),
      feesMax: Number(form.feesMax),
      emiStarts: Number(form.emiStarts),
      feePlans: buildFeePlans(form),
      duration: form.duration,
      programs: splitCsv(form.programs),
      highlights: splitLines(form.highlights),
      overview: form.overview,
      approvals: splitCsv(form.approvals),
      placementSupport: form.placementSupport,
      avgSalary: form.avgSalary,
      rating: Number(form.rating),
      color: form.color,
      published: form.published,
    };

    try {
      const url = isEdit ? `/api/admin/universities/${university!.id}` : "/api/admin/universities";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.formErrors?.[0] ?? data.error ?? "Save failed");
      router.push("/admin/universities");
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
          <Field label="Full Name">
            <Input value={form.name} onChange={(v) => set("name", v)} required />
          </Field>
          <Field label="Slug (URL)">
            <Input value={form.slug} onChange={(v) => set("slug", v.toLowerCase())} required placeholder="nmims-online" />
          </Field>
          <Field label="Short Name">
            <Input value={form.shortName} onChange={(v) => set("shortName", v)} required />
          </Field>
          <Field label="Tagline">
            <Input value={form.tagline} onChange={(v) => set("tagline", v)} required />
          </Field>
        </Grid>
      </Section>

      <Section title="Logo">
        <div className="flex items-center gap-4">
          {form.logo && (
            <div className="flex h-16 w-24 items-center justify-center rounded-xl border border-green-900/10 bg-cream-50 p-2">
              <Image src={form.logo} alt="" width={form.logoWidth || 200} height={form.logoHeight || 80} className="max-h-12 w-auto object-contain" unoptimized />
            </div>
          )}
          <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-green-900/12 px-4 py-2.5 text-sm font-medium text-green-900/70 hover:bg-green-900/5">
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {form.logo ? "Replace logo" : "Upload logo"}
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              className="hidden"
              onChange={(e) => onLogoChange(e.target.files?.[0])}
            />
          </label>
        </div>
      </Section>

      <Section title="Accreditation">
        <Grid>
          <Field label="NAAC Grade">
            <Input value={form.naac} onChange={(v) => set("naac", v)} required placeholder="A+" />
          </Field>
          <Field label="Established (Year)">
            <Input type="number" value={form.established} onChange={(v) => set("established", Number(v))} required />
          </Field>
          <Field label="Accreditation Tags (comma separated)" full>
            <Input value={form.accreditation} onChange={(v) => set("accreditation", v)} required placeholder="UGC-Entitled, NAAC A+" />
          </Field>
          <Field label="Approvals (comma separated)" full>
            <Input value={form.approvals} onChange={(v) => set("approvals", v)} required placeholder="UGC-Entitled, Approved for Government Jobs" />
          </Field>
        </Grid>
      </Section>

      <Section title="Fees & Duration">
        <Grid>
          <Field label="Fees Min (₹)">
            <Input type="number" value={form.feesMin} onChange={(v) => set("feesMin", Number(v))} required />
          </Field>
          <Field label="Fees Max (₹)">
            <Input type="number" value={form.feesMax} onChange={(v) => set("feesMax", Number(v))} required />
          </Field>
          <Field label="EMI Starts (₹/mo)">
            <Input type="number" value={form.emiStarts} onChange={(v) => set("emiStarts", Number(v))} required />
          </Field>
          <Field label="Duration">
            <Input value={form.duration} onChange={(v) => set("duration", v)} required placeholder="2 Years" />
          </Field>
        </Grid>
      </Section>

      <Section title="Fee &amp; Payment Plans (optional)">
        <p className="mb-4 text-xs text-green-900/50">
          Leave any plan blank to hide it on the university page. Amounts in ₹.
        </p>
        <Grid>
          <Field label="Semester-wise: amounts (comma separated)">
            <Input value={form.semesterAmounts} onChange={(v) => set("semesterAmounts", v)} placeholder="56300, 56300, 56300, 56100" />
          </Field>
          <Field label="Semester-wise: total (₹)">
            <Input type="number" value={form.semesterTotal} onChange={(v) => set("semesterTotal", v === "" ? "" : Number(v))} />
          </Field>
          <Field label="Annual: amounts (comma separated)">
            <Input value={form.annualAmounts} onChange={(v) => set("annualAmounts", v)} placeholder="106850, 106850" />
          </Field>
          <Field label="Annual: total (₹)">
            <Input type="number" value={form.annualTotal} onChange={(v) => set("annualTotal", v === "" ? "" : Number(v))} />
          </Field>
          <Field label="One-Time Payment: label">
            <Input value={form.onePaymentLabel} onChange={(v) => set("onePaymentLabel", v)} />
          </Field>
          <Field label="One-Time Payment: total (₹)">
            <Input type="number" value={form.onePaymentTotal} onChange={(v) => set("onePaymentTotal", v === "" ? "" : Number(v))} />
          </Field>
          <Field label="No-Cost EMI: monthly amount (₹)">
            <Input type="number" value={form.emiMonthly} onChange={(v) => set("emiMonthly", v === "" ? "" : Number(v))} />
          </Field>
          <Field label="No-Cost EMI: number of months">
            <Input type="number" value={form.emiMonths} onChange={(v) => set("emiMonths", Number(v))} />
          </Field>
        </Grid>
      </Section>

      <Section title="Programs & Positioning">
        <Grid>
          <Field label="Best For">
            <Input value={form.bestFor} onChange={(v) => set("bestFor", v)} required placeholder="Senior Professionals" />
          </Field>
          <Field label="Average Salary">
            <Input value={form.avgSalary} onChange={(v) => set("avgSalary", v)} required placeholder="₹8-14 LPA" />
          </Field>
          <Field label="Programs Offered (comma separated)" full>
            <Input value={form.programs} onChange={(v) => set("programs", v)} required placeholder="Online MBA, Online BBA" />
          </Field>
          <Field label="Highlights (one per line)" full>
            <Textarea value={form.highlights} onChange={(v) => set("highlights", v)} rows={4} required />
          </Field>
          <Field label="Overview" full>
            <Textarea value={form.overview} onChange={(v) => set("overview", v)} rows={3} required />
          </Field>
        </Grid>
      </Section>

      <Section title="Display Settings">
        <Grid>
          <Field label="Rating (0-5)">
            <Input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(v) => set("rating", Number(v))} required />
          </Field>
          <Field label="Accent Color">
            <div className="flex items-center gap-2">
              <input type="color" value={form.color} onChange={(e) => set("color", e.target.value)} className="h-10 w-12 rounded-lg border border-green-900/12" />
              <Input value={form.color} onChange={(v) => set("color", v)} />
            </div>
          </Field>
          <Field label="Placement Support">
            <label className="flex items-center gap-2 pt-2.5 text-sm text-green-900/70">
              <input type="checkbox" checked={form.placementSupport} onChange={(e) => set("placementSupport", e.target.checked)} className="h-4 w-4 rounded border-green-900/30" />
              Included
            </label>
          </Field>
          <Field label="Published">
            <label className="flex items-center gap-2 pt-2.5 text-sm text-green-900/70">
              <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} className="h-4 w-4 rounded border-green-900/30" />
              Visible on live site
            </label>
          </Field>
        </Grid>
      </Section>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving || uploading}
          className="flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-green-950 hover:bg-gold-400 disabled:opacity-60 transition-colors"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {isEdit ? "Save Changes" : "Create University"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/universities")}
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
