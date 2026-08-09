export type FeePlans = {
  semesterWise?: { label?: string; semesters: number[]; total: number };
  annual?: { label?: string; years: number[]; total: number };
  onePayment?: { label?: string; total: number };
  noCostEmi?: { label?: string; monthly: number; months: number };
};

export type University = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  accreditation: string[];
  naac: string;
  established: number;
  bestFor: string;
  fees: { min: number; max: number };
  emiStarts: number;
  feePlans: FeePlans | null;
  duration: string;
  programs: string[];
  highlights: string[];
  overview: string;
  approvals: string[];
  placementSupport: boolean;
  avgSalary: string;
  rating: number;
  color: string;
};

export const universities: University[] = [
  {
    slug: "nmims-online",
    name: "NMIMS Global Access – Online MBA",
    shortName: "NMIMS Online",
    tagline: "Premium Management & Executive Education",
    logo: "/logos/nmims-online.png",
    logoWidth: 869,
    logoHeight: 133,
    accreditation: [
      "UGC-Entitled",
      "AICTE"
    ],
    naac: "A++",
    established: 1981,
    bestFor: "Senior Professionals",
    fees: {
      min: 196000,
      max: 220000
    },
    emiStarts: 9166,
    feePlans: {
      semesterWise: {
        semesters: [
          55000,
          55000,
          55000,
          55000
        ],
        total: 220000
      },
      annual: {
        years: [
          105000,
          105000
        ],
        total: 210000
      },
      onePayment: {
        label: "One-Time Payment (Self Payment)",
        total: 196000
      },
      noCostEmi: {
        monthly: 9166,
        months: 24
      }
    },
    duration: "2 Years",
    programs: [
      "Online MBA",
      "Online PGDM",
      "Executive MBA"
    ],
    highlights: [
      "Ranked among India's top B-Schools",
      "Strong alumni network across leadership roles",
      "Live + recorded faculty sessions",
      "Specializations in Finance, Marketing, HR, Analytics"
    ],
    overview: "NMIMS Global Access School for Continuing Education (NGA-SCE) brings the academic rigor of NMIMS to a flexible online format, built for senior professionals who want a management credential without stepping away from their careers.",
    approvals: [
      "UGC-Entitled",
      "Approved for Government Jobs",
      "Valid for Higher Studies"
    ],
    placementSupport: true,
    avgSalary: "₹12-18 LPA",
    rating: 4.8,
    color: "#14400C"
  },
  {
    slug: "amity-university-online",
    name: "Amity University Online",
    shortName: "Amity Online",
    tagline: "Globally Recognized Online Degrees",
    logo: "/logos/amity-university-online.png",
    logoWidth: 150,
    logoHeight: 67,
    accreditation: [
      "UGC-Entitled",
      "NAAC A+"
    ],
    naac: "A+",
    established: 2005,
    bestFor: "Global Learners",
    fees: {
      min: 207000,
      max: 225000
    },
    emiStarts: 8904,
    feePlans: {
      semesterWise: {
        semesters: [
          56300,
          56300,
          56300,
          56100
        ],
        total: 225000
      },
      annual: {
        years: [
          106850,
          106850
        ],
        total: 213700
      },
      onePayment: {
        label: "One time payment for 2 year (self payment)",
        total: 207000
      },
      noCostEmi: {
        monthly: 8904,
        months: 24
      }
    },
    duration: "2 Years",
    programs: [
      "Online MBA",
      "Online BBA",
      "Online MCA",
      "Online BCA",
      "Online MCom"
    ],
    highlights: [
      "Global campuses across 5 countries",
      "Industry-integrated curriculum",
      "International student exchange opportunities",
      "Wide specialization portfolio"
    ],
    overview: "Amity University Online extends one of India's largest private university networks into a fully online format, offering globally benchmarked degrees with strong industry linkages and a broad program catalog.",
    approvals: [
      "UGC-Entitled",
      "Approved for Government Jobs",
      "Valid for Higher Studies"
    ],
    placementSupport: true,
    avgSalary: "₹8-14 LPA",
    rating: 4.6,
    color: "#1C5710"
  },
  {
    slug: "chandigarh-university-online",
    name: "Chandigarh University Online",
    shortName: "Chandigarh University",
    tagline: "Industry-Focused Learning with Global Exposure",
    logo: "/logos/chandigarh-university-online.png",
    logoWidth: 379,
    logoHeight: 82,
    accreditation: [
      "UGC-Entitled",
      "NAAC A+"
    ],
    naac: "A+",
    established: 2012,
    bestFor: "Career Growth",
    fees: {
      min: 165000,
      max: 220000
    },
    emiStarts: 13750,
    feePlans: {
      semesterWise: {
        semesters: [
          41250,
          41250,
          41250,
          41250
        ],
        total: 165000
      },
      annual: {
        years: [
          82500,
          82500
        ],
        total: 165000
      }
    },
    duration: "2 Years",
    programs: [
      "Online MBA",
      "Online BBA",
      "Online MCA",
      "Online BCA"
    ],
    highlights: [
      "Consistently ranked for placements",
      "Strong corporate partnerships",
      "Modern LMS with career services integration",
      "Affordable fee structure"
    ],
    overview: "Chandigarh University Online carries forward CU's placement-driven, industry-connected approach into a digital-first learning experience designed for career acceleration.",
    approvals: [
      "UGC-Entitled",
      "Approved for Government Jobs",
      "Valid for Higher Studies"
    ],
    placementSupport: true,
    avgSalary: "₹7-13 LPA",
    rating: 4.6,
    color: "#14400C"
  },
  {
    slug: "shoolini-university-online",
    name: "Shoolini University Online",
    shortName: "Shoolini University",
    tagline: "Research-Driven & Innovation-Focused Programs",
    logo: "/logos/shoolini-university-online.png",
    logoWidth: 1250,
    logoHeight: 406,
    accreditation: [
      "UGC-Entitled",
      "NAAC A+"
    ],
    naac: "A+",
    established: 2009,
    bestFor: "Innovation & Research",
    fees: {
      min: 118000,
      max: 130000
    },
    emiStarts: 5417,
    feePlans: {
      semesterWise: {
        semesters: [
          32500,
          32500,
          32500,
          32500
        ],
        total: 130000
      }
    },
    duration: "2 Years",
    programs: [
      "Online MBA",
      "Online MCA",
      "Online BBA",
      "Online MCom"
    ],
    highlights: [
      "Ranked among top research universities in India",
      "Faculty with strong industry & research credentials",
      "Innovation and entrepreneurship focus",
      "Competitive fee structure"
    ],
    overview: "Shoolini University Online brings a research-first, innovation-led academic culture to working professionals, ideal for learners who want an analytically rigorous, outcomes-driven program.",
    approvals: [
      "UGC-Entitled",
      "Approved for Government Jobs",
      "Valid for Higher Studies"
    ],
    placementSupport: true,
    avgSalary: "₹7-12 LPA",
    rating: 4.5,
    color: "#1C5710"
  },
  {
    slug: "gla-university",
    name: "GLA University",
    shortName: "GLA University",
    tagline: "Career-Oriented Professional Education",
    logo: "/logos/gla-university.webp",
    logoWidth: 652,
    logoHeight: 247,
    accreditation: [
      "UGC-Entitled",
      "NAAC A+"
    ],
    naac: "A+",
    established: 1998,
    bestFor: "Affordable Education",
    fees: {
      min: 70000,
      max: 130000
    },
    emiStarts: 2900,
    feePlans: null,
    duration: "2 Years",
    programs: [
      "Online MBA",
      "Online BBA",
      "Online BCA",
      "Online MCA"
    ],
    highlights: [
      "Strong on-ground legacy institution",
      "Career-oriented curriculum design",
      "High value-for-money fee structure",
      "Dedicated placement cell"
    ],
    overview: "GLA University combines a well-established on-campus legacy with a career-first curriculum, offering dependable, affordable degrees for professionals looking to move up.",
    approvals: [
      "UGC-Entitled",
      "Approved for Government Jobs",
      "Valid for Higher Studies"
    ],
    placementSupport: true,
    avgSalary: "₹6-11 LPA",
    rating: 4.4,
    color: "#14400C"
  },
  {
    slug: "gla-university-online",
    name: "GLA University Online",
    shortName: "GLA Online",
    tagline: "Flexible Online Degree Programs",
    logo: "/logos/gla-university-online.png",
    logoWidth: 560,
    logoHeight: 172,
    accreditation: [
      "UGC-Entitled",
      "NAAC A+"
    ],
    naac: "A+",
    established: 2021,
    bestFor: "Flexible Learning",
    fees: {
      min: 97000,
      max: 105300
    },
    emiStarts: 4388,
    feePlans: {
      semesterWise: {
        semesters: [
          24250,
          24250,
          24250,
          24250
        ],
        total: 97000
      },
      onePayment: {
        label: "One-Time / Lump Sum Payment",
        total: 105300
      }
    },
    duration: "2 Years",
    programs: [
      "Online MBA",
      "Online BBA",
      "Online MCom",
      "Online MA"
    ],
    highlights: [
      "Fully asynchronous, mobile-first LMS",
      "Flexible exam scheduling",
      "Backed by GLA University's academic infrastructure",
      "Most affordable EMI options in the portfolio"
    ],
    overview: "GLA University Online is the fully digital arm of GLA University, purpose-built for learners who need maximum scheduling flexibility without compromising on accreditation.",
    approvals: [
      "UGC-Entitled",
      "Approved for Government Jobs",
      "Valid for Higher Studies"
    ],
    placementSupport: true,
    avgSalary: "₹6-10 LPA",
    rating: 4.4,
    color: "#1C5710"
  },
  {
    slug: "dy-patil-university-online",
    name: "Ajeenkya DY Patil University Online",
    shortName: "DY Patil Online",
    tagline: "The Innovation University, Now Online",
    logo: "/logos/dy-patil-university-online.png",
    logoWidth: 270,
    logoHeight: 102,
    accreditation: [
      "UGC-DEB Approved",
      "NAAC A"
    ],
    naac: "A",
    established: 2015,
    bestFor: "Innovation-Focused Learners",
    fees: {
      min: 180000,
      max: 200000
    },
    emiStarts: 8333,
    feePlans: {
      semesterWise: {
        semesters: [
          50000,
          50000,
          50000,
          50000
        ],
        total: 200000
      },
      annual: {
        years: [
          100000,
          100000
        ],
        total: 200000
      }
    },
    duration: "2 Years",
    programs: [
      "Online MBA",
      "Online BBA",
      "Online BCA",
      "Online MCA"
    ],
    highlights: [
      "UGC-DEB approved online programs",
      "Innovation and entrepreneurship-led pedagogy",
      "Modern industry-aligned curriculum",
      "Ranked among top emerging private universities"
    ],
    overview: "Ajeenkya DY Patil University Online extends ADYPU's innovation-first academic culture into a flexible online format, built for learners who want a future-ready, industry-aligned curriculum.",
    approvals: [
      "UGC-DEB Approved",
      "Approved for Government Jobs",
      "Valid for Higher Studies"
    ],
    placementSupport: true,
    avgSalary: "₹6-12 LPA",
    rating: 4.4,
    color: "#14400C"
  },
  {
    slug: "iim-executive-education",
    name: "IIM Executive Education Programs",
    shortName: "IIM",
    tagline: "Executive Certificate Programs for Senior Leaders",
    logo: "/logos/iim-executive-education.png",
    logoWidth: 711,
    logoHeight: 255,
    accreditation: [
      "Institute of National Importance",
      "AICTE"
    ],
    naac: "N/A",
    established: 1961,
    bestFor: "Senior Leadership Roles",
    fees: {
      min: 800000,
      max: 1632000
    },
    emiStarts: 68000,
    feePlans: null,
    duration: "11-12 Months",
    programs: [
      "Executive MBA",
      "Online MBA"
    ],
    highlights: [
      "Faculty from India's premier management institutes",
      "Cohort of senior professionals and leaders",
      "Strategy and leadership-focused curriculum",
      "Highly selective admission process"
    ],
    overview: "IIM Executive Education programs bring the rigor and brand strength of India's premier management institutes to senior professionals seeking a strategy and leadership-focused credential.",
    approvals: [
      "Institute of National Importance",
      "Recognized by Ministry of Education"
    ],
    placementSupport: false,
    avgSalary: "₹18-30 LPA",
    rating: 4.9,
    color: "#0E2B08"
  },
  {
    slug: "manipal-university-online",
    name: "Manipal Academy of Higher Education Online",
    shortName: "Manipal Online",
    tagline: "Inspired by Life — Globally Ranked Online Degrees",
    logo: "/logos/manipal-university-online.png",
    logoWidth: 1200,
    logoHeight: 164,
    accreditation: [
      "UGC-Entitled",
      "NAAC A++"
    ],
    naac: "A++",
    established: 1953,
    bestFor: "Global Recognition",
    fees: {
      min: 292000,
      max: 292000
    },
    emiStarts: 12167,
    feePlans: {
      semesterWise: {
        semesters: [
          73000,
          73000,
          73000,
          73000
        ],
        total: 292000
      },
      noCostEmi: {
        monthly: 12167,
        months: 24
      }
    },
    duration: "2 Years",
    programs: [
      "Online MBA",
      "Online BBA",
      "Online MCA",
      "Online MCom"
    ],
    highlights: [
      "Institution of Eminence status",
      "Globally ranked deemed university",
      "Strong international faculty and alumni network",
      "Wide range of specializations"
    ],
    overview: "Manipal Academy of Higher Education Online extends one of India's top-ranked, globally recognized deemed universities into a UGC-entitled online format for working professionals.",
    approvals: [
      "UGC-Entitled",
      "Approved for Government Jobs",
      "Valid for Higher Studies"
    ],
    placementSupport: true,
    avgSalary: "₹10-16 LPA",
    rating: 4.7,
    color: "#1C5710"
  },
  {
    slug: "lpu-online",
    name: "Lovely Professional University Online",
    shortName: "LPU Online",
    tagline: "Same Degree, Now Online",
    logo: "/logos/lpu-online.png",
    logoWidth: 1929,
    logoHeight: 503,
    accreditation: [
      "UGC-Entitled",
      "NAAC A++"
    ],
    naac: "A++",
    established: 2005,
    bestFor: "Widest Program & Specialization Variety",
    fees: {
      min: 129280,
      max: 161600
    },
    emiStarts: 6067,
    feePlans: {
      semesterWise: {
        semesters: [
          40400,
          40400,
          40400,
          40400
        ],
        total: 161600
      },
      noCostEmi: {
        label: "No-Cost EMI (with 20% Student Grant)",
        monthly: 6733,
        months: 24
      }
    },
    duration: "2 Years",
    programs: [
      "Online MBA",
      "Online BBA",
      "Online MCA",
      "Online BCA",
      "Online MCom"
    ],
    highlights: [
      "One of India's largest private universities",
      "Widest specialization catalog among partners",
      "Strong industry connect and alumni network",
      "20% student grant with no-cost EMI"
    ],
    overview: "LPU Online extends Lovely Professional University's large-scale, industry-connected academic ecosystem into a flexible online format, offering one of the widest specialization catalogs among our partner universities.",
    approvals: [
      "UGC-Entitled",
      "Approved for Government Jobs",
      "Valid for Higher Studies"
    ],
    placementSupport: true,
    avgSalary: "₹6-11 LPA",
    rating: 4.5,
    color: "#1C5710"
  },
  {
    slug: "andhra-university-online",
    name: "Andhra University School of Distance Education",
    shortName: "Andhra University",
    tagline: "India's Oldest Distance Education Program",
    logo: "/logos/andhra-online.png",
    logoWidth: 310,
    logoHeight: 321,
    accreditation: [
      "UGC-DEB Entitled",
      "NAAC A+"
    ],
    naac: "A+",
    established: 1926,
    bestFor: "Affordable Government-Recognized Degrees",
    fees: {
      min: 51000,
      max: 90000
    },
    emiStarts: 4250,
    feePlans: null,
    duration: "2 Years",
    programs: [
      "Online MBA"
    ],
    highlights: [
      "Nearly a century of academic legacy",
      "Same degree and syllabus as regular Andhra University students",
      "25+ study centres for learner support",
      "UGC-DEB approved since inception"
    ],
    overview: "Andhra University School of Distance Education (AUSDE) is one of India's oldest distance education providers, offering the same degree and curriculum as its regular on-campus programs.",
    approvals: [
      "UGC-DEB Entitled",
      "Approved for Government Jobs",
      "Valid for Higher Studies"
    ],
    placementSupport: false,
    avgSalary: "₹5-9 LPA",
    rating: 4.2,
    color: "#14400C"
  },
  {
    slug: "kurukshetra-university-online",
    name: "Kurukshetra University Online",
    shortName: "KUK Online",
    tagline: "Affordable State University Degree",
    logo: "/logos/kuk-online.png",
    logoWidth: 540,
    logoHeight: 156,
    accreditation: [
      "UGC-Entitled",
      "NAAC A++"
    ],
    naac: "A++",
    established: 1956,
    bestFor: "Affordable State University Degree",
    fees: {
      min: 98545,
      max: 98545
    },
    emiStarts: 4106,
    feePlans: {
      semesterWise: {
        semesters: [
          24636,
          24636,
          24636,
          24636
        ],
        total: 98545
      }
    },
    duration: "2 Years",
    programs: [
      "Online MBA"
    ],
    highlights: [
      "Category-I university status",
      "NAAC A++ accredited state university",
      "Corporate tie-ups for career support",
      "One of the most affordable UGC-entitled MBAs"
    ],
    overview: "Kurukshetra University Online brings a NAAC A++ accredited state university's academic rigor to a flexible, affordable online format for working professionals.",
    approvals: [
      "UGC-Entitled",
      "Approved for Government Jobs",
      "Valid for Higher Studies"
    ],
    placementSupport: true,
    avgSalary: "₹5-9 LPA",
    rating: 4.3,
    color: "#1C5710"
  },
  {
    slug: "op-jindal-online",
    name: "O.P. Jindal Global University Online",
    shortName: "JGU Online",
    tagline: "Institution of Eminence, Now Online",
    logo: "/logos/jgu-online.webp",
    logoWidth: 1910,
    logoHeight: 682,
    accreditation: [
      "UGC-Entitled",
      "NAAC A++"
    ],
    naac: "A++",
    established: 2009,
    bestFor: "Fast-Track 1-Year MBA",
    fees: {
      min: 150000,
      max: 175000
    },
    emiStarts: 5000,
    feePlans: {
      onePayment: {
        label: "Discounted Fee",
        total: 150000
      }
    },
    duration: "1 Year",
    programs: [
      "Online MBA"
    ],
    highlights: [
      "Institution of Eminence status (Govt. of India)",
      "Fast-track 1-year MBA format",
      "Highly ranked private university faculty",
      "EMI options from ₹5,000/month"
    ],
    overview: "O.P. Jindal Global University Online extends one of India's top-ranked, Institution-of-Eminence-designated private universities into a fast-track, 1-year online MBA format.",
    approvals: [
      "UGC-Entitled",
      "Approved for Government Jobs",
      "Valid for Higher Studies"
    ],
    placementSupport: true,
    avgSalary: "₹8-14 LPA",
    rating: 4.6,
    color: "#0E2B08"
  },
  {
    slug: "vgu-online",
    name: "Vivekananda Global University Online",
    shortName: "VGU Online",
    tagline: "Entitled by UGC — Online VGU",
    logo: "/logos/vgu-online.png",
    logoWidth: 800,
    logoHeight: 401,
    accreditation: [
      "UGC-Entitled",
      "NAAC A+"
    ],
    naac: "A+",
    established: 2012,
    bestFor: "Wide UG & PG Portfolio",
    fees: {
      min: 150000,
      max: 150000
    },
    emiStarts: 6250,
    feePlans: {
      semesterWise: {
        semesters: [
          37500,
          37500,
          37500,
          37500
        ],
        total: 150000
      }
    },
    duration: "2 Years",
    programs: [
      "Online MBA",
      "Online BBA",
      "Online MCA",
      "Online BCA",
      "Online MA"
    ],
    highlights: [
      "8 industry-specific MBA specializations",
      "Wide UG and PG program portfolio",
      "NAAC A+ accredited Rajasthan university",
      "Flexible yearly or semester-wise payment"
    ],
    overview: "Vivekananda Global University Online (Online VGU) offers a broad portfolio of UGC-entitled undergraduate and postgraduate degrees from a NAAC A+ accredited Jaipur-based university.",
    approvals: [
      "UGC-Entitled",
      "Approved for Government Jobs",
      "Valid for Higher Studies"
    ],
    placementSupport: true,
    avgSalary: "₹5-9 LPA",
    rating: 4.3,
    color: "#14400C"
  },
  {
    slug: "bharathidasan-university-online",
    name: "Bharathidasan University Online",
    shortName: "BDU Online",
    tagline: "Centre for Distance and Online Education",
    logo: "/logos/bdu-online.png",
    logoWidth: 513,
    logoHeight: 132,
    accreditation: [
      "UGC-Entitled",
      "NAAC A+"
    ],
    naac: "A+",
    established: 1982,
    bestFor: "Affordable South India Degree",
    fees: {
      min: 91000,
      max: 91000
    },
    emiStarts: 7583,
    feePlans: {
      semesterWise: {
        semesters: [
          22750,
          22750,
          22750,
          22750
        ],
        total: 91000
      }
    },
    duration: "2 Years",
    programs: [
      "Online MBA"
    ],
    highlights: [
      "State university with strong Tamil Nadu presence",
      "UGC-approved Centre for Distance and Online Education",
      "Affordable, semester-based fee structure",
      "Installment payment options"
    ],
    overview: "Bharathidasan University Online, through its UGC-approved Centre for Distance and Online Education, offers an affordable MBA for working professionals across South India.",
    approvals: [
      "UGC-Entitled",
      "Approved for Government Jobs",
      "Valid for Higher Studies"
    ],
    placementSupport: false,
    avgSalary: "₹5-8 LPA",
    rating: 4.2,
    color: "#1C5710"
  },
  {
    slug: "vignan-university-online",
    name: "Vignan University Online",
    shortName: "Vignan Online",
    tagline: "Choose Your UGC-Entitled Online Degree",
    logo: "/logos/vignan-online.png",
    logoWidth: 1385,
    logoHeight: 1380,
    accreditation: [
      "UGC-Entitled",
      "NAAC A++"
    ],
    naac: "A++",
    established: 1997,
    bestFor: "No-Cost EMI on Full Fee",
    fees: {
      min: 90000,
      max: 90000
    },
    emiStarts: 5700,
    feePlans: {
      semesterWise: {
        semesters: [
          22500,
          22500,
          22500,
          22500
        ],
        total: 90000
      },
      noCostEmi: {
        monthly: 5700,
        months: 16
      }
    },
    duration: "2 Years",
    programs: [
      "Online MBA",
      "Online BBA",
      "Online MCA",
      "Online BCA"
    ],
    highlights: [
      "45 years of academic legacy",
      "7 industry-specific MBA specializations",
      "NAAC A++ accredited",
      "Direct no-cost EMI from the university"
    ],
    overview: "Vignan University Online brings 45 years of academic legacy and NAAC A++ accreditation to a flexible online format, with direct no-cost EMI support.",
    approvals: [
      "UGC-Entitled",
      "Approved for Government Jobs",
      "Valid for Higher Studies"
    ],
    placementSupport: true,
    avgSalary: "₹5-9 LPA",
    rating: 4.3,
    color: "#0E2B08"
  },
  {
    slug: "vistas-online",
    name: "VISTAS (Vels University) Online",
    shortName: "VISTAS Online",
    tagline: "Knowledge is Power — VISTAS ODL",
    logo: "/logos/vistas-online.png",
    logoWidth: 1196,
    logoHeight: 238,
    accreditation: [
      "UGC-DEB Entitled",
      "NAAC A++"
    ],
    naac: "A++",
    established: 1992,
    bestFor: "Most Affordable Option",
    fees: {
      min: 50000,
      max: 75000
    },
    emiStarts: 3125,
    feePlans: null,
    duration: "2 Years",
    programs: [
      "Online MBA"
    ],
    highlights: [
      "NAAC A++ accredited deemed university",
      "Category-1 institution status by UGC",
      "One of the most affordable MBAs in our portfolio",
      "Chennai-based, strong South India presence"
    ],
    overview: "VISTAS (Vels Institute of Science, Technology & Advanced Studies) Online offers an affordable, UGC-DEB entitled MBA through its dedicated Centre for Distance and Online Education.",
    approvals: [
      "UGC-DEB Entitled",
      "Approved for Government Jobs",
      "Valid for Higher Studies"
    ],
    placementSupport: false,
    avgSalary: "₹4-7 LPA",
    rating: 4.1,
    color: "#14400C"
  },
  {
    slug: "alliance-university-online",
    name: "Alliance University Online",
    shortName: "Alliance Online",
    tagline: "Premium Bangalore University, Now Online",
    logo: "/logos/alliance-online.webp",
    logoWidth: 1500,
    logoHeight: 371,
    accreditation: [
      "UGC-Entitled",
      "NAAC A+"
    ],
    naac: "A+",
    established: 2010,
    bestFor: "Premium Private University Brand",
    fees: {
      min: 160000,
      max: 160000
    },
    emiStarts: 8000,
    feePlans: {
      noCostEmi: {
        monthly: 8000,
        months: 20
      }
    },
    duration: "2 Years",
    programs: [
      "Online MBA",
      "Online BBA",
      "Online MCom"
    ],
    highlights: [
      "Bangalore-based premium private university",
      "Industry-focused, flexible online delivery",
      "No-cost EMI from ₹8,000/month",
      "Strong corporate recognition"
    ],
    overview: "Alliance University Online extends the academic excellence and industry focus of Bangalore's Alliance University into a flexible digital learning format.",
    approvals: [
      "UGC-Entitled",
      "Approved for Government Jobs",
      "Valid for Higher Studies"
    ],
    placementSupport: true,
    avgSalary: "₹7-12 LPA",
    rating: 4.4,
    color: "#1C5710"
  },
  {
    slug: "kalasalingam-university-online",
    name: "Kalasalingam University Online",
    shortName: "Kalasalingam Online",
    tagline: "Centre for Distance and Online Education",
    logo: "/logos/kalasalingam-online.png",
    logoWidth: 900,
    logoHeight: 200,
    accreditation: [
      "UGC-DEB Entitled",
      "NAAC A"
    ],
    naac: "A",
    established: 2008,
    bestFor: "Most Affordable EMI",
    fees: {
      min: 70000,
      max: 70000
    },
    emiStarts: 2917,
    feePlans: {
      annual: {
        years: [
          35000,
          35000
        ],
        total: 70000
      }
    },
    duration: "2 Years",
    programs: [
      "Online MBA"
    ],
    highlights: [
      "UGC-DEB entitled and AICTE approved programs",
      "One of the lowest total fees in our portfolio",
      "Flexible annual or semester installments",
      "NAAC A grade accreditation"
    ],
    overview: "Kalasalingam University Online, through its Centre for Distance and Online Education, offers one of the most affordable UGC-DEB entitled MBAs in our partner portfolio.",
    approvals: [
      "UGC-DEB Entitled",
      "Approved for Government Jobs",
      "Valid for Higher Studies"
    ],
    placementSupport: false,
    avgSalary: "₹4-7 LPA",
    rating: 4.1,
    color: "#0E2B08"
  },
  {
    slug: "assam-downtown-university-online",
    name: "Assam Down Town University Online",
    shortName: "ADTU Online",
    tagline: "Encouraging Success — ADTU Online",
    logo: "/logos/adtu-online.png",
    logoWidth: 1020,
    logoHeight: 304,
    accreditation: [
      "UGC-Entitled",
      "NAAC A+"
    ],
    naac: "A+",
    established: 2010,
    bestFor: "Northeast India Access",
    fees: {
      min: 90000,
      max: 90000
    },
    emiStarts: 3750,
    feePlans: null,
    duration: "2 Years",
    programs: [
      "Online MBA",
      "Online BBA"
    ],
    highlights: [
      "First private university in Northeast India with NAAC A+",
      "Dedicated Centre for Distance and Online Education",
      "Strong regional presence and support",
      "Affordable fee structure"
    ],
    overview: "Assam Down Town University Online, through its Centre for Distance and Online Education, brings UGC-approved online degrees to learners across Northeast India and beyond.",
    approvals: [
      "UGC-Entitled",
      "Approved for Government Jobs",
      "Valid for Higher Studies"
    ],
    placementSupport: false,
    avgSalary: "₹4-8 LPA",
    rating: 4.2,
    color: "#1C5710"
  }
];

export function getUniversityBySlug(slug: string) {
  return universities.find((u) => u.slug === slug);
}
