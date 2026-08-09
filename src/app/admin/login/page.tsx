"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Loader2, Lock } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Login failed");
        setLoading(false);
        return;
      }
      router.push(searchParams.get("next") ?? "/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-950 px-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center">
          <Image
            src="/brand/grad-scholar-mark.png"
            alt=""
            width={574}
            height={522}
            className="h-14 w-14 object-contain"
          />
          <h1 className="mt-4 font-display text-xl font-semibold text-white">
            {siteConfig.name} Admin
          </h1>
          <p className="mt-1 text-sm text-white/50">Sign in to manage the site</p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-white/70">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              placeholder="admin@gradscholars.in"
            />
          </label>
          <label className="mt-4 block">
            <span className="mb-1.5 block text-sm font-medium text-white/70">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              placeholder="••••••••"
            />
          </label>

          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-5 py-3 text-sm font-semibold text-green-950 hover:bg-gold-400 disabled:opacity-70 transition-colors"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Sign In
          </button>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] text-white/30">
            <Lock className="h-3 w-3" />
            Restricted access — authorized staff only
          </p>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
