# CLC Barmer — Website (React + Vite + TypeScript + Supabase)

Website for **CLC Barmer (Career Launcher Classes)** — Navodaya Vidyalaya, Sainik School and
Rashtriya Military School entrance coaching, Shastri Nagar, Barmer, Rajasthan.

- Public site: `/`
- Admin panel: `/admin` (password `2026`) — **no link to it anywhere on the public site**

---

## 1. Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview
```

## 2. Project structure

```
clc-barmer/
├── index.html                 # SEO meta, Open Graph, JSON-LD (schema.org)
├── vercel.json                # SPA rewrite (/admin) + daily keep-alive cron
├── api/ping.ts                # daily Supabase keep-alive (free plan does not pause)
├── supabase/schema.sql        # database + storage setup (already applied)
├── public/
│   ├── img/                   # logo, posters, campus photo
│   ├── pdf/                   # study-material PDFs
│   └── robots.txt, sitemap.xml
└── src/
    ├── supabase.ts            # Supabase client (URL + publishable key)
    ├── data/site.ts           # default content (shown until the database has data)
    ├── data/content.ts        # read / save content, password check, file upload
    ├── hooks/useSiteContent.ts
    ├── components/            # public site (16 files)
    ├── components/admin/      # AdminLogin, ResultsManager, PosterManager, MaterialManager
    ├── pages/HomePage.tsx, pages/AdminPage.tsx
    └── styles/index.css
```

## 3. Backend (Supabase)

Project: **clc-barmer** (region `ap-south-1`, Mumbai) — free plan, **$0/month**.

Everything is already created; `supabase/schema.sql` is kept only for reference.

| Piece | What it does |
|---|---|
| `site_content` table | One row holding all website content (results, posters, materials) as JSON. **World readable.** |
| `app_config` table | Holds the admin password. RLS is on with **no policies**, so it is unreachable through the API. |
| `admin_check(pass)` | Returns true/false for the password. Used by the admin gate. |
| `admin_save(pass, patch)` | Merges new content — **refuses to write unless the password matches**. Direct writes to `site_content` are blocked by RLS. |
| `media` bucket | Public-read storage for posters, result photos and PDFs. Uploads are limited to jpg/jpeg/png/webp/pdf under 3 MB. |

**How live updates work:** the site subscribes to the `site_content` row over Supabase
Realtime. The moment the admin saves, every visitor's phone updates — no refresh needed.
If the database is ever unreachable, the site falls back to the defaults in
`src/data/site.ts`, so it never looks broken.

### Why the password lives in the database

The admin gate is a single password box — no accounts, no login system. The password is
**not** written in the code; it is checked by the database function `admin_check`.
`vercel.json` runs a tiny daily job (`/api/ping`) that touches the database, so the free
plan never gets paused for inactivity.

> If the password ever needs changing:
> `update public.app_config set value = 'new-password' where key = 'admin_pass';`

## 4. Admin panel

Open **`/admin`** and type the password. Four tabs:

| Tab | You can |
|---|---|
| **Results** | Upload a photo + student name + number/detail. Delete old ones. |
| **Mega Test** | Upload a new poster + heading + description. |
| **Test Series** | Upload a new poster + heading + description. |
| **Study material** | Add a name + optional subtitle + PDF file. Delete old ones. |

Nothing links to `/admin` from the public site, `robots.txt` disallows it, and the page is
`noindex`.

## 5. Deploy on Vercel

1. Push this repo to GitHub.
2. vercel.com → **Add New → Project → Import** the repo.
3. Framework preset **Vite** (auto). Build `npm run build`, output `dist`.
4. Deploy → `https://<project>.vercel.app`.

`vercel.json` rewrites every path to `index.html`, so **`/admin` works on a direct visit
and on refresh**. The `crons` entry keeps Supabase awake.

## 6. Custom domain (clcbarmer.com)

Vercel → **Settings → Domains → Add** `clcbarmer.com` (+ `www`). Then at your registrar:

- **Easiest:** set nameservers to `ns1.vercel-dns.com` and `ns2.vercel-dns.com`.
- **Or keep your DNS:** `A @ → 76.76.21.21` and `CNAME www → cname.vercel-dns.com`.

Vercel issues the free SSL certificate automatically.

## 7. SEO checklist (after going live)

1. Google Search Console → add the domain → submit `https://clcbarmer.com/sitemap.xml`.
2. Create a **Google Business Profile** for "CLC Barmer" (Shastri Nagar, Barmer) — this is
   what makes the institute show up for local searches like *clc coaching barmer*.
3. If the domain changes, update `CONFIG.siteUrl` in `src/data/site.ts` plus the URLs in
   `index.html`, `robots.txt` and `sitemap.xml`.
