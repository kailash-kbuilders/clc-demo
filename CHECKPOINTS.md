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

---

## Checkpoint 3 — 22 October 2026
**Commit:** `f29f74df`

Admit card aur admin ko aapke kehne ke hisaab se theek kiya:

**Admit card**
- Ab **ek hi page** me chhapta hai (A4)
- Header pill se "Other Govt. Exams" hata diya
- Form/card se **School aur Address hata diye**
- Exam Details me **sirf Test Centre** (EXAM FOR list hata di)
- RESULT box: "Result will be published on our **website and WhatsApp group** on [tarikh]"
- Date of birth **DD/MM/YYYY** — slash apne aap lagte hain

**Roll number**
- Ab **4 digit**, `CLCMT1001` se shuru

**Registration rules**
- Ek hi naam + ek hi mobile se dobara registration nahi
- Ek mobile number se **zyada se zyada 2** registration (bhai-behen ke liye)
- Pehle se registered ho to page par likha aata hai + **"Click to download admit card"** button

**Website**
- Section order: 01 प्रवेश परीक्षाएँ, **02 मेगा टेस्ट**, **03 परिणाम**, 04 हमारे बारे में…
- Poster se **download button hata diya**
- Registration band hone par poster **fade** ho jata hai + **✗ REGISTRATION CLOSED** banner

**Admin**
- Dark mode me text dikh nahi raha tha — **theek kar diya**
- Registration status ab **2 button**: "Registration चालू" / "Registration बंद" (checkbox nahi)
- Schedule alag collapsible box me (optional)
- Sirf 2 field: Test centre ka naam + Result ki tarikh

---

## Checkpoint 4 — 22 October 2026
**Commit:** `740b6e9d`

- Registration **band/schedule** hone par page par likha aata hai — "Registration starts on
  [tarikh]" ya "Registration is closed", aur saath me **"Already registered? Get your admit
  card"** box (naam + mobile daal kar apna admit card dobara nikaal sakte hain)
- **Roll number reuse:** koi registration delete karne par uska roll number **fir se free**
  ho jata hai aur agli registration ko wahi milta hai (1001 se shuru, sabse chhota khaali number)
- **Admin — Registrations tab:** har registration **1 line** me (roll, naam, class, mobile),
  har line par **"Admit card"** button (uska admit card khulta hai + Print/PDF) aur **Delete**
- Admin se **CSV download hata diya**

---

## Checkpoint 5 — 22 October 2026
**Commit:** `3f730ccd`

- Admit card ki **PDF ka naam** ab student ke roll number se banta hai — jaise
  `CLC-MT-admit1001.pdf` (student ke page par aur admin ke "Admit card" button par dono jagah)
- Roll number khaali table par **1001 se** shuru hota hai (pehle se hi aisa tha, confirm kar liya)

---

## Checkpoint 6 — 22 October 2026
**Commit:** `f58288cc`

- **Student photo** registration me (zaroori). Photo browser me hi chhoti ho jati hai (~20-30 KB)
  aur **database me** rakhi jati hai — **file storage me 0 byte**.
- Photo **private** hai: sirf student ka apna admit card aur admin (password se) dekh sakta hai.
- Admit card par photo **upar-daayen** lagti hai, uske neeche RESULT box.
- Admit card abhi bhi **1 page** me chhapta hai (PDF banakar check kiya).
- Admin ki list halki rehti hai (photo list me nahi aati; "Admit card" dabane par alag se aati hai).
- **Document upload nahi** kiya (aapne kaha nahi chahiye).

---

## Checkpoint 7 — 22 October 2026
**Commit:** `02654a44`

- **1 mobile number = sirf 1 registration** (strict). Same naam + same number se dobara
  karne par "already registered" + admit card download ka option; doosre naam se usi
  number par "mobile already used" ka message.
- **Admin list:** har line me chhoti **photo (thumbnail) + naam**, peeche roll/class/mobile.
  Line par click karne se **poori details + us bacha ka admit card** khulta hai (Download PDF ke saath).
- **Thumbnail** (~2-3 KB) list me aata hai, poori photo alag se (list halki rehti hai).
- **Admit card:** photo ab thodi badi (148px), aur **photo ke just neeche** RESULT box
  (kab aur kahan dekhna hai). PDF **1 page** — check kiya.
- Download button ka naam: **"Download admit card (PDF)"**.
- Photo **apne aap compress** hoti hai — kuch karna nahi padta.

---

## Checkpoint 8 — 22 October 2026
**Commit:** `f04f4ce3`

- **Admit card:** photo aur result ab **ek hi box** me ("PHOTO & RESULT") — baaki boxes
  jaisa hi navy header. Alag-alag do box nahi. Abhi bhi **1 page**. Design saaf-suthra.
- **Duplicate rok:** same student **doosre mobile number se bhi** register nahi kar sakta —
  lekin rok sirf tab jab **naam + janm tithi + pita ka naam** teeno match karein.
  - Sirf janm tithi same ho → nahi rokta ✓
  - Sirf naam same ho → nahi rokta ✓
  - Naam + janm tithi + pita ka naam — teeno same → rok deta hai ✓

