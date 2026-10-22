# Checkpoints — CLC Barmer website

Har bade change ke baad ek naya **Checkpoint** banta hai. Kisi bhi purane checkpoint
par wapas jaana ho to:

> **Vercel → aapka project → Deployments → us checkpoint wala commit dhoondhein →
> "..." menu → "Promote to Production"**

Bas itna karne se website us purane version par wapas chali jayegi (data — poster,
PDF, registration — safe rehta hai, wo database me hota hai, code me nahi).

---

## Checkpoint 1 — 22 October 2026
**Commit:** `bf5829e8`

Website ka poora puraana version:
- Hero: typewriter heading + naya subtitle ("नवोदय विद्यालय, सैनिक स्कूल, राष्ट्रीय
  मिलिट्री स्कूल के लिए समर्पित मारवाड़ क्षेत्र का एकमात्र संस्थान।")
- Peeli patti (marquee) me 4 naam — including "अकादमिक कक्षाएँ (कक्षा 3-10 तक)"
- प्रवेश परीक्षाएँ section me 5 card — including "अकादमिक कक्षाएँ - कक्षा 3 से 10 तक"
- परिणाम, मेगा टेस्ट, हमारे बारे में, Admission form, अध्ययन सामग्री, सवाल-जवाब, संपर्क
- Admin panel (`/admin`, password `2026`) — 4 tab: Results, Mega Test, Test Series,
  Study material
- Supabase backend (live updates, photo/PDF upload, roz ka keep-alive)
- **Isme mega test ka online registration nahi hai.**

---

## Checkpoint 2 — 22 October 2026
**Commit:** `76101ac7`

- **Naya:** Mega Test ka online registration + admit card + admin me registrations
  ka tab (neeche detail).
- Website ka domain settings `.com` se **`.in`** kar diye (clcbarmer.in).
- Google Search Console ki verification file **hata di** (aapne kaha tha baad me karenge).

### Isme kya naya hai
1. **Student side** — Mega Test section me "मेगा टेस्ट के लिए रजिस्टर करें" button
   (sirf tab dikhta hai jab registration khula ho). Naya page: **`/mega-test`**
   - Form: नाम, पिता का नाम, कक्षा, स्कूल, वर्ग, जन्म तिथि, लिंग, मोबाइल, पता
   - Ek mobile number se sirf **ek** registration
   - Submit karte hi **Admit Card** — Roll No. `CLCMT2026###`
   - Admit Card par **Print / PDF** ka button (browser se)
2. **Admin** — Mega Test tab me naye controls:
   - Mega test website par dikhana/hatana
   - Registration chal raha hai (checkbox) + **shuru/band ki tarikh-samay** (apne aap khulega/band hoga)
   - Exam ki tarikh, reporting time, exam ka samay, centre ka address, **result ki tarikh**
3. **Admin — naya tab "Registrations"**
   - Kitne register hue (counter)
   - Poori list — roll no, naam, class, mobile
   - Naam / mobile / roll se search
   - **Excel (CSV) download**
   - Kisi entry ki poori detail + delete

### Database (Supabase)
- Naya table `registrations` (RLS on, koi direct access nahi)
- Functions: `mega_register`, `admin_registrations`, `admin_delete_registration`
- Admit card **kahin save nahi hota** — student ke phone par live banta hai (0 storage)
