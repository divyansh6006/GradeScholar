# Deploying to Hostinger (Node.js app hosting) + Cloudflare

This app is a Next.js 16 site with API routes, auth middleware, and a SQLite
database (via Prisma + libsql). It needs a persistent Node.js process — it
will not run on plain PHP/static shared hosting. This guide assumes your
Hostinger plan has the **Node.js** section in hPanel (Passenger-based).

I cannot access your Hostinger or Cloudflare accounts directly, so you'll
need to carry out the panel steps yourself — this doc is the exact runbook.

---

## 0. One-time check

In hPanel → **Advanced → Node.js**, confirm the available Node version is
**20.9 or newer** (this app requires it). If only older versions are
offered, this deployment path won't work and you'd need a VPS instead.

---

## 1. Get the code onto the server

You don't have a git repo for this project yet, so the simplest path is a
zip upload:

1. On your machine, zip the project **excluding** `node_modules`, `.next`,
   and `.env` (these should never be uploaded — `node_modules` gets
   reinstalled on the server, `.env` holds secrets you'll create fresh).
2. In hPanel → **Files → File Manager**, upload the zip into your Node app's
   folder (hPanel shows you this path when you create the Node.js app in
   step 2) and extract it there.

If you'd rather use Git (e.g. you push this to GitHub first), Hostinger's
Node.js app screen also supports pulling from a repository — either works;
the rest of this guide is the same either way.

---

## 2. Create the Node.js app in hPanel

1. hPanel → **Advanced → Node.js → Create Application**.
2. **Node.js version**: 20.x or newer.
3. **Application root**: the folder you uploaded the code into.
4. **Application URL**: your domain (or a subdomain if you want to test
   before cutting over DNS).
5. **Application startup file**: `server.js`
6. Save/Create.

---

## 3. Environment variables

In the same Node.js app screen there's an **Environment variables** section.
Add these (copy the shape from `.env.example` in the repo):

| Key | Value |
|---|---|
| `DATABASE_URL` | `file:./dev.db` |
| `ADMIN_SESSION_SECRET` | a fresh random string — generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `ADMIN_EMAIL` | the real admin login email you want in production |
| `ADMIN_PASSWORD` | a strong password — this is only used once, by the seed step below |
| `NODE_ENV` | `production` |

Do **not** reuse the dev credentials (`admin@gradscholar.in` /
`GradScholar@2026`) in production — pick a new password here.

If hPanel doesn't give you an env var UI, create a `.env` file directly in
the app root via File Manager with the same keys/values instead.

---

## 4. Install, migrate, seed, build

hPanel's Node.js screen has buttons for **NPM Install** and a way to open a
terminal/SSH for this app. Run, in order:

```bash
npm install
npx prisma migrate deploy
npm run db:seed
npm run build
```

- `npm install` also triggers `prisma generate` automatically (via the
  `postinstall` script) — no separate step needed.
- `prisma migrate deploy` creates `dev.db` and applies the schema.
- `db:seed` loads the 9 universities / 7 programs / 6 blog posts and
  creates your admin account from the env vars above.
- `npm run build` produces the production `.next` build.

---

## 5. Start / restart the app

Back in hPanel's Node.js app screen, click **Restart**. Passenger will run
`node server.js` (the startup file you set in step 2), which listens on the
port Hostinger assigns via `PORT`.

Visit the Application URL — you should see the live site. Try
`/admin/login` and sign in with the `ADMIN_EMAIL`/`ADMIN_PASSWORD` you set.

---

## 6. Point your domain at Hostinger through Cloudflare

Since the domain is registered at Hostinger but you want Cloudflare doing
DNS:

1. **Cloudflare** → Add a site → enter your domain. Cloudflare will scan
   existing DNS records and give you two nameservers
   (e.g. `xxx.ns.cloudflare.com`).
2. **Hostinger** → Domains → your domain → **DNS / Nameservers** → change
   nameservers to the two Cloudflare gave you. (This is the step that
   actually hands DNS control to Cloudflare — do this deliberately, it
   affects email/other records too if you have any on this domain.)
3. Wait for Cloudflare to show the zone as **Active** (can take minutes to
   a few hours).
4. In Cloudflare → **DNS**, add a record pointing at your Hostinger app:
   - If Hostinger gave you an IP for the Node app: an **A** record,
     `@` → that IP.
   - If Hostinger gave you a hostname instead: a **CNAME**, `@` → that
     hostname (use Cloudflare's "CNAME flattening," which it does
     automatically at the root).
   - Add `www` the same way if you want `www.yourdomain.com` to work too.
5. Keep the record **Proxied** (orange cloud) for Cloudflare's CDN/SSL —
   this is the normal setting, and it also hides your origin IP.
6. Cloudflare → **SSL/TLS** → set mode to **Full** (not "Flexible") since
   your Hostinger app should already be reachable over HTTPS — check what
   Hostinger's panel shows for your app's SSL/port setup and match it here.
   If you're unsure, Full is the safer default with Passenger apps.

DNS propagation is usually fast with Cloudflare but can take up to 24h
worst-case.

---

## Things worth knowing about this setup

- **The database is a single SQLite file** (`dev.db` in the app root). It
  persists across restarts, but treat it like real data: **back it up**
  (hPanel File Manager → download the file periodically, or set up a cron
  that copies it somewhere). There's no automatic replication.
- **Uploaded university logos** land in `public/logos/` on the server and
  are served directly from disk — they persist the same way `dev.db` does.
  If you ever redeploy by re-uploading a zip, make sure you don't overwrite
  `public/logos/` or `dev.db` with the old versions from your local machine.
- **Single process, no auto-scaling.** This is fine for the traffic a site
  like this typically gets, but if it ever needs to handle serious load,
  moving to Vercel or a VPS is the next step — the app code doesn't need to
  change for that.
- **Redeploying changes**: upload the new files (again excluding
  `node_modules`, `.next`, `.env`, `dev.db`, `public/logos/` uploads),
  run `npm install && npm run build`, then Restart the app in hPanel.
