"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, Phone, ArrowUp, Sparkles, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function FloatingCTAs() {
  const [showTop, setShowTop] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        {showTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-green-950 text-white shadow-lg hover:bg-green-800 transition-colors"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        )}

        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] hover:scale-105 transition-transform"
        >
          <MessageCircle className="h-6 w-6" />
        </a>

        <a
          href={`tel:${siteConfig.phoneE164}`}
          aria-label="Call an expert"
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-green-950 text-white shadow-[0_10px_30px_-8px_rgba(14,43,8,0.5)] hover:scale-105 transition-transform"
        >
          <Phone className="h-5 w-5" />
        </a>

        <button
          onClick={() => setAiOpen(true)}
          aria-label="Ask Career AI"
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gold-500 text-green-950 shadow-[0_10px_30px_-8px_rgba(232,185,35,0.7)] hover:scale-105 transition-transform"
        >
          <Sparkles className="h-5 w-5" />
        </button>
      </div>

      {aiOpen && (
        <div className="fixed bottom-24 right-5 z-50 w-[calc(100vw-2.5rem)] max-w-sm rounded-2xl border border-green-900/10 bg-white shadow-[0_30px_70px_-20px_rgba(14,43,8,0.35)] overflow-hidden">
          <div className="flex items-center justify-between bg-green-950 px-5 py-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-gold-400" />
              <span className="font-display text-sm font-semibold text-white">Ask Career AI</span>
            </div>
            <button onClick={() => setAiOpen(false)} aria-label="Close" className="text-white/60 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-5">
            <p className="text-sm text-green-900/60 mb-4">
              Get instant answers, then talk to a career strategist.
            </p>
            <div className="flex flex-col gap-2">
              {[
                "Which MBA is best for me?",
                "Is Online MBA worth it?",
                "Which university should I choose?",
              ].map((q) => (
                <button
                  key={q}
                  className="rounded-xl border border-green-900/10 px-4 py-3 text-left text-sm text-green-900/75 hover:border-gold-500/40 hover:bg-gold-500/5 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
            <Link
              href="/contact"
              className="mt-4 flex w-full items-center justify-center rounded-full bg-gold-500 px-5 py-3 text-sm font-semibold text-green-950 hover:bg-gold-400 transition-colors"
            >
              Talk to a Career Strategist
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
