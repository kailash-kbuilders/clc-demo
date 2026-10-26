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
**Commit:** `63e495a5`

- **Doosra poster bhi laga diya** — RMS + छात्रावास + परिणाम wala poora poster,
  "छात्रावास" section me banner ke neeche, poori chaudai me.
- Tap karne par zoom ho jata hai (mobile par padhne ke liye), neeche caption bhi hai.
- Image: `public/img/clc-info-poster.jpg` (242 KB).

---

## Checkpoint 17 — 25 October 2026
**Commit:** `2a1b01d0`

- "छात्रावास" section se **neeche wala poster hata diya** (aapne kaha).
  Ab sirf **hostel banner** + suvidhaon ki list + WhatsApp button hai.
- Image `public/img/clc-info-poster.jpg` repo se delete kar di.

---

## Checkpoint 18 — 26 October 2026
**Commit:** `aae2f065`

1. **Mega Test section ab number 01** — hero ke theek baad, sabse upar. (Pehle 02 par tha.)
   Ab: 01 मेगा टेस्ट → 02 प्रवेश परीक्षाएँ → 03 परिणाम → 04 हमारे बारे में → 05 छात्रावास.
2. **Stylish font wapas** — asli wajah: Google Fonts load nahi ho raha tha, isliye normal font
   dikh raha tha. Ab **fonts website me hi save** hain (`public/fonts/`, 20 file, 1.1 MB) —
   koi bahar ki dependency nahi, hamesha load honge. Headings phir **Yatra One** me.
3. **Admin list mobile par fix** — panel ka padding kam kiya, tabs 2 column, aur har row me
   **photo + naam upar, roll/class/mobile neeche** — kuch bhi adha nahi katta. 390px screen
   par test kiya.
4. **Result ki tarikh ka field admin se hata diya** — admit card par ab bina tarikh bhi
   saaf likha aata hai: "Result will be published on our website and WhatsApp group."

---

## Checkpoint 19 — 26 October 2026
**Commit:** `fc21dd39`

- **Document (Navodaya form) upload hata diya** — form me ab sirf **photo** hai (jo zaroori hai),
  uske baad naam, pita ka naam, class, category, DOB, gender, mobile.
- Form ab chhota aur saaf hai. Registration sirf photo par chalta hai.

---

## Checkpoint 20 — 26 October 2026
**Commit:** `6af47868`

- **Admit card ka mobile par kat jana theek ho gaya.**
  - Asli wajah: CSS me ek purana global rule tha — `table{min-width:520px}` — jo **har table
    ko kam se kam 520px** chauda banata tha. Isliye phone par values kat jati thi.
  - Fix: admit card aur admin ki tables par `min-width:0` + `table-layout:fixed` +
    `overflow-wrap:anywhere`.
  - Chhoti screen par padding/font bhi thoda kam kiya.
- **Test kiya:** 390px screen par (aur 20px bade font ke saath bhi) — card 351px,
  table 315px, page par koi horizontal scroll nahi, **koi value nahi katti**.
- Print/PDF pehle jaisa hi sahi hai (wahan alag settings hain).

---

## Checkpoint 21 — 26 October 2026
**Commit:** `18ee5c5f`

- **Admin me admit card ab chhota "preview"** dikhta hai (zoom 0.8 desktop, 0.58 mobile) —
  poora card panel me fit ho jata hai, kuch nahi katta, aur padhne layak rehta hai.
- Download / print par koi asar nahi — PDF poore size me hi banta hai.
- Test kiya 390px par: card 326px, page par koi side-scroll nahi.

---

## Checkpoint 22 — 26 October 2026
**Commit:** `942bda11`

- **Admin ka admit card preview ab bilkul download jaisa** dikhta hai:
  - **Do column** layout (STUDENT DETAILS | PHOTO & RESULT) — pehle mobile par ek column
    ho jata tha, isliye bahut lamba lagta tha
  - Wahi paddings, wahi font sizes, wahi header/banner
  - Phir poora card **zoom** hokar panel me fit hota hai (mobile 0.66, desktop 0.82)
- Card ki height **~773px** (pehle 1400+ thi) — aadha ho gaya, aur type bhi bada/readable hai.
- Print/PDF par koi asar nahi.

---

## Checkpoint 23 — 26 October 2026
**Commit:** `9d95a779`

- Admin ke admit card preview ka **zoom aur chhota** kiya — mobile **0.52**, desktop **0.74**.
- Card ki height **556px** (pehle 773, uske pehle 1400+) — ab ek nazar me poora dikh jata hai.
- Do column layout wahi — bilkul download jaisa. Print/PDF par koi asar nahi.

---

## Checkpoint 24 — 26 October 2026
**Commit:** `4ac94c26`

