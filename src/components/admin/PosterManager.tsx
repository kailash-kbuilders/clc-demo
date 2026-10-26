import { useState } from 'react'
import { saveContent, uploadFile } from '../../data/content'
import type { PosterBlock } from '../../data/content'
import { useLang } from '../../i18n/LangContext'

type Props = { which: 'megatest' | 'testseries'; pass: string; block: PosterBlock }

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

export default function PosterManager({ which, pass, block }: Props) {
  const { L } = useLang()
  const isMega = which === 'megatest'

  const [title, setTitle] = useState(L(block.title))
  const [desc, setDesc] = useState(L(block.description))
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')

  const [showOnSite, setShowOnSite] = useState(!block.hidden)
  const [regOpen, setRegOpen] = useState(block.regOpen !== false)
  const [regFrom, setRegFrom] = useState(toLocal(block.regFrom))
  const [regTo, setRegTo] = useState(toLocal(block.regTo))
  const [centre, setCentre] = useState(block.centre ?? '')

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
        ...(isMega
          ? {
              hidden: !showOnSite,
              regOpen,
              regFrom: toIso(regFrom),
              regTo: toIso(regTo),
              centre: centre.trim(),
              resultDate: block.resultDate ?? '',
            }
          : {}),
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
      <h3>{isMega ? 'Mega Test' : 'Test Series'}</h3>

      <form className="admin-form" onSubmit={save}>
        <div className="adm-field">
          <span className="adm-lbl">Poster</span>
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          {file ? (
            <img className="adm-preview" src={URL.createObjectURL(file)} alt="" />
          ) : (
            block.poster && <img className="adm-preview" src={block.poster} alt="" />
          )}
        </div>

        <label>
          <span>Heading</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <label>
          <span>Poster ke neeche likha text</span>
          <textarea rows={3} value={desc} onChange={(e) => setDesc(e.target.value)} />
        </label>

        {isMega && (
          <div className="adm-settings">
            <h4>Mega Test ki settings</h4>

            <div className="adm-field">
              <span className="adm-lbl">Registration ka status</span>
              <div className="adm-seg">
                <button
                  type="button"
                  className={regOpen ? 'on' : ''}
                  onClick={() => setRegOpen(true)}
                >
                  Registration चालू
                </button>
                <button
                  type="button"
                  className={!regOpen ? 'on off' : ''}
                  onClick={() => setRegOpen(false)}
                >
                  Registration बंद
                </button>
              </div>
              <p className="admin-note">
                बंद करने पर poster par "REGISTRATION CLOSED" लिखा आ जाएगा।
              </p>
            </div>

            <div className="adm-field">
              <span className="adm-lbl">Website par mega test</span>
              <div className="adm-seg">
                <button
                  type="button"
                  className={showOnSite ? 'on' : ''}
                  onClick={() => setShowOnSite(true)}
                >
                  दिखाएँ
                </button>
                <button
                  type="button"
                  className={!showOnSite ? 'on off' : ''}
                  onClick={() => setShowOnSite(false)}
                >
                  हटाएँ
                </button>
              </div>
            </div>

            <details className="adm-sched">
              <summary>Schedule — tarikh se apne aap chalu/band (optional)</summary>
              <div className="adm-two">
                <label>
                  <span>Registration shuru</span>
                  <input
                    type="datetime-local"
                    value={regFrom}
                    onChange={(e) => setRegFrom(e.target.value)}
                  />
                </label>
                <label>
                  <span>Registration band</span>
                  <input
                    type="datetime-local"
                    value={regTo}
                    onChange={(e) => setRegTo(e.target.value)}
                  />
                </label>
              </div>
              <p className="admin-note">
                Khaali chhodne par upar wala status hi chalega.
              </p>
            </details>

            <label>
              <span>Test centre ka naam (admit card par chhapta hai)</span>
              <input
                value={centre}
                onChange={(e) => setCentre(e.target.value)}
                placeholder="Career Launcher Classes, Shastri Nagar, Barmer (Raj.)"
              />
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
