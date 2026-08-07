"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";
import type { University, Program } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Header({
  universities,
  programs,
}: {
  universities: University[];
  programs: Program[];
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    {
      label: "Universities",
      items: universities.map((u) => ({ label: u.shortName, href: `/universities/${u.slug}` })),
      viewAll: { label: "View all universities", href: "/universities" },
    },
    {
      label: "Programs",
      items: programs.map((p) => ({ label: p.name, href: `/programs/${p.slug}` })),
      viewAll: { label: "View all programs", href: "/programs" },
    },
    {
      label: "Resources",
      items: [
        { label: "Compare Universities", href: "/compare-universities" },
        { label: "Career Assessment", href: "/career-assessment" },
        { label: "Scholarships", href: "/scholarships" },
        { label: "Success Stories", href: "/success-stories" },
        { label: "Blog", href: "/blog" },
      ],
    },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-lg shadow-[0_1px_0_0_rgba(10,22,40,0.06)]"
          : "bg-white/70 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 py-4">
        <Link href="/" className="shrink-0">
          <BrandLogo />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenMenu(item.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button className="flex items-center gap-1 rounded-full px-4 py-2 text-[15px] font-medium text-green-900/80 hover:text-green-950 hover:bg-green-900/5 transition-colors">
                {item.label}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {openMenu === item.label && (
                <div className="absolute left-0 top-full pt-2 w-72">
                  <div className="rounded-2xl border border-green-900/8 bg-white shadow-[0_20px_50px_-12px_rgba(14,43,8,0.18)] p-2 max-h-[70vh] overflow-y-auto">
                    {item.items.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block rounded-xl px-4 py-2.5 text-sm text-green-900/75 hover:bg-green-900/5 hover:text-green-950 transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                    {"viewAll" in item && item.viewAll && (
                      <>
                        <div className="my-1 h-px bg-green-900/8" />
                        <Link
                          href={item.viewAll.href}
                          className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-gold-600 hover:bg-gold-500/5"
                        >
                          {item.viewAll.label} →
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link
            href="/about"
            className="rounded-full px-4 py-2 text-[15px] font-medium text-green-900/80 hover:text-green-950 hover:bg-green-900/5 transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="rounded-full px-4 py-2 text-[15px] font-medium text-green-900/80 hover:text-green-950 hover:bg-green-900/5 transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" size="md">
            Book Free Consultation
          </Button>
        </div>

        <button
          className="lg:hidden p-2 text-green-950"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-green-900/8 bg-white px-6 py-4 max-h-[calc(100vh-73px)] overflow-y-auto">
          {nav.map((item) => (
            <div key={item.label} className="py-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-green-900/40 mb-2">
                {item.label}
              </p>
              <div className="flex flex-col gap-1">
                {item.items.slice(0, 6).map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-2 py-2 text-sm text-green-900/75 hover:bg-green-900/5"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-1 py-2 border-t border-green-900/8 mt-2">
            <Link href="/about" className="rounded-lg px-2 py-2 text-sm text-green-900/75">
              About
            </Link>
            <Link href="/contact" className="rounded-lg px-2 py-2 text-sm text-green-900/75">
              Contact
            </Link>
          </div>
          <Button href="/contact" className="w-full mt-3">
            Book Free Consultation
          </Button>
        </div>
      )}
    </header>
  );
}
