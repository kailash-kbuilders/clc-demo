import { useState } from 'react'
import { useLang } from '../i18n/LangContext'
import { CLASS_OPTIONS, COURSES } from '../data/site'
import { waLink } from '../lib/links'

type Errors = Partial<Record<'fn' | 'fp' | 'fc' | 'fk', string>>

export default function AdmissionForm() {
  const { L } = useLang()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [cls, setCls] = useState('')
  const [course, setCourse] = useState('')
  const [village, setVillage] = useState('')
  const [errors, setErrors] = useState<Errors>({})

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const er: Errors = {}
    if (name.trim().length < 2) er.fn = L(["Enter the student's name.", 'विद्यार्थी का नाम लिखें।'])
    if (!/^[6-9][0-9]{9}$/.test(phone.trim()))
      er.fp = L(['Enter a valid 10-digit mobile number.', 'सही 10 अंकों का मोबाइल नंबर लिखें।'])
    if (!cls) er.fc = L(['Select a class.', 'कक्षा चुनें।'])
    if (!course) er.fk = L(['Select a course.', 'कोर्स चुनें।'])
    setErrors(er)
    const first = (Object.keys(er) as (keyof Errors)[])[0]
    if (first) {
      document.getElementById(first)?.focus()
      return
    }
    const msg =
      `Hello, admission enquiry:\nStudent: ${name.trim()}\nParent mobile: ${phone.trim()}` +
      `\nClass: ${cls}\nCourse: ${course}` +
      (village.trim() ? `\nVillage/city: ${village.trim()}` : '')
    window.open(waLink(msg), '_blank', 'noopener')
  }

  const err = (k: keyof Errors) => (
    <span className="err" data-e={k}>
      {errors[k] || ''}
    </span>
  )

  return (
    <section id="admission">
      <div className="w two">
        <div>
          <h2 className="rv">{L(['Online registration / admission enquiry', 'ऑनलाइन रजिस्ट्रेशन / एडमिशन पूछताछ'])}</h2>
          <p className="sub">
            {L([
              'Fill the form and tap "Send on WhatsApp". Your message opens directly in the institute WhatsApp.',
              'फॉर्म भरें और "WhatsApp पर भेजें" दबाएँ। आपका संदेश सीधे संस्थान के WhatsApp पर खुलेगा।',
            ])}
          </p>
        </div>

        <form id="enq" className="card rv" onSubmit={submit} noValidate>
          <label>
            <span>{L(['Student name', 'विद्यार्थी का नाम'])}</span>
            <input
              id="fn"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={!!errors.fn}
            />
            {err('fn')}
          </label>

          <label>
            <span>{L(['Parent / guardian mobile number', 'अभिभावक का मोबाइल नंबर'])}</span>
            <input
              id="fp"
              inputMode="numeric"
              maxLength={10}
              autoComplete="tel"
              placeholder="10 digits"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-invalid={!!errors.fp}
            />
            {err('fp')}
          </label>

          <label>
            <span>{L(['Class', 'कक्षा'])}</span>
            <select
              id="fc"
              value={cls}
              onChange={(e) => setCls(e.target.value)}
              aria-invalid={!!errors.fc}
            >
              <option value="">{L(['Select', 'चुनें'])}</option>
              {CLASS_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
              <option value="Other">{L(['Other', 'अन्य'])}</option>
            </select>
            {err('fc')}
          </label>

          <label>
            <span>{L(['Course', 'कोर्स'])}</span>
            <select
              id="fk"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              aria-invalid={!!errors.fk}
            >
              <option value="">{L(['Select', 'चुनें'])}</option>
              {COURSES.map((c, i) => (
                <option key={i} value={c.t[0]}>
                  {L(c.t)}
                </option>
              ))}
            </select>
            {err('fk')}
          </label>

          <label>
            <span>{L(['Village / city (optional)', 'गाँव / शहर (वैकल्पिक)'])}</span>
            <input id="fv" value={village} onChange={(e) => setVillage(e.target.value)} />
          </label>

          <button className="btn wa icwa shine" type="submit">
            {L(['Send on WhatsApp', 'WhatsApp पर भेजें'])}
          </button>
        </form>
      </div>
    </section>
  )
}
