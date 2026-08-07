import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadForm } from "@/components/forms/LeadForm";
import { getUniversities } from "@/lib/data";
import { CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Scholarships — Eligibility & Guidance",
  description:
    "Check your scholarship eligibility across NMIMS, Amity, Chandigarh University, Shoolini, GLA, DY Patil, IIM and Manipal online degree programs.",
};

const criteria = [
  "Merit-based scholarships for strong academic records",
  "Early admission / early-bird fee waivers",
  "Corporate and alumni referral discounts",
  "Women's education scholarships",
  "Defence and government employee benefits",
];

export default async function ScholarshipsPage() {
  const universities = await getUniversities();

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Scholarships & Financial Aid"
          title="Most learners qualify for some form of scholarship"
          description="Average scholarship unlocked by our learners: ₹40,000. We check eligibility across every partner university before you apply."
          align="center"
        />

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-display text-xl font-semibold text-green-950">
              Common Scholarship Categories
            </h2>
            <div className="mt-6 space-y-3">
              {criteria.map((c) => (
                <div key={c} className="flex items-center gap-3 rounded-xl border border-green-900/8 bg-cream-50 px-5 py-4">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-gold-600" />
                  <span className="text-sm text-green-900/70">{c}</span>
                </div>
              ))}
            </div>

            <h2 className="mt-12 font-display text-xl font-semibold text-green-950">
              Scholarship Availability by University
            </h2>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-green-900/8">
              <table className="w-full min-w-[500px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-green-950 text-white">
                    <th className="px-5 py-4 font-semibold">University</th>
                    <th className="px-5 py-4 font-semibold">EMI Starts</th>
                    <th className="px-5 py-4 font-semibold">Scholarship Support</th>
                  </tr>
                </thead>
                <tbody>
                  {universities.map((u, i) => (
                    <tr key={u.slug} className={i % 2 === 1 ? "bg-cream-50/60" : undefined}>
                      <td className="px-5 py-4 font-semibold text-green-950">{u.shortName}</td>
                      <td className="px-5 py-4 text-green-900/70">₹{u.emiStarts.toLocaleString("en-IN")}/mo</td>
                      <td className="px-5 py-4 text-green-900/70">Available — verified case-by-case</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <LeadForm
            title="Check Your Scholarship Eligibility"
            subtitle="Get a personalized eligibility check in one free session."
            source="scholarships"
          />
        </div>
      </Container>
    </section>
  );
}
