# Deploying to Hostinger (Git-connected Node.js hosting) + Cloudflare

This app is a Next.js 16 site with API routes, auth middleware, and a
database (Prisma + libsql). Hostinger's Node.js hosting here deploys by
rebuilding from your GitHub repo on every push — which means **the
filesystem is not persistent between deploys**. Anything written to disk at
runtime (a local SQLite file, uploaded logo images) is wiped the next time
you push. The database therefore lives on **Turso** (a hosted SQLite
service using the same libsql protocol this app already speaks — no code
rewrite needed) instead of a local file.

I don't have access to your Hostinger, Turso, or Cloudflare accounts, so
this is the exact runbook for you to follow.

---

## 1. Create a Turso database (one-time)

1. Sign up at [turso.tech](https://turso.tech) (free tier is enough).
2. Create a database (via their dashboard, or the `turso` CLI if you have
   it installed: `turso db create gradscholar`).
3. Get the connection URL and an auth token:
   - Dashboard: the database page shows a `libsql://...` URL and lets you
     generate a token.
   - CLI: `turso db show gradscholar --url` and `turso db tokens create gradscholar`.
4. Combine them into one connection string:
   ```
   libsql://your-db-name-yourorg.turso.io?authToken=PASTE_TOKEN_HERE
   ```

---

## 2. Migrate and seed the Turso database

Run this **from your own machine** (Turso is reachable over the internet,
so you don't need to be inside Hostinger to do this):

```bash
# Temporarily point at Turso for this one command
DATABASE_URL="libsql://your-db-name-yourorg.turso.io?authToken=..." npx prisma migrate deploy

DATABASE_URL="libsql://your-db-name-yourorg.turso.io?authToken=..." ADMIN_EMAIL="you@yourdomain.com" ADMIN_PASSWORD="pick-a-strong-one" npm run db:seed
```

(On Windows PowerShell, set each as `$env:DATABASE_URL = "..."` on its own
line first instead of prefixing the command.)

This creates the schema and loads the 9 universities / 7 programs / 6 blog
posts, and creates your production admin account. Use a **real** email and
a strong password here — don't reuse the local dev defaults.

---

## 3. Set environment variables in Hostinger

In the Hostinger deployment settings for this project (the same screen
that showed the build logs), find the environment variables section and
add:

| Key | Value |
|---|---|
| `DATABASE_URL` | the same `libsql://...?authToken=...` string from step 1 |
| `ADMIN_SESSION_SECRET` | a fresh random string — generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `NODE_ENV` | `production` |

`ADMIN_EMAIL` / `ADMIN_PASSWORD` are **not** needed here — those were only
for the one-time seed step above, which you already ran against Turso.

---

## 4. Deploy

Push to `main` (or hit **Redeploy** on the existing commit). The build no
longer touches any database at build time, so it will succeed even before
step 1–3 are done — but the site won't have real data or working admin
login until `DATABASE_URL` (pointing at the seeded Turso DB) is set and a
redeploy has picked it up.

Visit the deployment URL, then `/admin/login` with the email/password from
step 2.

---

## 5. Point your domain at Hostinger through Cloudflare

1. **Cloudflare** → Add a site → enter your domain. Cloudflare scans
   existing DNS and gives you two nameservers (e.g. `xxx.ns.cloudflare.com`).
2. **Hostinger** → Domains → your domain → DNS/Nameservers → change to
   those two Cloudflare nameservers. (This hands DNS control to
   Cloudflare — double-check you don't have other records, like email,
   on this domain that need to be recreated in Cloudflare first.)
3. Wait for Cloudflare to show the zone as **Active**.
4. In Cloudflare → DNS, add a record pointing at whatever address Hostinger
   gave you for this deployment (check the deployment screen for an IP or
   hostname to target) — **A** record if it's an IP, **CNAME** if it's a
   hostname. Add `www` the same way if needed.
5. Keep it **Proxied** (orange cloud).
6. Cloudflare → SSL/TLS → set mode to **Full** to match Hostinger's own
   HTTPS.

---

## Known limitation: uploaded logo images

The 9 seeded university logos are committed to the repo (`public/logos/`),
so they're fine — they redeploy with the code every time.

But if you **add a new university via the admin panel and upload a new
logo**, that file is written to `public/logos/` on the live server's disk
— which, per the note at the top of this doc, does not survive the next
redeploy. It'll work fine until the next `git push`, then that specific
logo image will 404 (the university record itself is safe in Turso; only
the image file is at risk).

Workaround for now: after uploading a new logo through the admin panel,
download it from the live site and add it to `public/logos/` in the repo
too, so it's part of the next deploy. A proper fix (routing uploads to
Cloudflare R2 or S3 instead of local disk) is a reasonable next step if
you'll be adding universities often — say the word and I'll build it.

---

## Redeploying after future code changes

Just push to `main`. No manual migrate/seed step needed unless you changed
`prisma/schema.prisma` (in which case run `prisma migrate deploy` against
Turso again, same as step 2, before or after pushing).
