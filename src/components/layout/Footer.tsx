import Link from "next/link";
import { Mail, Phone, MapPin, ShieldCheck, Lock, BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BrandLogo } from "@/components/ui/BrandLogo";
import type { University, Program } from "@/lib/data";
import { SocialIcon, type SocialPlatform } from "@/components/ui/SocialIcon";
import { siteConfig } from "@/lib/site-config";

const socialPlatforms: SocialPlatform[] = ["linkedin", "instagram", "facebook", "youtube"];

const resourceLinks = [
  { label: "Compare Universities", href: "/compare-universities" },
  { label: "Career Assessment", href: "/career-assessment" },
  { label: "Scholarships", href: "/scholarships" },
  { label: "Education Loan", href: "/education-loan" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Blog", href: "/blog" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Experts", href: "/about#experts" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
  { label: "FAQs", href: "/faq" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Refund Policy", href: "/refund-policy" },
];

export default function Footer({
  universities,
  programs,
}: {
  universities: University[];
  programs: Program[];
}) {
  return (
    <footer className="bg-green-950 text-white/70">
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-6">
          <div className="col-span-2">
            <Link href="/">
              <BrandLogo light />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/50 max-w-xs">
              India&apos;s Career Advancement &amp; Higher Education Consultancy — helping
              professionals choose the right online degree from India&apos;s leading universities.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialPlatforms.map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 hover:border-gold-400/40 hover:text-gold-400 transition-colors"
                  aria-label={platform}
                >
                  <SocialIcon platform={platform} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
              Universities
            </h4>
            <ul className="space-y-2.5">
              {universities.map((u) => (
                <li key={u.slug}>
                  <Link
                    href={`/universities/${u.slug}`}
                    className="text-sm text-white/60 hover:text-gold-400 transition-colors"
                  >
                    {u.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
              Programs
            </h4>
            <ul className="space-y-2.5">
              {programs.slice(0, 6).map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/programs/${p.slug}`}
                    className="text-sm text-white/60 hover:text-gold-400 transition-colors"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {resourceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-gold-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-gold-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-10">
          <span className="flex items-center gap-2 text-xs font-medium text-white/50">
            <ShieldCheck className="h-4 w-4 text-gold-400" />
            UGC-Verified Partner Universities
          </span>
          <span className="flex items-center gap-2 text-xs font-medium text-white/50">
            <Lock className="h-4 w-4 text-gold-400" />
            Confidential &amp; Secure Data Handling
          </span>
          <span className="flex items-center gap-2 text-xs font-medium text-white/50">
            <BadgeCheck className="h-4 w-4 text-gold-400" />
            100% Free Career Counselling
          </span>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-3 border-t border-white/10 pt-8">
          <a href={`tel:${siteConfig.phoneE164}`} className="flex items-center gap-3 hover:text-gold-400 transition-colors">
            <Phone className="h-4 w-4 text-gold-400 shrink-0" />
            <span className="text-sm text-white/60">{siteConfig.phoneDisplay}</span>
          </a>
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-gold-400 shrink-0" />
            <div className="flex flex-col">
              <a href={`mailto:${siteConfig.emailPrimary}`} className="text-sm text-white/60 hover:text-gold-400 transition-colors">
                {siteConfig.emailPrimary}
              </a>
              <a href={`mailto:${siteConfig.emailSecondary}`} className="text-sm text-white/60 hover:text-gold-400 transition-colors">
                {siteConfig.emailSecondary}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-gold-400 shrink-0" />
            <span className="text-sm text-white/60">Gurugram, Haryana, India</span>
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-xs text-white/40 hover:text-white/70">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-6 text-[11px] leading-relaxed text-white/30 max-w-4xl">
          {siteConfig.name} is an authorized education counselling partner for the
          universities listed on this site. We do not represent any government body. All
          program fees, rankings, and accreditation details are subject to change by the
          respective universities and are updated periodically for accuracy.
        </p>
      </Container>
    </footer>
  );
}
