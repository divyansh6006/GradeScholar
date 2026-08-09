import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us — Book a Free Career Consultation",
  description:
    `Schedule a free career consultation with ${siteConfig.name}. Call, WhatsApp, or book a slot online.`,
};

const channels = [
  { icon: Phone, title: "Call Us", value: siteConfig.phoneDisplay, href: `tel:${siteConfig.phoneE164}` },
  { icon: MessageCircle, title: "WhatsApp", value: "Instant Reply", href: siteConfig.whatsappUrl },
  { icon: Mail, title: "Email", value: siteConfig.emailPrimary, href: `mailto:${siteConfig.emailPrimary}` },
  { icon: MapPin, title: "Office", value: "Gurugram, Haryana, India", href: "#" },
];

export default function ContactPage() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Contact Us"
          title="Schedule Your Free Career Consultation"
          description="No cost, no obligation. A career strategist will call you within 24 hours."
          align="center"
        />

        <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {channels.map((c) => (
                <a
                  key={c.title}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-4 rounded-2xl border border-green-900/8 bg-white p-6 transition-colors hover:border-gold-500/30"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-500/10">
                    <c.icon className="h-5 w-5 text-gold-600" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold text-green-950">{c.title}</p>
                    <p className="mt-0.5 text-sm text-green-900/55">{c.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-green-900/8 bg-cream-50 p-6">
              <h3 className="font-display text-base font-semibold text-green-950">
                Office Hours
              </h3>
              <div className="mt-3 space-y-1.5 text-sm text-green-900/60">
                <p>Monday – Saturday: 9:00 AM – 8:00 PM IST</p>
                <p>Sunday: 10:00 AM – 4:00 PM IST</p>
              </div>
            </div>
          </div>

          <LeadForm
            title="Book Your Consultation"
            subtitle="Tell us a bit about yourself and we'll match you with the right advisor."
          />
        </div>
      </Container>
    </section>
  );
}
