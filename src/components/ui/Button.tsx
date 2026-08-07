import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold-500 text-green-950 hover:bg-gold-400 shadow-[0_8px_24px_-8px_rgba(232,185,35,0.6)]",
  secondary: "bg-green-900 text-white hover:bg-green-800",
  outline:
    "border border-green-900/15 text-green-900 hover:border-green-900/40 bg-white/60",
  ghost: "text-green-900 hover:bg-green-900/5",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-sm px-6 py-3.5",
  lg: "text-base px-8 py-4",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-200 whitespace-nowrap active:scale-[0.98]";

export function Button({
  variant = "primary",
  size = "md",
  className,
  href,
  children,
  ...props
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
  href?: string;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
