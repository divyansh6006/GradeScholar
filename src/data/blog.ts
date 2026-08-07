export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string[];
  readTime: string;
  date: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "2026-online-mba-salary-report",
    title: "2026 Online MBA Salary Report",
    category: "Salary",
    excerpt: "What professionals actually earn after completing an online MBA in India, broken down by specialization and experience level.",
    content: [
      "Salary outcomes after an online MBA vary significantly by specialization, prior experience, and industry. Based on aggregated data from our advisory engagements, learners with 3-5 years of experience see the strongest relative gains.",
      "Marketing and Product specializations trend highest for professionals moving from technical roles, while Finance and Operations specializations show more consistent, linear salary growth.",
      "The single biggest factor in outcome quality isn't the university brand — it's whether the specialization was chosen to match a specific, realistic next role.",
    ],
    readTime: "6 min read",
    date: "2026-01-15",
  },
  {
    slug: "top-online-mba-rankings-2026",
    title: "Top Online MBA Rankings for 2026",
    category: "Universities",
    excerpt: "How NMIMS, Amity, Chandigarh University, Shoolini and GLA compare on accreditation, faculty, and outcomes.",
    content: [
      "Rankings for online MBA programs should weigh accreditation, faculty credentials, placement support, and cost-adjusted ROI — not brand recognition alone.",
      "NMIMS Online leads on brand strength and senior-professional fit. Amity Online offers the broadest specialization catalog. Chandigarh University and Shoolini lead on placement-to-cost ratio.",
    ],
    readTime: "8 min read",
    date: "2026-01-08",
  },
  {
    slug: "highest-paying-mba-specializations",
    title: "Highest Paying MBA Specializations",
    category: "Career",
    excerpt: "A breakdown of which MBA specializations correlate with the strongest salary growth for working professionals.",
    content: [
      "Product Management, Business Analytics, and Finance specializations consistently show the strongest salary lift for professionals transitioning from technical or operational roles.",
      "HR and general Marketing specializations show steadier, longer-horizon growth rather than an immediate jump.",
    ],
    readTime: "5 min read",
    date: "2025-12-20",
  },
  {
    slug: "online-mba-roi-calculator-guide",
    title: "How to Calculate Your Online MBA ROI",
    category: "MBA",
    excerpt: "A practical framework for evaluating whether an online MBA is worth the investment for your specific situation.",
    content: [
      "ROI on an MBA isn't just salary-after minus salary-before minus fees. Time value, opportunity cost, and role-change probability all matter.",
      "As a starting heuristic: if your target role requires a management credential as a hard gate (many PM and consulting roles do), the ROI calculation shifts from 'nice to have' to 'necessary cost of entry'.",
    ],
    readTime: "7 min read",
    date: "2025-12-05",
  },
  {
    slug: "mba-vs-pgdm-whats-the-difference",
    title: "MBA vs PGDM: What's the Difference?",
    category: "Admissions",
    excerpt: "Understanding the accreditation, validity and practical differences between an MBA and a PGDM before you apply.",
    content: [
      "An MBA is a university degree governed by UGC; a PGDM is a diploma governed by AICTE, typically offered by autonomous institutes.",
      "For most working professionals seeking a recognized credential valid for government jobs and higher education, a UGC-entitled online MBA is the safer, more universally recognized choice.",
    ],
    readTime: "4 min read",
    date: "2025-11-22",
  },
  {
    slug: "best-executive-mba-programs-india",
    title: "Best Executive MBA Programs for Senior Professionals",
    category: "Universities",
    excerpt: "What senior professionals with 5+ years of experience should look for in an Executive MBA program.",
    content: [
      "Executive MBA programs prioritize peer cohort quality, flexible scheduling, and strategy-level curriculum over foundational business coursework.",
      "NMIMS Online and Amity Online currently offer the most senior-professional-oriented Executive MBA tracks in our partner portfolio.",
    ],
    readTime: "6 min read",
    date: "2025-11-10",
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
