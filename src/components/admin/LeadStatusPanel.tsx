"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const pipeline = ["NEW", "CONTACTED", "INTERESTED", "APPLIED", "ADMITTED", "ENROLLED"];
const lost = "LOST";

export function LeadStatusPanel({
  leadId,
  initialStatus,
}: {
  leadId: string;
  initialStatus: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [saving, setSaving] = useState(false);

  const updateStatus = async (next: string) => {
    setSaving(true);
    setStatus(next);
    try {
      await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  const currentIndex = pipeline.indexOf(status);

  return (
    <div className="rounded-2xl border border-green-900/8 bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-base font-semibold text-green-950">Pipeline Status</h2>
        {saving && <Loader2 className="h-4 w-4 animate-spin text-green-900/40" />}
      </div>

      <div className="mt-4 space-y-1.5">
        {pipeline.map((s, i) => {
          const reached = status !== lost && i <= currentIndex;
          return (
            <button
              key={s}
              onClick={() => updateStatus(s)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors",
                status === s
                  ? "bg-green-950 text-white"
                  : reached
                    ? "bg-gold-500/10 text-green-950 hover:bg-gold-500/20"
                    : "text-green-900/55 hover:bg-green-900/5"
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px]",
                  reached ? "border-gold-500 bg-gold-500 text-green-950" : "border-green-900/20"
                )}
              >
                {reached && <Check className="h-3 w-3" />}
              </span>
              {s}
            </button>
          );
        })}

        <div className="my-2 h-px bg-green-900/8" />

        <button
          onClick={() => updateStatus(lost)}
          className={cn(
            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors",
            status === lost ? "bg-red-600 text-white" : "text-red-600/70 hover:bg-red-50"
          )}
        >
          Mark as Lost
        </button>
      </div>
    </div>
  );
}
