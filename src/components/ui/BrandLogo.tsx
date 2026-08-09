import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export function BrandLogo({
  light = false,
  className,
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/brand/grad-scholar-mark.png"
        alt=""
        width={574}
        height={522}
        className="h-9 w-9 object-contain"
        priority
      />
      <span
        className={cn(
          "font-display text-lg font-semibold leading-tight tracking-tight",
          light ? "text-white" : "text-green-950"
        )}
      >
        {siteConfig.name}
      </span>
    </span>
  );
}
