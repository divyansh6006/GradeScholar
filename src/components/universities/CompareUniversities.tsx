"use client";

import { useState } from "react";
import { useUniversities } from "@/hooks/usePublicData";
import { ComparisonTable } from "@/components/universities/ComparisonTable";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";

export function CompareUniversities() {
  const universities = useUniversities();
  const [selected, setSelected] = useState<string[] | null>(null);
  const [slugA, setSlugA] = useState<string | null>(null);
  const [slugB, setSlugB] = useState<string | null>(null);

  const effectiveSelected = selected ?? universities.map((u) => u.slug);

  const toggle = (slug: string) => {
    setSelected(
      effectiveSelected.includes(slug)
        ? effectiveSelected.filter((x) => x !== slug)
        : [...effectiveSelected, slug]
    );
  };

  const filtered = universities.filter((u) => effectiveSelected.includes(u.slug));
  const uniA = universities.find((u) => u.slug === (slugA ?? universities[0]?.slug));
  const uniB = universities.find((u) => u.slug === (slugB ?? universities[1]?.slug ?? universities[0]?.slug));

  if (!uniA || !uniB) {
    return <p className="text-sm text-green-900/50">Loading universities…</p>;
  }

  return (
    <div className="space-y-16">
      <div>
        <div className="flex flex-wrap gap-2">
          {universities.map((u) => (
            <button
              key={u.slug}
              onClick={() => toggle(u.slug)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                effectiveSelected.includes(u.slug)
                  ? "border-gold-500 bg-gold-500/10 text-green-950"
                  : "border-green-900/12 text-green-900/50 hover:border-green-900/25"
              )}
            >
              {u.shortName}
            </button>
          ))}
        </div>
        <div className="mt-6">
          {filtered.length > 0 ? (
            <ComparisonTable items={filtered} />
          ) : (
            <p className="text-sm text-green-900/50">Select at least one university to compare.</p>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-display text-xl font-semibold text-green-950">
          Head-to-Head Comparison
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 max-w-xl">
          <select
            value={uniA.slug}
            onChange={(e) => setSlugA(e.target.value)}
            className="rounded-xl border border-green-900/12 bg-white px-4 py-3 text-sm font-medium"
          >
            {universities.map((u) => (
              <option key={u.slug} value={u.slug}>
                {u.shortName}
              </option>
            ))}
          </select>
          <select
            value={uniB.slug}
            onChange={(e) => setSlugB(e.target.value)}
            className="rounded-xl border border-green-900/12 bg-white px-4 py-3 text-sm font-medium"
          >
            {universities.map((u) => (
              <option key={u.slug} value={u.slug}>
                {u.shortName}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-green-900/8">
          <table className="w-full min-w-[600px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-green-950 text-white">
                <th className="px-5 py-4 font-semibold w-1/3">Criteria</th>
                <th className="px-5 py-4 font-semibold">{uniA.shortName}</th>
                <th className="px-5 py-4 font-semibold">{uniB.shortName}</th>
              </tr>
            </thead>
            <tbody>
              <CompareRow label="Fees" a={`₹${(uniA.fees.min / 100000).toFixed(1)}L - ₹${(uniA.fees.max / 100000).toFixed(1)}L`} b={`₹${(uniB.fees.min / 100000).toFixed(1)}L - ₹${(uniB.fees.max / 100000).toFixed(1)}L`} />
              <CompareRow label="Duration" a={uniA.duration} b={uniB.duration} />
              <CompareRow label="NAAC Grade" a={uniA.naac} b={uniB.naac} />
              <CompareRow label="EMI Starts" a={`₹${uniA.emiStarts.toLocaleString("en-IN")}/mo`} b={`₹${uniB.emiStarts.toLocaleString("en-IN")}/mo`} />
              <CompareRow label="Best For" a={uniA.bestFor} b={uniB.bestFor} />
              <CompareRow label="Average Salary" a={uniA.avgSalary} b={uniB.avgSalary} />
              <CompareRow label="Google Rating" a={`${uniA.rating} / 5`} b={`${uniB.rating} / 5`} />
              <tr className="border-t border-green-900/6">
                <td className="px-5 py-4 font-medium text-green-900/70">Placement Support</td>
                <td className="px-5 py-4">
                  <BoolCell value={uniA.placementSupport} />
                </td>
                <td className="px-5 py-4">
                  <BoolCell value={uniB.placementSupport} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CompareRow({ label, a, b }: { label: string; a: string; b: string }) {
  return (
    <tr className="border-t border-green-900/6">
      <td className="px-5 py-4 font-medium text-green-900/70">{label}</td>
      <td className="px-5 py-4 font-semibold text-green-950">{a}</td>
      <td className="px-5 py-4 font-semibold text-green-950">{b}</td>
    </tr>
  );
}

function BoolCell({ value }: { value: boolean }) {
  return value ? (
    <CheckCircle2 className="h-5 w-5 text-green-600" />
  ) : (
    <XCircle className="h-5 w-5 text-green-900/25" />
  );
}