- Admin ka admit card preview ab ek **scroll box** me hai:
  - Box ka size mobile par **326 x 430** — "square se thoda lamba" (1:1.32)
  - Andar card **bada** hai (zoom 0.62) — padhne layak
  - Neeche hint: "Poora card dekhne ke liye andar scroll karein"
- Matlab panel lamba nahi hota, aur card bhi bada/readable rehta hai.
- Desktop par box 560px tak.
- Print/PDF par koi asar nahi.

---

## Checkpoint 25 — 26 October 2026
**Commit:** `a71d936c`

- **Admin preview ab fix hai** — pehle andar scroll tha, isliye card hilta rehta tha ("upar niche").
  Ab scroll hata diya: poora card box ke andar **fit** ho jata hai aur **ek jagah tikta hai**.
  - Box: mobile **326 x 430**, card: **312 x 409** — poora andar, kuch nahi katta
  - Zoom: mobile **0.38**, desktop **0.5** (desktop box 560px)
  - Neeche hint: "Preview — poora card dekhne ke liye Download dabayein"
- Print/PDF par koi asar nahi — download poore size me.

---

## Checkpoint 26 — 26 October 2026
**Commit:** `3e3090b0`

- **Frame hata diya** — admin me admit card ab seedha dikhta hai (koi box nahi, koi scroll nahi,
  koi fixed height nahi). Card **326 x 556** — ek jagah tikta hai, hilta nahi.
- Zoom: mobile 0.52, desktop 0.7. Do column layout wahi (download jaisa).
- Neeche hint: "Preview — poora card dekhne ke liye Download dabayein".

---

## Checkpoint 27 — 26 October 2026
**Commit:** `f1e4642d`

1. **Mega Test section ke dono buttons barabar** — "मेगा टेस्ट के लिए रजिस्टर करें" aur
   "मेगा टेस्ट के बारे में पूछें" (WhatsApp) — dono ab **299px**, poore card ki chaudai.
2. **Hero ke 4 buttons bhi barabar** — pehle 2 poore chaudai aur 2 aadhe the. Ab chaaron
   **167x60** — ek jaise (2x2 grid mobile par, 4 ek line me desktop par).
3. **Form bharte waqt photo chunne par page refresh hone se data nahi jayega** —
   form ab **sessionStorage** me draft save karta hai. Page reload ho jaye to bhi naam,
   pita, class, DOB, mobile aur **photo** — sab wapas aa jate hain.
4. **"Already registered" wale button ka rang alag** — "Click to download admit card" ab
   **gold** rang ka hai (baaki navy), taaki alag se dikhe.
5. **Form ke saare buttons ek jaise** — poore chaudai, min-height 52px.

---

## Checkpoint 28 — 26 October 2026
**Commit:** `ff1339cb`

- **Hero ke 4 buttons wapas pehle jaise** (aapne kaha) — mobile par "ऑनलाइन रजिस्ट्रेशन" aur
  "WhatsApp पर पूछें" poore chaudai (upar), aur "अभी कॉल करें" + "YouTube पर देखें" aadhe-aadhe
  neeche. Baaki sab (Mega Test section ke buttons barabar, form draft, gold admit-card button)
  waise hi hain.

---

## Checkpoint 29 — 26 October 2026
**Commit:** `dbb1a02b`

1. **Naye form fields** — **आधार नंबर** (12 अंक), **पता**, **ब्लॉक**.
   **Sabhi fields ab zaroori** hain — aadha, bhara hua form submit nahi hoga.
   Server bhi check karta hai (bina Aadhaar/address/block ke registration nahi hoti).
2. **Roll number ab `2021123` se shuru** — 2021123, 2021124, ... (delete hone par number
   wapas free ho jata hai). Purane do test registration (CLCMT...) waise hi hain — admin se
   delete kar sakte hain.
3. **Aadhaar duplicate rok** — ek Aadhaar se sirf ek registration.
4. **Admit card par naya row — "Exam Time: सुबह 11:30 से 1:30 तक"**.
5. **Naya centre — "महाराजा पब्लिक स्कूल, शिव नगर, बाड़मेर"** (DB me bhi set kar diya).
6. **Admin → Mega Test** me naya field: "Exam ka samay" (badal sakte hain).
7. **Admin → Registrations** ki details me ab Aadhaar, Address, Block bhi dikhte hain.
8. PDF abhi bhi **1 page** — check kiya.

---

## Checkpoint 30 — 26 October 2026
**Commit:** `504d52bb`

1. **Admit card par details na aane ki asli wajah mili** — database me kuch fields **khaali
   (null)** the, aur khaali value default ko **dhak deti thi**. Ab khaali value ignore hoti hai
   (`mergeBlock`), isliye default dikhta hai.
