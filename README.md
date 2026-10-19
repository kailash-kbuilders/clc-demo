# CLC Barmer — Website (React + Vite + TypeScript + Firebase)

Website for **CLC Barmer (Career Launcher Classes)** — Navodaya Vidyalaya, Sainik School and
Rashtriya Military School entrance coaching, Shastri Nagar, Barmer, Rajasthan.

Public site: `/`  •  Admin panel: `/admin` (no link to it anywhere on the public site)

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
├── vercel.json                # SPA rewrite -> /admin works on Vercel
├── firestore.rules            # paste in Firebase console -> Firestore -> Rules
├── storage.rules              # paste in Firebase console -> Storage -> Rules
├── public/
│   ├── img/                   # logo, posters, campus photo
│   ├── pdf/                   # study-material PDFs
│   ├── robots.txt, sitemap.xml
└── src/
    ├── firebase.ts            # <-- PASTE YOUR FIREBASE CONFIG HERE
    ├── data/site.ts           # default content (used until Firebase has data)
    ├── data/content.ts        # Firestore + Storage read/write helpers
    ├── hooks/useSiteContent.ts
    ├── components/            # public site (16 files)
    ├── components/admin/      # AdminLogin, ResultsManager, PosterManager, MaterialManager
    ├── pages/HomePage.tsx, pages/AdminPage.tsx
    └── styles/index.css
```

---

## 3. Firebase setup (one time, ~10 minutes)

The admin panel needs Firebase so that whatever you add shows up **live for everyone**
(not just on your phone).

### 3.1 Create the project
1. Go to <https://console.firebase.google.com> → **Add project** → name it `clc-barmer`.
2. Google Analytics: not needed, you can skip it.

### 3.2 Turn on Authentication
1. Left menu → **Build → Authentication → Get started**.
2. **Sign-in method** tab → **Email/Password** → **Enable** → Save.
3. **No user needed.** There is no login system — the admin password is checked
   right in the code (`ADMIN_PASSWORD_HASH` in `src/components/admin/AdminLogin.tsx`).

### 3.3 Turn on Firestore
1. **Build → Firestore Database → Create database** → **Production mode**.
2. Location: `asia-south1` (Mumbai) is closest for Barmer.
3. Open the **Rules** tab, delete everything and paste the contents of **`firestore.rules`** → **Publish**.

### 3.4 Turn on Storage
1. **Build → Storage → Get started** → **Production mode**.
2. Open the **Rules** tab, paste the contents of **`storage.rules`** → **Publish**.

### 3.5 Get the config and paste it
1. ⚙️ **Project settings → General → Your apps → Web (`</>`)** → register an app
   (nickname `clc-web`), then copy the `firebaseConfig` object.
2. Paste the values into **`src/firebase.ts`** (the marked block near the top).
   You can edit the file directly on GitHub (pencil icon → commit) — no local setup needed.

   *Alternative:* instead of editing the file, add these as Vercel environment variables
   (Project → Settings → Environment Variables) and redeploy:
   `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`,
   `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`.

3. Commit / redeploy. Now open **`/admin`**, enter the password → you are in.

> The Firebase web config is **not a secret** — it is meant to be public. Security is handled
> by the rules above (only the logged-in admin can write).

---

## 4. What the admin panel can do

| Tab | You can |
|---|---|
| **Results** | Upload a photo + student name + number/detail. Delete old ones. |
| **Mega Test** | Upload a new poster + heading + description. |
| **Test Series** | Upload a new poster + heading + description. |
| **Study material** | Add a name + optional subtitle + PDF file. Delete old ones. |

**Login:** open `/admin` and type the password — that is all. No email, no account.

Everything is saved to Firebase, so it appears **instantly on every visitor's phone**.
The password is never written in the code — it lives only in Firebase Authentication.

---

## 5. Deploy on Vercel

1. Push this repo to GitHub.
2. vercel.com → **Add New → Project → Import** the repo.
3. Framework preset **Vite** (auto). Build `npm run build`, output `dist`.
4. Deploy → you get `https://<project>.vercel.app`.

`vercel.json` rewrites every path to `index.html`, so **`/admin` works on a direct visit
and on refresh**.

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
