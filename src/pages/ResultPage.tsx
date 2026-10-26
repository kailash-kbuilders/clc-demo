import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import { fetchResult } from '../data/content'
import type { ResultRow } from '../data/content'
import MarkSheet from '../components/MarkSheet'
import { printSheet } from '../lib/download'

export default function ResultPage() {
  const { L } = useLang()
  const [roll, setRoll] = useState('')
  const [row, setRow] = useState<ResultRow | null>(null)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const look = async () => {
    const r = roll.replace(/\s/g, '')
    if (!r) return setErr(L(['Please enter your roll number.', 'कृपया अपना रोल नंबर डालें।']))
    setBusy(true)
    setErr('')
    try {
      const data = await fetchResult(r)
      setRow(data)
      window.scrollTo(0, 0)
    } catch (e) {
      const m = (e as Error).message
      setRow(null)
      if (m.includes('result_closed'))
        setErr(L(['The result has not been published yet.', 'परिणाम अभी घोषित नहीं हुआ है।']))
      else if (m.includes('not_found'))
        setErr(
          L([
            'No result found for this roll number. Please check it again.',
            'इस रोल नंबर का कोई परिणाम नहीं मिला। कृपया दोबारा जाँचें।',
          ]),
        )
      else setErr(L(['Something went wrong. Please try again.', 'कुछ गड़बड़ हुई। दोबारा कोशिश करें।']))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mt-wrap">
      {row ? (
        <>
          <h1 className="mt-h1">{L(['Your result', 'आपका परिणाम'])}</h1>
          <p className="mt-ok no-print">
            {L([
              'You can open this again any time with your roll number.',
              'इसी रोल नंबर से आप इसे दोबारा कभी भी खोल सकते हैं।',
            ])}
          </p>
          <div className="mt-btns no-print">
            <button className="btn" type="button" onClick={() => printSheet(row.roll_no)}>
              {L(['Download mark sheet (PDF)', 'मार्कशीट डाउनलोड करें (PDF)'])}
            </button>
            <Link className="btn ghost" to="/">
              {L(['Back to website', 'वेबसाइट पर वापस'])}
            </Link>
          </div>
          <div className="acfit">
            <MarkSheet r={row} />
          </div>
        </>
      ) : (
        <>
          <h1 className="mt-h1">{L(['Check your result', 'अपना परिणाम देखें'])}</h1>
          <p className="mt-sub">
            {L([
              'Enter your roll number to see your mega test result.',
              'मेगा टेस्ट का परिणाम देखने के लिए अपना रोल नंबर डालें।',
            ])}
          </p>

          <div className="mt-form">
            <label className="mt-full">
              <span>{L(['Roll number', 'रोल नंबर'])} *</span>
              <input
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') void look()
                }}
                inputMode="numeric"
                placeholder="2021123"
              />
            </label>
            {err && <p className="mt-err mt-full">{err}</p>}
            <div className="mt-full mt-btns">
              <button className="btn" type="button" disabled={busy} onClick={() => void look()}>
                {busy ? L(['Please wait…', 'रुकें…']) : L(['See result', 'परिणाम देखें'])}
              </button>
              <Link className="btn ghost" to="/">
                {L(['Back to website', 'वेबसाइट पर वापस'])}
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
