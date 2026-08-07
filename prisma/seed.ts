import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";
import { universities } from "../src/data/universities";
import { programs } from "../src/data/programs";
import { blogPosts } from "../src/data/blog";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});
const db = new PrismaClient({ adapter });

async function main() {
  for (const u of universities) {
    await db.university.upsert({
      where: { slug: u.slug },
      update: {},
      create: {
        slug: u.slug,
        name: u.name,
        shortName: u.shortName,
        tagline: u.tagline,
        logo: u.logo,
        logoWidth: u.logoWidth,
        logoHeight: u.logoHeight,
        accreditation: JSON.stringify(u.accreditation),
        naac: u.naac,
        established: u.established,
        bestFor: u.bestFor,
        feesMin: u.fees.min,
        feesMax: u.fees.max,
        emiStarts: u.emiStarts,
        duration: u.duration,
        programs: JSON.stringify(u.programs),
        highlights: JSON.stringify(u.highlights),
        overview: u.overview,
        approvals: JSON.stringify(u.approvals),
        placementSupport: u.placementSupport,
        avgSalary: u.avgSalary,
        rating: u.rating,
        color: u.color,
      },
    });
  }
  console.log(`Seeded ${universities.length} universities`);

  for (const p of programs) {
    await db.program.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        name: p.name,
        shortName: p.shortName,
        tagline: p.tagline,
        duration: p.duration,
        eligibility: p.eligibility,
        specializations: JSON.stringify(p.specializations),
        bestFor: JSON.stringify(p.bestFor),
        outcomes: JSON.stringify(p.outcomes),
        universities: JSON.stringify(p.universities),
      },
    });
  }
  console.log(`Seeded ${programs.length} programs`);

  for (const post of blogPosts) {
    await db.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        slug: post.slug,
        title: post.title,
        category: post.category,
        excerpt: post.excerpt,
        content: JSON.stringify(post.content),
        readTime: post.readTime,
        date: new Date(post.date),
      },
    });
  }
  console.log(`Seeded ${blogPosts.length} blog posts`);

  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@gradscholar.in";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "GradScholar@2026";
  const existing = await db.adminUser.findUnique({ where: { email: adminEmail } });
  if (!existing) {
    await db.adminUser.create({
      data: {
        email: adminEmail,
        name: "Admin",
        passwordHash: await bcrypt.hash(adminPassword, 10),
      },
    });
    console.log(`Created admin user: ${adminEmail}`);
  } else {
    console.log(`Admin user already exists: ${adminEmail}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
