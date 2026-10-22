import { useState } from 'react'
import { saveContent, uploadFile } from '../../data/content'
import type { PosterBlock } from '../../data/content'
import { useLang } from '../../i18n/LangContext'

type Props = { which: 'megatest' | 'testseries'; pass: string; block: PosterBlock }

export default function PosterManager({ which, pass, block }: Props) {
  const { L } = useLang()
  const [title, setTitle] = useState(L(block.title))
  const [desc, setDesc] = useState(L(block.description))
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')

  // ---- mega test controls (only used when which === 'megatest') ----
  const isMega = which === 'megatest'
  const [showOnSite, setShowOnSite] = useState(!block.hidden)
  const [regOpen, setRegOpen] = useState(block.regOpen !== false)
  const [regFrom, setRegFrom] = useState(toLocal(block.regFrom))
  const [regTo, setRegTo] = useState(toLocal(block.regTo))
  const [examDate, setExamDate] = useState(block.examDate ?? '')
  const [reportingTime, setReportingTime] = useState(block.reportingTime ?? '')
  const [examTime, setExamTime] = useState(block.examTime ?? '')
  const [centre, setCentre] = useState(block.centre ?? '')
  const [resultDate, setResultDate] = useState(block.resultDate ?? '')

  const controls = {
    hidden: !showOnSite,
    regOpen,
    regFrom: toIso(regFrom),
    regTo: toIso(regTo),
    examDate: examDate.trim(),
    reportingTime: reportingTime.trim(),
    examTime: examTime.trim(),
    centre: centre.trim(),
    resultDate: resultDate.trim(),
  }

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setMsg('')
    try {
      const poster = file ? await uploadFile('posters', file) : block.poster
      const next: PosterBlock = {
        poster,
        title: [title.trim() || L(block.title), title.trim() || L(block.title)],
        description: [desc.trim(), desc.trim()],
        ...(isMega ? controls : {}),
      }
      await saveContent(pass, { [which]: next } as never)
      setFile(null)
      setMsg('Save ho gaya ✓')
    } catch (err) {
      setMsg('Save nahi hua: ' + (err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  const remove = async () => {
    if (!confirm('Isse website se hata dein?')) return
    setBusy(true)
    setMsg('')
    try {
      await saveContent(pass, {
        [which]: { poster: '', title: ['', ''], description: ['', ''] },
      } as never)
      setTitle('')
      setDesc('')
      setFile(null)
      setMsg('Website se hata diya ✓')
    } catch (err) {
      setMsg('Nahi hata: ' + (err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="adm-panel">
      <h3>{which === 'megatest' ? L(['Mega Test', 'मेगा टेस्ट']) : L(['Test Series', 'टेस्ट सीरीज़'])}</h3>
      <p className="admin-note">Naya poster aur uske neeche likha description — dono yahan se badlein.</p>

      <form className="admin-form" onSubmit={save}>
        <label>
          <span>Naya poster (photo)</span>
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </label>
        {file ? (
          <img className="adm-preview" src={URL.createObjectURL(file)} alt="" />
        ) : (
          block.poster && <img className="adm-preview" src={block.poster} alt="" />
        )}
        <label>
          <span>Heading</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          <span>Description</span>
          <textarea rows={3} value={desc} onChange={(e) => setDesc(e.target.value)} />
        </label>
        {isMega && (
          <div className="adm-settings">
            <h4>Registration aur exam ki settings</h4>
            <label className="adm-check">
              <input
                type="checkbox"
                checked={showOnSite}
                onChange={(e) => setShowOnSite(e.target.checked)}
              />
              <span>Mega test website par dikhayein</span>
            </label>
            <label className="adm-check">
              <input type="checkbox" checked={regOpen} onChange={(e) => setRegOpen(e.target.checked)} />
              <span>Registration chal raha hai (online)</span>
            </label>
            <div className="adm-two">
              <label>
                <span>Registration shuru (khaali chhod sakte hain)</span>
                <input type="datetime-local" value={regFrom} onChange={(e) => setRegFrom(e.target.value)} />
              </label>
              <label>
                <span>Registration band</span>
                <input type="datetime-local" value={regTo} onChange={(e) => setRegTo(e.target.value)} />
              </label>
            </div>
            <p className="admin-note">
              Tarikh daalne par registration apne aap khulega aur band hoga. Khaali chhodne par
              upar wala checkbox hi chalega.
            </p>
            <div className="adm-two">
              <label>
                <span>Exam ki tarikh</span>
                <input value={examDate} onChange={(e) => setExamDate(e.target.value)} placeholder="26 October 2026 (Monday)" />
              </label>
              <label>
                <span>Reporting time</span>
                <input value={reportingTime} onChange={(e) => setReportingTime(e.target.value)} placeholder="09:00 AM" />
              </label>
            </div>
            <div className="adm-two">
              <label>
                <span>Exam ka samay</span>
                <input value={examTime} onChange={(e) => setExamTime(e.target.value)} placeholder="10:00 AM - 01:00 PM (3 Hours)" />
              </label>
              <label>
                <span>Result ki tarikh</span>
                <input value={resultDate} onChange={(e) => setResultDate(e.target.value)} placeholder="5 November 2026" />
              </label>
            </div>
            <label>
              <span>Test centre ka address</span>
              <input value={centre} onChange={(e) => setCentre(e.target.value)} />
            </label>
          </div>
        )}

        <div className="adm-btns">
          <button className="btn" type="submit" disabled={busy}>
            {busy ? 'Saving…' : 'Save karein'}
          </button>
          <button className="btn ghost" type="button" onClick={remove} disabled={busy}>
            Website se hataein
          </button>
        </div>
      </form>

      {msg && <p className="admin-msg">{msg}</p>}
    </div>
  )
}

function toLocal(iso?: string) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`
}

function toIso(local: string) {
  if (!local) return ''
  const d = new Date(local)
  return Number.isNaN(d.getTime()) ? '' : d.toISOString()
}
