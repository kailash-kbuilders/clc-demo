import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import { useSiteContent } from '../hooks/useSiteContent'
import { registrationState, registerForMegaTest } from '../data/content'
import type { Registration } from '../data/content'
import { CATEGORY_OPTIONS, CLASS_OPTIONS, GENDER_OPTIONS } from '../data/site'
import AdmitCard from '../components/AdmitCard'
import Seo from '../components/Seo'

const EMPTY = {
  name: '',
  father: '',
  class: '',
  school: '',
  category: '',
  dob: '',
  gender: '',
  mobile: '',
  address: '',
}

export default function MegaTestPage() {
  const { L } = useLang()
  const content = useSiteContent()
  const block = content.megatest
  const state = registrationState(block)

  const [form, setForm] = useState(EMPTY)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [reg, setReg] = useState<Registration | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr('')
    const mobile = form.mobile.replace(/\D/g, '')
    if (form.name.trim().length < 2) return setErr(L(['Please enter the student name.', 'कृपया विद्यार्थी का नाम लिखें।']))
    if (mobile.length !== 10) return setErr(L(['Please enter a 10 digit mobile number.', 'कृपया 10 अंकों का मोबाइल नंबर लिखें।']))

    setBusy(true)
    try {
      const res = await registerForMegaTest({ ...form, mobile })
      setReg({
        ...form,
        mobile,
        id: 0,
        roll_no: res.roll_no,
        created_at: new Date().toISOString(),
      } as Registration)
      window.scrollTo(0, 0)
    } catch (e2) {
      const m = (e2 as Error).message
      if (m.includes('already_registered'))
        setErr(L(['This mobile number is already registered.', 'यह मोबाइल नंबर पहले से रजिस्टर्ड है।']))
      else if (m.includes('registration_not_started'))
        setErr(L(['Registration has not started yet.', 'रजिस्ट्रेशन अभी शुरू नहीं हुआ है।']))
      else if (m.includes('registration_closed'))
        setErr(L(['Registration is closed.', 'रजिस्ट्रेशन बंद हो गया है।']))
      else if (m.includes('mobile_invalid'))
        setErr(L(['Please enter a 10 digit mobile number.', 'कृपया 10 अंकों का मोबाइल नंबर लिखें।']))
      else setErr(L(['Something went wrong. Please try again.', 'कुछ गड़बड़ हो गई। दोबारा कोशिश करें।']) + ' (' + m + ')')
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
        <h1 className="mt-h1">
          {L(['Mega Test — Online registration', 'मेगा टेस्ट — ऑनलाइन रजिस्ट्रेशन'])}
        </h1>
        <p className="mt-sub">{L(block.title)}</p>

        {reg ? (
          <>
            <p className="mt-ok no-print">
              {L([
                'Registration done! Your admit card is below — save it or print it.',
                'रजिस्ट्रेशन हो गया! नीचे आपका एडमिट कार्ड है — इसे सेव कर लें या प्रिंट कर लें।',
              ])}
            </p>
            <div className="mt-btns no-print">
              <button className="btn" type="button" onClick={() => window.print()}>
                {L(['Print / Save as PDF', 'प्रिंट / PDF सेव करें'])}
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
                ? L(['Registration has not started yet.', 'रजिस्ट्रेशन अभी शुरू नहीं हुआ है।'])
                : L(['Registration is closed.', 'रजिस्ट्रेशन बंद हो गया है।'])}
            </b>
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
          <form className="mt-form" onSubmit={submit}>
            <label>
              <span>{L(['Student name', 'विद्यार्थी का नाम'])} *</span>
              <input value={form.name} onChange={set('name')} required />
            </label>
            <label>
              <span>{L(["Father's name", 'पिता का नाम'])}</span>
              <input value={form.father} onChange={set('father')} />
            </label>
            <label>
              <span>{L(['Class', 'कक्षा'])}</span>
              <select value={form.class} onChange={set('class')}>
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
              <span>{L(['School', 'स्कूल'])}</span>
              <input value={form.school} onChange={set('school')} />
            </label>
            <label>
              <span>{L(['Category', 'वर्ग'])}</span>
              <select value={form.category} onChange={set('category')}>
                <option value="">{L(['Select', 'चुनें'])}</option>
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>{L(['Date of birth', 'जन्म तिथि'])}</span>
              <input value={form.dob} onChange={set('dob')} placeholder="DD-MM-YYYY" />
            </label>
            <label>
              <span>{L(['Gender', 'लिंग'])}</span>
              <select value={form.gender} onChange={set('gender')}>
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
            <label className="mt-full">
              <span>{L(['Address', 'पता'])}</span>
              <textarea rows={2} value={form.address} onChange={set('address')} />
            </label>

            {err && <p className="mt-err mt-full">{err}</p>}

            <div className="mt-full mt-btns">
              <button className="btn" type="submit" disabled={busy}>
                {busy
                  ? L(['Registering…', 'रजिस्ट्रेशन हो रहा है…'])
                  : L(['Register', 'रजिस्टर करें'])}
              </button>
            </div>
            <p className="mt-note mt-full">
              {L([
                'After registering you will get your admit card with a roll number.',
                'रजिस्ट्रेशन के बाद आपको रोल नंबर के साथ एडमिट कार्ड मिल जाएगा।',
              ])}
            </p>
          </form>
        )}
      </main>
    </>
  )
}
