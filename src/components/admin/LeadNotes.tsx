"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, StickyNote } from "lucide-react";

type Note = { id: string; body: string; createdAt: Date | string };

export function LeadNotes({ leadId, initialNotes }: { leadId: string; initialNotes: Note[] }) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);

  const addNote = async () => {
    if (!body.trim()) return;
    setSaving(true);
    try {
      await fetch(`/api/admin/leads/${leadId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body }),
      });
      setBody("");
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border border-green-900/8 bg-white p-6">
      <h2 className="font-display text-base font-semibold text-green-950">Notes & Timeline</h2>

      <div className="mt-4 flex gap-2">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Log a call, a follow-up plan, anything the next person should know…"
          rows={2}
          className="flex-1 resize-none rounded-xl border border-green-900/12 bg-white px-4 py-3 text-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
        />
        <button
          onClick={addNote}
          disabled={saving || !body.trim()}
          className="flex items-center gap-1.5 self-end rounded-xl bg-green-950 px-4 py-3 text-sm font-semibold text-white hover:bg-green-800 disabled:opacity-50 transition-colors"
        >
          {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          Add
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {initialNotes.length === 0 && (
          <p className="text-sm text-green-900/40">No notes yet. Add the first one above.</p>
        )}
        {initialNotes.map((note) => (
          <div key={note.id} className="flex gap-3 border-l-2 border-gold-500/30 pl-4">
            <StickyNote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-600" />
            <div>
              <p className="text-sm text-green-900/75">{note.body}</p>
              <p className="mt-1 text-xs text-green-900/40">
                {new Date(note.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
