import Link from "next/link";
import { University } from "@/lib/data";
import { cn } from "@/lib/utils";

function formatFee(n: number) {
  return `₹${(n / 100000).toFixed(1)}L`;
}

export function ComparisonTable({
  items,
  className,
}: {
  items: University[];
  className?: string;
}) {
  return (
    <div className={cn("overflow-x-auto rounded-2xl border border-green-900/8", className)}>
      <table className="w-full min-w-[820px] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-green-950 text-white">
            <th className="px-5 py-4 font-semibold sticky left-0 bg-green-950">University</th>
            <th className="px-5 py-4 font-semibold">Fees</th>
            <th className="px-5 py-4 font-semibold">Duration</th>
            <th className="px-5 py-4 font-semibold">NAAC</th>
            <th className="px-5 py-4 font-semibold">EMI Starts</th>
            <th className="px-5 py-4 font-semibold">Best For</th>
            <th className="px-5 py-4 font-semibold">Avg. Salary</th>
            <th className="px-5 py-4 font-semibold"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((u, i) => (
            <tr
              key={u.slug}
              className={cn(
                "border-b border-green-900/6 last:border-0",
                i % 2 === 1 && "bg-cream-50/60"
              )}
            >
              <td className="px-5 py-4 font-semibold text-green-950 sticky left-0 bg-inherit">
                {u.shortName}
              </td>
              <td className="px-5 py-4 text-green-900/70">
                {formatFee(u.fees.min)} – {formatFee(u.fees.max)}
              </td>
              <td className="px-5 py-4 text-green-900/70">{u.duration}</td>
              <td className="px-5 py-4">
                <span className="inline-flex items-center rounded-full bg-gold-500/10 px-2.5 py-1 text-xs font-semibold text-gold-700">
                  {u.naac}
                </span>
              </td>
              <td className="px-5 py-4 text-green-900/70">₹{u.emiStarts.toLocaleString("en-IN")}/mo</td>
              <td className="px-5 py-4 text-green-900/70">{u.bestFor}</td>
              <td className="px-5 py-4 text-green-900/70">{u.avgSalary}</td>
              <td className="px-5 py-4">
                <Link
                  href={`/universities/${u.slug}`}
                  className="font-semibold text-gold-600 hover:text-gold-500 whitespace-nowrap"
                >
                  Details →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