---

## Checkpoint 9 — 22 October 2026
**Commit:** `84a38dae`

- **Gol photo wali dikkat theek:** admin me ek CSS rule (`admin-card img`) **har photo ko
  gol** bana raha tha (wo sirf login screen ke logo ke liye tha). Isliye admin me poster,
  registration ki thumbnail aur admit card ki photo — sab **gol** dikh rahi thi.
  Ab wo rule sirf login screen par lagta hai, aur admin ke andar har photo apne **asli
  shape** (square/rectangular) me dikhti hai.

---

## Checkpoint 10 — 23 October 2026
**Commit:** `655d015a`

- Google me result ke upar jo **"Vercel"** likha aa raha tha, uske liye:
  - **WebSite structured data** add ki (`name: "CLC Barmer"`) — isse Google apna naam
    "CLC Barmer" dikhata hai, "Vercel" nahi
  - **Asli square favicon** banaya (`favicon.png` + `favicon.ico`, logo se) — pehle JPEG
    logo tha, jo Google kabhi-kabhi nahi uthata
- Meta description se **"Since 2021"** hata diya (aapne pehle kaha tha).

---

## Checkpoint 11 — 24 October 2026
**Commit:** `ce7d6511`

- **Document upload** form me add (photo ke saath). Ab **dono zaroori** hain — photo aur
  **bhara hua Navodaya form** (photo ya PDF). Bina dono ke **form submit nahi hoga**.
- Form ka file **1.5 MB** tak (image ho to browser me chhoti kar di jati hai).
- Document **`documents` bucket** me jaata hai, file ka naam **random** hota hai
  (isliye URL se koi doosre ka document nahi dhoondh sakta).
- **Admin** me har registration ke details me **"Navodaya form: Document dekhein / download"**
  ka link aata hai.
- Photo pehle jaisa hi: database me, private.

---

## Checkpoint 12 — 24 October 2026
**Commit:** `9e05282a`

- **Document ab save nahi hota.** Form me bhara hua Navodaya form maangta hai (aur bina
  diye submit nahi hota — student ke liye anivary), lekin file **kahin upload nahi hoti**.
  **Storage 0 MB.**
- **Purane saare registrations delete** kar diye (aapne kaha). Ab pehli asli registration
  ko `CLCMT1001` milega.
- `documents` bucket ke rules hata diye — bucket khaali aur inert pada hai.
- Admin se "Document dekhein" wala link hata diya.
- **Aage jab chahiye:** save karna sirf 5 minute ka kaam hai — bata dein to on kar dunga.

---

## Checkpoint 13 — 24 October 2026
**Commit:** `2f10c033`

- **301 redirect** laga diya: `clcbarmer.vercel.app` ki koi bhi link ab apne aap
  **`clcbarmer.in`** par bhej deti hai.
- Isse Google ko saaf signal jata hai ki asli pata `.in` hai — aur wo purani
  vercel.app wali entry ko hata kar `.in` dikhane lagta hai.
- (Site ka canonical pehle se `.in` par tha; ab redirect bhi hai.)

---

## Checkpoint 14 — 24 October 2026
**Commit:** `222b99ed`

- Google Search Console ka **verification meta tag** `index.html` me add kiya.
  (DNS wala tareeka kaam nahi kar raha tha kyunki domain ke nameservers **Vercel** ke hain,
  Hostinger ke nahi — isliye Hostinger me daala TXT record live hi nahi tha.)
- Ab Search Console me **URL prefix** property (`https://clcbarmer.in`) HTML tag se verify hogi.

---

## Checkpoint 15 — 25 October 2026
**Commit:** `31d1149e`

- **Naya section: "छात्रावास"** (05) — "हमारे बारे में" ke baad.
  - Hostel ka **banner** (CLC छात्रावास & कोचिंग संस्थान, BOYS & GIRLS) — tap karne par zoom
  - **Suvidhaon ki list** (7): लड़के-लड़कियों के लिए, सुसज्जित व अनुशासित वातावरण, पौष्टिक
    व स्वच्छ भोजन, 24x7 निगरानी, नियमित अध्ययन समय, खेल व योग, घर जैसा माहौल
  - "छात्रावास के बारे में पूछें" WhatsApp button
- **Nav me "छात्रावास"** add kiya.
- Banner ki image `public/img/hostel-banner.jpg` (177 KB, web ke liye chhoti ki).

---

## Checkpoint 16 — 25 October 2026
**Commit:** `__CHECKPOINT_16__`

- **Doosra poster bhi laga diya** — RMS + छात्रावास + परिणाम wala poora poster,
  "छात्रावास" section me banner ke neeche, poori chaudai me.
- Tap karne par zoom ho jata hai (mobile par padhne ke liye), neeche caption bhi hai.
- Image: `public/img/clc-info-poster.jpg` (242 KB).