2. **Exam Date** add — admin me field + admit card par row. Default: **15 नवंबर, 2026 रविवार**
3. **Exam Time** — **सुबह 11:30 से 1:30 तक** (DB me bhi set)
4. **Centre** — **महाराजा पब्लिक स्कूल, शिव नगर, बाड़मेर**
5. **Poster ab kabhi nahi katta** — `.sch img` se fixed `aspect-ratio` + `object-fit:cover`
   hata diya. Ab frame poster ke apne size ke hisaab se hota hai, poora poster dikhta hai.
6. **Photo kholne par piche website scroll nahi hoti** — lightbox khulte hi page ka scroll
   lock ho jata hai (`useLockBodyScroll`), aur `overscroll-behavior:contain`.
7. **Result ki tarikh poori tarah gayi** — card par ab sirf: "Result will be published on our
   website and WhatsApp group." (koi tarikh nahi)
8. PDF **1 page** — check kiya.

---

## Checkpoint 31 — 26 October 2026
**Commit:** `0e305ee9`

1. **User side ka admit card preview ab A4 jaisa** — do column, aur size **358 x 505**
   (ratio **1:1.41 = A4**). Bilkul waisa hi jaisa PDF banta hai. (Pehle ek column me khul kar
   bahut lamba ho jata tha.)
2. **Upar ke 2 buttons barabar** — "एडमिट कार्ड डाउनलोड करें (PDF)" aur "वेबसाइट पर वापस" —
   dono **174px** (aadhe-aadhe).
3. **Photo kholne par piche website scroll — asli fix** — pehle sirf `<body>` lock hota tha,
   par kuch phones me page `<html>` par scroll hota hai. Ab **dono** lock hote hain +
   `overscroll-behavior:none`. Aur `/mega-test` page par bhi **Lightbox** add kar diya
   (pehle wahan tha hi nahi).
4. PDF abhi bhi 1 page.

---

## Checkpoint 32 — 26 October 2026
**Commit:** `e6a00694`

1. **Admin ka admit card preview ab bilkul user wale jaisa** — dono jagah ek hi style
   (`.acfit`): do column, A4 jaisa, poora card ek nazar me. Admin ki purani alag settings hata di.
2. **Admit card par ab Aadhaar, Address aur Block bhi** — student details me Mobile ke baad.
   (Yahi "details" nahi aa rahi thin.)
3. PDF **1 page** — check kiya.
4. **Note:** purane 2 test registrations me Aadhaar/Address/Block khaali hain (wo naye fields
   hain), isliye unke card par ye rows nahi dikhengi. Naye registration par dikhengi.

---

## Checkpoint 33 — 26 October 2026
**Commit:** `6908286f`

- **PDF bahut chhota kyun ban raha tha** — jo **zoom** screen par card ko chhota dikhane ke liye
  lagaya tha (0.45), wo **print me bhi lag jata tha**. Isliye PDF me card 25% size me chhapta tha
  aur details padhi hi nahi jati thin.
  - **Fix:** print me `#admit-card` aur `.acfit` ka zoom **1** kar diya (`!important`).
  - Print me do column bhi force kiya.
- **Paper size ab A4** — `@page{size:A4 portrait;margin:8mm}` ko `@media print` ke bahar
  (top level) rakha. Pehle dialog me "Letter" aa raha tha.
- **Test:** PDF 1 page, page size **595x842pt = A4**, card **89% width** bharta hai
  (pehle ~25%). Details poori padhi ja sakti hain.
- **Note:** "Block" row khaali thi kyunki us test registration me block bhara nahi tha
  (wo field uske baad add hua). Naye registration me aayegi.

---

## Checkpoint 34 — 26 October 2026
**Commit:** `873f4e7a`

- **PDF me colour nahi aa rahe the** — browser default me **background graphics print nahi karta**.
  Isliye navy banner/headers/footer safed chhapte the aur unke upar ka safed text gayab lagta tha.
  - **Fix:** `#admit-card, #admit-card *` par `print-color-adjust: exact !important`
    (`-webkit-` ke saath bhi) — ab colours bilkul preview jaise chhapte hain.
- **Page margin 8mm -> 6mm** — card ab A4 page ko aur poora bharta hai.
- **Test:** PDF render karke dekha — 1 page, A4 (595x842pt), navy banner + headers + footer
  sab sahi, aur saari details (Roll, naam, pita, class, category, DOB, gender, mobile,
  Aadhaar, Address, Block, Exam Date/Time/Centre, 8 instructions) saaf padhi ja rahi hain.

---

## Checkpoint 35 — 26 October 2026
**Commit:** `7c204431`

