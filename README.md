# CLC Barmer — Website (React + Vite + TypeScript)

Website for **CLC Barmer (Career Launcher Classes)** — Navodaya Vidyalaya, Sainik School and
Rashtriya Military School entrance coaching, Shastri Nagar, Barmer, Rajasthan.

## Tech

- React 18 + TypeScript
- Vite 5 (fast dev server, tiny production build)
- React Router 6 (routes: `/` and `/admin`)
- react-helmet-async (per-page SEO meta)
- Plain CSS (`src/styles/index.css`) — no UI framework

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

## Project structure

```
clc-barmer/
├── index.html                 # SEO meta, Open Graph, JSON-LD (schema.org)
├── vercel.json                # SPA rewrites -> /admin works on Vercel
├── public/
│   ├── img/                   # logo, posters, campus photo
│   ├── pdf/                   # study-material PDFs
│   ├── robots.txt             # disallows /admin
│   └── sitemap.xml
└── src/
    ├── main.tsx               # React root (Router + Helmet providers)
    ├── App.tsx                # routes
    ├── data/site.ts           # ALL content + institute details (edit here)
    ├── i18n/LangContext.tsx   # Hindi / English toggle
    ├── lib/links.ts           # WhatsApp / tel / maps helpers
    ├── hooks/                 # reveal, typewriter, scroll progress, active section
    ├── components/            # Header, Hero, Results, StudyMaterial, ... (16 files)
    ├── pages/
    │   ├── HomePage.tsx       # public website
    │   └── AdminPage.tsx      # /admin  (Welcome Admin)
    └── styles/index.css
```

## Editing content

Almost everything lives in **`src/data/site.ts`**:

- `CONFIG` — phone, WhatsApp number, map coordinates, social links, site URL
- `COURSES`, `EXAMS`, `RESULTS`, `MATERIAL`, `FAQ`, `HERO`, `MARQUEE`, `NAV`

Replace photos in `public/img/` and PDFs in `public/pdf/` (keep the same file names).

## Admin panel

- URL: **`/admin`**
- There is **no link to it anywhere on the public site**.
- `robots.txt` disallows it and the page is `noindex`.
- Currently shows a simple **Welcome Admin** screen; Firebase auth + dashboard can be
  added later.

## Deploy on Vercel

1. Push this repo to GitHub.
2. vercel.com → **Add New → Project → Import** the repo.
3. Framework preset: **Vite** (auto-detected). Build: `npm run build`, output: `dist`.
4. Deploy — you get `https://<project>.vercel.app`.
5. `vercel.json` already rewrites every path to `index.html`, so `/admin` works
   on a direct visit or refresh.

## Custom domain (clcbarmer.com)

Buy the domain (Hostinger, GoDaddy, etc.), then in Vercel:
**Project → Settings → Domains → Add** `clcbarmer.com` and `www.clcbarmer.com`.

Then at your domain registrar (Hostinger):

- **Option A (easiest):** change the domain nameservers to
  `ns1.vercel-dns.com` and `ns2.vercel-dns.com`.
- **Option B (keep Hostinger DNS):** add
  - `A` record, host `@`, value `76.76.21.21`
  - `CNAME` record, host `www`, value `cname.vercel-dns.com`

Wait for DNS to propagate (a few minutes to a few hours). Vercel issues a free SSL
certificate automatically. After that:

- `https://clcbarmer.com` → website
- `https://clcbarmer.com/admin` → admin panel (works, thanks to `vercel.json`)

## SEO checklist (after going live)

1. Update `CONFIG.siteUrl` in `src/data/site.ts` and the URLs in `index.html`,
   `robots.txt` and `sitemap.xml` if the domain changes.
2. Google Search Console → add the domain → submit `https://clcbarmer.com/sitemap.xml`.
3. Create a **Google Business Profile** for "CLC Barmer" (Shastri Nagar, Barmer) — this is
   what makes the institute show up for local searches like *clc coaching barmer*.
4. Add the Instagram / YouTube / Telegram links to the Google Business Profile too.
