import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Check, Minus, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

type Status = boolean | "partial";

const rows: { label: string; us: Status; direct: Status; agent: Status }[] = [
  { label: "Compares multiple universities objectively", us: true, direct: false, agent: "partial" },
  { label: "Free career consultation before you apply", us: true, direct: false, agent: "partial" },
  { label: "Scholarship & EMI eligibility check", us: true, direct: "partial", agent: "partial" },
  { label: "Dedicated success manager post-admission", us: true, direct: false, agent: false },
  { label: "No pressure to pick a specific university", us: true, direct: true, agent: false },
  { label: "Documentation & application handled for you", us: true, direct: false, agent: "partial" },
];

function Cell({ status }: { status: boolean | "partial" }) {
  if (status === true) {
    return (
      <div className="flex justify-center">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500/15">
          <Check className="h-3.5 w-3.5 text-gold-600" />
        </span>
      </div>
    );
  }
  if (status === "partial") {
    return (
      <div className="flex justify-center">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-900/8">
          <Minus className="h-3.5 w-3.5 text-green-900/50" />
        </span>
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-900/5">
        <X className="h-3.5 w-3.5 text-green-900/30" />
      </span>
    </div>
  );
}

export default function WhyDifferent() {
  return (
    <section className="py-20 lg:py-28 bg-cream-50">
      <Container>
        <SectionHeading
          eyebrow={`Why ${siteConfig.name}`}
          title="See exactly how we compare"
          description="Transparency is part of the pitch — here's how working with us stacks up against applying directly or going through a generic agent."
          align="center"
        />

        <Reveal delay={0.1}>
          <div className="mt-14 overflow-x-auto rounded-2xl border border-green-900/8 bg-white">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-green-900/8">
                  <th className="px-6 py-5 font-display text-sm font-semibold text-green-950">
                    What you get
                  </th>
                  <th className="px-6 py-5 text-center">
                    <span className="rounded-full bg-green-950 px-3 py-1.5 text-xs font-bold text-gold-400">
                      {siteConfig.name}
                    </span>
                  </th>
                  <th className="px-6 py-5 text-center font-display text-sm font-semibold text-green-900/50">
                    Applying Direct
                  </th>
                  <th className="px-6 py-5 text-center font-display text-sm font-semibold text-green-900/50">
                    Generic Agent
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 1 ? "bg-cream-50/60" : undefined}>
                    <td className="px-6 py-4 text-green-900/75">{row.label}</td>
                    <td className="px-6 py-4">
                      <Cell status={row.us} />
                    </td>
                    <td className="px-6 py-4">
                      <Cell status={row.direct} />
                    </td>
                    <td className="px-6 py-4">
                      <Cell status={row.agent} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