- **Blank page 2 ka asli karan mil gaya** — page wrapper (`.mt-wrap`) ki **max-width 760px aur
  padding** print me bhi lag rahi thi, isliye content page se thoda bahar nikal kar **khaali
  doosra page** ban jata tha.
  - **Fix:** print me `.mt-wrap`, `.reg-body`, `.adm-panel`, `.admin-panelcard`, `.admin-wide`,
    `.admin` — sabki width/padding/margin/min-height/border reset.
  - Saath me `body *:not(:has(#admit-card))` se baaki poora page print se hata diya
    (display:none), taaki wo jagah na le.
- **Long details ke liye bhi 1 page** — instructions 8.6pt, table 9pt, padding 3px — thodi jagah
  bachi rehti hai, isliye lambi address/naam hone par bhi 1 hi page aata hai.
- **Test:** lambi address + lambe naam ke saath PDF banaya — **1 page**, A4 (595x842pt),
  content y 17-779 (page 842) — sab andar, colours sahi, kuch nahi katta.

---

## Checkpoint 36 — 26 October 2026
**Commit:** `56a454b6`

1. **Student details ke baad ki khaali jagah gayi** — `.ac-grid` me dono box ab **barabar height**
   ke hain (`align-items:stretch`), aur table ki rows poore box me **barabar fail** jati hain.
   Ab STUDENT DETAILS box, PHOTO & RESULT box ke saath hi khatam hota hai — beech me safed jagah
   nahi.
2. **"इस तारीख को" wala purana text hata diya** — Hindi line me tarikh ka zikr reh gaya tha
   (jabki date hata di thi). Ab: "परिणाम हमारी वेबसाइट और WhatsApp ग्रुप पर देखें।"
3. PDF **1 page**, colours sahi — check kiya.

---

## Checkpoint 37 — 26 October 2026
**Commit:** `465fa3b2`

- **Naya: "List PDF" button** (admin → Registrations, Refresh ke bagal me).
  - Sabhi registrations ki **table wali PDF** banti hai — **direct download** (koi print
    preview dialog nahi khulta).
  - Columns: **क्र.स. | Roll No. | Name | Father's Name | Class | Mobile | Aadhaar | Address**
  - Upar header: CLC Barmer, address, "Mega Test Registrations", tarikh, total
  - Har page par table header dobara + neeche "Page 1 / 2"
  - Har page par 24 rows, A4
  - Data **registered records se hi** banti hai (kuch save nahi hota).
- **Hindi sahi chhapta hai** — PDF HTML ko render karke banti hai (`html2canvas` + `jspdf`),
  isliye Devanagari theek banta hai (jsPDF ka font shaping nahi use hota).
- Naye packages: `jspdf`, `html2canvas` — **lazy load** hote hain (sirf button dabane par),
  isliye website slow nahi hoti.
- **Test:** 25 rows ki test PDF banayi — 2 pages, A4, header navy + safed text,
  Hindi naam/address sahi, 560 KB.

---

## Checkpoint 38 — 26 October 2026
**Commit:** `afd290be`

- **Navigation ka kram theek kiya** (EN toggle ke paas wala / mobile drawer).
  Pehle nav purane order me tha, jabki page ka order badal chuka tha. Ab dono ek jaise hain:
  1. मेगा टेस्ट  2. प्रवेश परीक्षा  3. परिणाम  4. हमारे बारे में
  5. छात्रावास  6. अध्ययन सामग्री  7. सवाल-जवाब  8. संपर्क
- Drawer render karke check kiya — kram sahi aa raha hai.

---

## Checkpoint 39 — 26 October 2026
**Commit:** `bb708913`

- **Mega Test section ke buttons** ("मेगा टेस्ट के लिए रजिस्टर करें" aur WhatsApp) —
  **purane size par hain** (poori chaudai wale override hata diye gaye the).
  Poster ke neeche wale buttons ab wahi size ke hain jo pehle the.
- **Gum hui cheez wapas** — "already registered" wale **gold** button ka style aur form ke
  buttons ki sizing (Checkpoint 32 me CSS ka ek block hatate waqt ye bhi saath chala gaya tha).
  Ab wapas daal diya.

---

## Checkpoint 40 — 26 October 2026
**Commit:** `09220aa3`

- **Mega Test section ke dono buttons ab bilkul barabar** — "मेगा टेस्ट के लिए रजिस्टर करें"
  aur "मेगा टेस्ट के बारे में पूछें" — dono **299 x 44** (max-width 300px, poori chaudai nahi).
  Pehle dono apne text ke hisaab se alag-alag chaudai ke the.
- Poster **poora** dikhta hai (kata nahi) — check kiya.
