"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";

export function DeleteButton({ url, label = "item" }: { url: string; label?: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-1.5">
        <button
          onClick={async () => {
            setDeleting(true);
            await fetch(url, { method: "DELETE" });
            router.refresh();
          }}
          disabled={deleting}
          className="rounded-lg bg-red-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-60"
        >
          {deleting ? <Loader2 className="h-3 w-3 animate-spin" /> : `Confirm`}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="rounded-lg px-2.5 py-1 text-xs font-medium text-green-900/50 hover:bg-green-900/5"
        >
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      aria-label={`Delete ${label}`}
      className="rounded-lg p-1.5 text-green-900/40 hover:bg-red-50 hover:text-red-600 transition-colors"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
