"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Newspaper,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Universities", href: "/admin/universities", icon: GraduationCap },
  { label: "Programs", href: "/admin/programs", icon: BookOpen },
  { label: "Blog", href: "/admin/blog", icon: Newspaper },
];

export function AdminSidebar({ name, email }: { name: string; email: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-green-900/8 bg-white">
      <div className="flex items-center gap-2.5 border-b border-green-900/8 px-6 py-5">
        <Image
          src="/brand/grad-scholar-mark.png"
          alt=""
          width={683}
          height={600}
          className="h-8 w-8 object-contain"
        />
        <div>
          <p className="font-display text-sm font-semibold text-green-950">Grad Scholar</p>
          <p className="text-[11px] text-green-900/45">Admin Panel</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-green-950 text-white"
                  : "text-green-900/65 hover:bg-green-900/5 hover:text-green-950"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-green-900/8 p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-green-900/65 hover:bg-green-900/5 hover:text-green-950 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          View Live Site
        </Link>
        <div className="mt-2 flex items-center gap-3 px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/15 text-xs font-semibold text-gold-700">
            {name.slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-green-950">{name}</p>
            <p className="truncate text-[11px] text-green-900/45">{email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600/80 hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
