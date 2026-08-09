import "server-only";
import { db } from "@/lib/db";
import type {
  University as DbUniversity,
  Program as DbProgram,
  BlogPost as DbBlogPost,
} from "@/generated/prisma/client";

export type FeePlans = {
  semesterWise?: { label?: string; semesters: number[]; total: number };
  annual?: { label?: string; years: number[]; total: number };
  onePayment?: { label?: string; total: number };
  noCostEmi?: { label?: string; monthly: number; months: number };
};

export type University = {
  id: string;
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
  published: boolean;
};

export type Program = {
  id: string;
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
  published: boolean;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string[];
  readTime: string;
  date: string;
  published: boolean;
};

function parseJsonArray(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function parseFeePlans(value: string | null): FeePlans | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as FeePlans;
  } catch {
    return null;
  }
}

function mapUniversity(u: DbUniversity): University {
  return {
    id: u.id,
    slug: u.slug,
    name: u.name,
    shortName: u.shortName,
    tagline: u.tagline,
    logo: u.logo,
    logoWidth: u.logoWidth,
    logoHeight: u.logoHeight,
    accreditation: parseJsonArray(u.accreditation),
    naac: u.naac,
    established: u.established,
    bestFor: u.bestFor,
    fees: { min: u.feesMin, max: u.feesMax },
    emiStarts: u.emiStarts,
    feePlans: parseFeePlans(u.feePlans),
    duration: u.duration,
    programs: parseJsonArray(u.programs),
    highlights: parseJsonArray(u.highlights),
    overview: u.overview,
    approvals: parseJsonArray(u.approvals),
    placementSupport: u.placementSupport,
    avgSalary: u.avgSalary,
    rating: u.rating,
    color: u.color,
    published: u.published,
  };
}

function mapProgram(p: DbProgram): Program {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    shortName: p.shortName,
    tagline: p.tagline,
    duration: p.duration,
    eligibility: p.eligibility,
    specializations: parseJsonArray(p.specializations),
    bestFor: parseJsonArray(p.bestFor),
    outcomes: parseJsonArray(p.outcomes),
    universities: parseJsonArray(p.universities),
    published: p.published,
  };
}

function mapBlogPost(p: DbBlogPost): BlogPost {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    category: p.category,
    excerpt: p.excerpt,
    content: parseJsonArray(p.content),
    readTime: p.readTime,
    date: p.date.toISOString(),
    published: p.published,
  };
}

export async function getUniversities(): Promise<University[]> {
  const rows = await db.university.findMany({
    where: { published: true },
    orderBy: { createdAt: "asc" },
  });
  return rows.map(mapUniversity);
}

export async function getUniversityBySlug(slug: string): Promise<University | null> {
  const row = await db.university.findFirst({ where: { slug, published: true } });
  return row ? mapUniversity(row) : null;
}

export async function getPrograms(): Promise<Program[]> {
  const rows = await db.program.findMany({
    where: { published: true },
    orderBy: { createdAt: "asc" },
  });
  return rows.map(mapProgram);
}

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  const row = await db.program.findFirst({ where: { slug, published: true } });
  return row ? mapProgram(row) : null;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const rows = await db.blogPost.findMany({
    where: { published: true },
    orderBy: { date: "desc" },
  });
  return rows.map(mapBlogPost);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const row = await db.blogPost.findFirst({ where: { slug, published: true } });
  return row ? mapBlogPost(row) : null;
}
