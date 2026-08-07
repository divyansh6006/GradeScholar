export type Program = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  duration: string;
  eligibility: string;
  specializations: string[];
  bestFor: string[];
  outcomes: string[];
  universities: string[];
};

export const programs: Program[] = [
  {
    slug: "online-mba",
    name: "Online MBA",
    shortName: "MBA",
    tagline: "The credential that moves you from execution to leadership.",
    duration: "2 Years",
    eligibility: "Graduation in any discipline (min 50%)",
    specializations: ["Finance", "Marketing", "HR", "Operations", "Analytics", "IT"],
    bestFor: ["Working Professionals", "IT Professionals", "Team Leads", "Entrepreneurs"],
    outcomes: ["Team Lead → Manager", "Manager → Senior Manager", "IC → Leadership Track"],
    universities: [
      "nmims-online",
      "amity-university-online",
      "chandigarh-university-online",
      "shoolini-university-online",
      "gla-university",
      "gla-university-online",
      "dy-patil-university-online",
      "iim-executive-education",
      "manipal-university-online",
    ],
  },
  {
    slug: "executive-mba",
    name: "Executive MBA",
    shortName: "EMBA",
    tagline: "Built for professionals with 5+ years leading teams and P&Ls.",
    duration: "1-2 Years",
    eligibility: "Graduation + 5 years work experience",
    specializations: ["General Management", "Leadership", "Strategy"],
    bestFor: ["Senior Professionals", "Entrepreneurs", "Government Employees"],
    outcomes: ["Senior Manager → Director", "Founder → Scaled Operator"],
    universities: ["nmims-online", "amity-university-online", "iim-executive-education"],
  },
  {
    slug: "online-mca",
    name: "Online MCA",
    shortName: "MCA",
    tagline: "Deepen your technical credentials without leaving your job.",
    duration: "2 Years",
    eligibility: "Graduation with Mathematics at 10+2 or graduation level",
    specializations: ["Software Development", "Data Science", "Cloud Computing"],
    bestFor: ["IT Professionals", "Career Switchers", "Fresh Graduates"],
    outcomes: ["Developer → Senior Developer", "Support → Engineering"],
    universities: [
      "amity-university-online",
      "chandigarh-university-online",
      "shoolini-university-online",
      "gla-university",
      "dy-patil-university-online",
      "manipal-university-online",
    ],
  },
  {
    slug: "online-bba",
    name: "Online BBA",
    shortName: "BBA",
    tagline: "A strong foundation in business, built for flexible learning.",
    duration: "3 Years",
    eligibility: "10+2 in any stream",
    specializations: ["General Management", "Marketing", "Finance"],
    bestFor: ["Fresh Graduates", "Career Switchers"],
    outcomes: ["Entry-level → Business Roles", "Foundation for MBA"],
    universities: [
      "amity-university-online",
      "chandigarh-university-online",
      "shoolini-university-online",
      "gla-university",
      "gla-university-online",
      "dy-patil-university-online",
      "manipal-university-online",
    ],
  },
  {
    slug: "online-bca",
    name: "Online BCA",
    shortName: "BCA",
    tagline: "Start your technology career with a flexible degree.",
    duration: "3 Years",
    eligibility: "10+2 with Mathematics",
    specializations: ["Programming", "Web Development", "Database Systems"],
    bestFor: ["Fresh Graduates", "Career Switchers"],
    outcomes: ["Foundation for MCA", "Entry-level Developer Roles"],
    universities: [
      "amity-university-online",
      "chandigarh-university-online",
      "gla-university",
      "dy-patil-university-online",
    ],
  },
  {
    slug: "online-mcom",
    name: "Online M.Com",
    shortName: "M.Com",
    tagline: "Advance your finance and commerce expertise.",
    duration: "2 Years",
    eligibility: "Graduation in Commerce or related discipline",
    specializations: ["Accounting & Finance", "Taxation", "Banking"],
    bestFor: ["Finance Professionals", "Government Employees"],
    outcomes: ["Accountant → Finance Manager", "Foundation for CA/CS/CMA"],
    universities: [
      "amity-university-online",
      "shoolini-university-online",
      "gla-university-online",
      "manipal-university-online",
    ],
  },
  {
    slug: "online-ma",
    name: "Online M.A.",
    shortName: "M.A.",
    tagline: "Postgraduate studies in humanities and social sciences.",
    duration: "2 Years",
    eligibility: "Graduation in any discipline",
    specializations: ["Economics", "English", "Public Administration", "Psychology"],
    bestFor: ["Government Employees", "Educators", "Career Switchers"],
    outcomes: ["Eligibility for competitive exams", "Academic & research roles"],
    universities: ["gla-university-online"],
  },
];

export function getProgramBySlug(slug: string) {
  return programs.find((p) => p.slug === slug);
}
