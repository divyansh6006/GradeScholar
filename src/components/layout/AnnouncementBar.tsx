import { GraduationCap } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="bg-green-950 text-white/80">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-6 py-2 text-center text-xs sm:text-[13px] font-medium tracking-wide">
        <GraduationCap className="hidden sm:block h-3.5 w-3.5 text-gold-400" />
        <span>
          Scholarships up to ₹40,000 close soon for the 2026 intake —{" "}
          <span className="text-gold-400">book a free career consultation</span>
        </span>
      </div>
    </div>
  );
}
