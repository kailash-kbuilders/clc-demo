import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import { useSiteContent } from '../hooks/useSiteContent'
import { getAdmitCard, makeSmallPhoto, registrationState, registerForMegaTest } from '../data/content'
import type { Registration } from '../data/content'
import { CATEGORY_OPTIONS, CLASS_OPTIONS, GENDER_OPTIONS } from '../data/site'
import AdmitCard from '../components/AdmitCard'
import { printAdmitCard } from '../lib/download'
import Seo from '../components/Seo'

const DRAFT_KEY = 'clcMegaTestDraft'

const EMPTY = {
  photo: '',
  aadhaar: '',
  address: '',
  block: '',
  thumb: '',
  name: '',
  father: '',
  class: '',
  category: '',
  dob: '',
  gender: '',
  mobile: '',
}

/** 25 October 2026, 9:00 am */
function fmtWhen(iso?: string) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

/** DD/MM/YYYY - slashes are added automatically. */
function fmtDob(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 8)
  if (d.length <= 2) return d
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`
}

export default function MegaTestPage() {
  const { L } = useLang()
  const content = useSiteContent()
  const block = content.megatest
  const state = registrationState(block)

  const [form, setForm] = useState(EMPTY)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [already, setAlready] = useState(false)

  // The phone can reload the page when the camera/gallery opens. Keep a draft so
  // nothing the student typed (or the photo) is lost.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY)
      if (raw) {
        const d = JSON.parse(raw) as Partial<typeof EMPTY>
        setForm((p) => ({ ...p, ...d }))
      }
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(form))
    } catch {
      /* ignore */
    }
  }, [form])
  const [reg, setReg] = useState<Registration | null>(null)
  const [lkName, setLkName] = useState('')
  const [lkMobile, setLkMobile] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const set =
    (k: keyof typeof EMPTY) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: k === 'dob' ? fmtDob(e.target.value) : e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr('')
    setAlready(false)
    const mobile = form.mobile.replace(/\D/g, '')
    if (!form.photo)
      return setErr(L(['Please add the student photo.', 'कृपया विद्यार्थी की फोटो लगाएँ।']))
    const aadhaar = form.aadhaar.replace(/\D/g, '')
    if (aadhaar.length !== 12)
      return setErr(L(['Aadhaar number must be 12 digits.', 'आधार नंबर 12 अंकों का होना चाहिए।']))
    if (!form.address.trim())
      return setErr(L(['Please fill the address.', 'कृपया पता भरें।']))
    if (!form.block.trim())
      return setErr(L(['Please fill the block.', 'कृपया ब्लॉक भरें।']))
    if (!form.father.trim() || !form.class || !form.category || !form.dob || !form.gender)
      return setErr(
        L(['Please fill every field.', 'कृपया सभी जानकारी भरें।']),
      )
    if (form.name.trim().length < 2)
      return setErr(L(['Please enter the student name.', 'कृपया विद्यार्थी का नाम लिखें।']))
    if (mobile.length !== 10)
      return setErr(L(['Please enter a 10 digit mobile number.', 'कृपया 10 अंकों का मोबाइल नंबर लिखें।']))

    setBusy(true)
    try {
      const res = await registerForMegaTest({ ...form, mobile, aadhaar })
      setReg({ ...form, mobile, school: null, id: 0, roll_no: res.roll_no, created_at: new Date().toISOString() } as unknown as Registration)
      try {
        sessionStorage.removeItem(DRAFT_KEY)
      } catch {
        /* ignore */
      }
      window.scrollTo(0, 0)
    } catch (e2) {
      const m = (e2 as Error).message
      if (m.includes('photo_required') || m.includes('photo_invalid') || m.includes('photo_too_big')) {
        setErr(L(['Please add the student photo.', 'कृपया विद्यार्थी की फोटो लगाएँ।']))
      } else if (m.includes('already_registered')) {
        setAlready(true)
        setErr(
          L([
            'This student is already registered.',
            'यह विद्यार्थी पहले से रजिस्टर्ड है।',
          ]),
        )
      } else if (m.includes('aadhaar_used'))
        setErr(
          L([
            'This Aadhaar number is already registered.',
            'यह आधार नंबर पहले से रजिस्टर्ड है।',
          ]),
        )
      else if (m.includes('aadhaar_invalid'))
        setErr(L(['Aadhaar number must be 12 digits.', 'आधार नंबर 12 अंकों का होना चाहिए।']))
      else if (m.includes('_required'))
        setErr(L(['Please fill every field.', 'कृपया सभी जानकारी भरें।']))
      else if (m.includes('duplicate_student'))
        setErr(
          L([
            'A student with the same name, date of birth and father\'s name is already registered.',
            'इसी नाम, जन्म तिथि और पिता के नाम वाला विद्यार्थी पहले से रजिस्टर्ड है।',
          ]),
        )
      else if (m.includes('mobile_used'))
        setErr(
          L([
            'This mobile number is already used for another registration. One mobile number can be used only once.',
            'यह मोबाइल नंबर पहले ही किसी और रजिस्ट्रेशन में इस्तेमाल हो चुका है। एक मोबाइल नंबर से सिर्फ एक ही रजिस्ट्रेशन हो सकता है।',
          ]),
        )
      else if (m.includes('registration_not_started'))
        setErr(L(['Registration has not started yet.', 'रजिस्ट्रेशन अभी शुरू नहीं हुआ है।']))
      else if (m.includes('registration_closed'))
        setErr(L(['Registration is closed.', 'रजिस्ट्रेशन बंद हो गया है।']))
      else setErr(L(['Something went wrong. Please try again.', 'कुछ गड़बड़ हो गई। दोबारा कोशिश करें।']))
    } finally {
      setBusy(false)
    }
  }

  const getCard = async (mobile = form.mobile, name = form.name) => {
    setErr('')
    setBusy(true)
    try {
      const r = await getAdmitCard(mobile, name)
      setReg(r)
      setAlready(false)
      window.scrollTo(0, 0)
    } catch {
      setErr(L(['Admit card not found. Please check the name and mobile number.', 'एडमिट कार्ड नहीं मिला। नाम और मोबाइल नंबर जाँच लें।']))
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <Seo
        title={L(['Mega Test registration — CLC Barmer', 'मेगा टेस्ट रजिस्ट्रेशन — CLC बाड़मेर'])}
        description={L([
          'Register online for the District Level Mega Test by CLC Barmer and download your admit card.',
          'CLC बाड़मेर के जिला स्तरीय मेगा टेस्ट के लिए ऑनलाइन रजिस्ट्रेशन करें और एडमिट कार्ड पाएं।',
        ])}
      />
      <header className="mt-top no-print">
        <div className="w mt-topin">
          <Link to="/" className="mt-back">
            &larr; {L(['Website', 'वेबसाइट'])}
          </Link>
          <b>CLC Barmer</b>
          <span className="mt-sp" />
        </div>
      </header>

      <main className="mt-wrap">
        {reg ? (
          <>
            <h1 className="mt-h1">{L(['Your admit card', 'आपका एडमिट कार्ड'])}</h1>
            <p className="mt-ok no-print">
              {L([
                'Save this admit card or print it. You can open it again any time with the same name and mobile number.',
                'इस एडमिट कार्ड को सेव या प्रिंट कर लें। उसी नाम और मोबाइल नंबर से आप इसे दोबारा खोल सकते हैं।',
              ])}
            </p>
            <div className="mt-btns no-print">
              <button className="btn" type="button" onClick={() => printAdmitCard(reg.roll_no)}>
                {L(['Download admit card (PDF)', 'एडमिट कार्ड डाउनलोड करें (PDF)'])}
              </button>
              <Link className="btn ghost" to="/">
                {L(['Back to website', 'वेबसाइट पर वापस'])}
              </Link>
            </div>
            <AdmitCard reg={reg} block={block} />
          </>
        ) : state !== 'open' ? (
          <div className="mt-closed">
            <b>
              {state === 'notyet'
                ? block.regFrom
                  ? L([
                      'Registration starts on ' + fmtWhen(block.regFrom),
                      'रजिस्ट्रेशन ' + fmtWhen(block.regFrom) + ' से शुरू होगा',
                    ])
                  : L(['Registration has not started yet.', 'रजिस्ट्रेशन अभी शुरू नहीं हुआ है।'])
                : L(['Registration is closed.', 'रजिस्ट्रेशन बंद हो गया है।'])}
            </b>

            <div className="mt-lookup">
              <h3>
                {L([
                  'Already registered? Get your admit card',
                  'पहले से रजिस्टर्ड हैं? अपना एडमिट कार्ड लें',
                ])}
              </h3>
              <label>
                <span>{L(['Student name', 'विद्यार्थी का नाम'])}</span>
                <input value={lkName} onChange={(e) => setLkName(e.target.value)} />
              </label>
              <label>
                <span>{L(['Mobile number', 'मोबाइल नंबर'])}</span>
                <input
                  value={lkMobile}
                  onChange={(e) => setLkMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  inputMode="numeric"
                />
              </label>
              {err && <p className="mt-err">{err}</p>}
              <button
                className="btn"
                type="button"
                disabled={busy}
                onClick={() => void getCard(lkMobile, lkName)}
              >
                {busy
                  ? L(['Please wait…', 'रुकें…'])
                  : L(['Download admit card', 'एडमिट कार्ड डाउनलोड करें'])}
              </button>
            </div>

            <p>
              {L([
                'For any information please contact us on WhatsApp.',
                'किसी भी जानकारी के लिए WhatsApp पर संपर्क करें।',
              ])}
            </p>
            <Link className="btn ghost" to="/">
              {L(['Back to website', 'वेबसाइट पर वापस'])}
            </Link>
          </div>
        ) : (
          <>
            <h1 className="mt-h1">
              {L(['Mega Test — Online registration', 'मेगा टेस्ट — ऑनलाइन रजिस्ट्रेशन'])}
            </h1>
            <p className="mt-sub">{L(block.title)}</p>

            <form className="mt-form" onSubmit={submit}>
              <div className="mt-full mt-photo">
                <span className="adm-lbl">{L(['Student photo', 'विद्यार्थी की फोटो'])} *</span>
                <div className="mt-photorow">
                  {form.photo ? (
                    <img className="mt-photoprev" src={form.photo} alt="" />
                  ) : (
                    <div className="mt-photoprev mt-photoprev-empty">
                      {L(['Photo', 'फोटो'])}
                    </div>
                  )}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0]
                        if (!f) return
                        void makeSmallPhoto(f)
                          .then((d) => setForm((p) => ({ ...p, photo: d.photo, thumb: d.thumb })))
                          .catch(() =>
                            setErr(
                              L([
                                'That photo could not be read. Please try another one.',
                                'यह फोटो पढ़ी नहीं जा सकी। दूसरी फोटो चुनें।',
                              ]),
                            ),
                          )
                      }}
                    />
                    <p className="mt-note">
                      {L([
                        'A clear face photo. It will be printed on the admit card.',
                        'साफ चेहरे वाली फोटो। यह एडमिट कार्ड पर छपेगी।',
                      ])}
                    </p>
                  </div>
                </div>
              </div>



              <label>
                <span>{L(['Student name', 'विद्यार्थी का नाम'])} *</span>
                <input value={form.name} onChange={set('name')} required />
              </label>
              <label>
                <span>{L(["Father's name", 'पिता का नाम'])} *</span>
                <input value={form.father} onChange={set('father')} required />
              </label>
              <label>
                <span>{L(['Class', 'कक्षा'])} *</span>
                <select value={form.class} onChange={set('class')} required>
                  <option value="">{L(['Select', 'चुनें'])}</option>
                  {CLASS_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </label>
              <label>
                <span>{L(['Category', 'वर्ग'])} *</span>
                <select value={form.category} onChange={set('category')} required>
                  <option value="">{L(['Select', 'चुनें'])}</option>
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>{L(['Date of birth', 'जन्म तिथि'])} *</span>
                <input
                  value={form.dob}
                  onChange={set('dob')}
                  inputMode="numeric"
                  placeholder="DD/MM/YYYY"
                  required
                />
              </label>
              <label>
                <span>{L(['Gender', 'लिंग'])} *</span>
                <select value={form.gender} onChange={set('gender')} required>
                  <option value="">{L(['Select', 'चुनें'])}</option>
                  {GENDER_OPTIONS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>{L(['Mobile number', 'मोबाइल नंबर'])} *</span>
                <input
                  value={form.mobile}
                  onChange={set('mobile')}
                  inputMode="numeric"
                  maxLength={10}
                  required
                />
              </label>
              <label>
                <span>{L(['Aadhaar number', 'आधार नंबर'])} *</span>
                <input
                  value={form.aadhaar}
                  onChange={set('aadhaar')}
                  inputMode="numeric"
                  maxLength={12}
                  placeholder="12 अंक"
                  required
                />
              </label>
              <label className="mt-full">
                <span>{L(['Address', 'पता'])} *</span>
                <input value={form.address} onChange={set('address')} required />
              </label>
              <label>
                <span>{L(['Block', 'ब्लॉक'])} *</span>
                <input value={form.block} onChange={set('block')} required />
              </label>

              {err && <p className="mt-err mt-full">{err}</p>}

              {already && (
                <div className="mt-full">
                  <button className="btn admit-btn" type="button" onClick={() => void getCard()} disabled={busy}>
                    {busy
                      ? L(['Please wait…', 'रुकें…'])
                      : L(['Click to download admit card', 'एडमिट कार्ड डाउनलोड करने के लिए दबाएं'])}
                  </button>
                </div>
              )}

              <div className="mt-full mt-btns">
                <button className="btn" type="submit" disabled={busy}>
                  {busy
                    ? L(['Registering…', 'रजिस्ट्रेशन हो रहा है…'])
                    : L(['Register', 'रजिस्टर करें'])}
                </button>
              </div>
              <p className="mt-note mt-full">
                {L([
                  'After registering you will get your admit card with a roll number. One mobile number can be used for only one registration.',
                  'रजिस्ट्रेशन के बाद आपको रोल नंबर के साथ एडमिट कार्ड मिल जाएगा। एक मोबाइल नंबर से सिर्फ एक ही रजिस्ट्रेशन हो सकता है।',
                ])}
              </p>
            </form>
          </>
        )}
      </main>
    </>
  )
}
