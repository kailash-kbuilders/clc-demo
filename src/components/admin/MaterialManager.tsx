import { useState } from 'react'
import { saveContent, uploadFile } from '../../data/content'
import type { MaterialItem } from '../../data/content'
import { useLang } from '../../i18n/LangContext'

export default function MaterialManager({ materials }: { materials: MaterialItem[] }) {
  const { L } = useLang()
  const [title, setTitle] = useState('')
  const [sub, setSub] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')

  const add = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return setMsg('Pehle PDF chunein.')
    if (!title.trim()) return setMsg('Naam likhein.')
    setBusy(true)
    setMsg('')
    try {
      const url = await uploadFile('pdfs', file)
      const item: MaterialItem = {
        title: [title.trim(), title.trim()],
        sub: [sub.trim(), sub.trim()],
        file: url,
      }
      await saveContent({ materials: [...materials, item] })
      setTitle('')
      setSub('')
      setFile(null)
      setMsg('Add ho gaya ✓')
    } catch (err) {
      setMsg('Save nahi hua: ' + (err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  const remove = async (i: number) => {
    if (!confirm('Ye samgri hata dein?')) return
    setBusy(true)
    try {
      await saveContent({ materials: materials.filter((_, k) => k !== i) })
      setMsg('Hata diya ✓')
    } catch (err) {
      setMsg('Nahi hata: ' + (err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="adm-panel">
      <h3>{L(['Study material', 'अध्ययन सामग्री'])}</h3>
      <p className="admin-note">PDF + naam daalein. Website par download button apne aap aa jayega.</p>

      <form className="admin-form" onSubmit={add}>
        <label>
          <span>Naam</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="जैसे: गणित नोट्स" />
        </label>
        <label>
          <span>Chhota vivran (optional)</span>
          <input value={sub} onChange={(e) => setSub(e.target.value)} placeholder="जैसे: PDF • 10 पेज" />
        </label>
        <label>
          <span>PDF file</span>
          <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </label>
        <button className="btn" type="submit" disabled={busy}>
          {busy ? 'Saving…' : 'Nayi samgri add karein'}
        </button>
      </form>

      {msg && <p className="admin-msg">{msg}</p>}

      <div className="adm-list">
        {materials.map((m, i) => (
          <div className="adm-row" key={i}>
            <span className="adm-pdf">PDF</span>
            <div>
              <b>{L(m.title)}</b>
              <br />
              <span className="admin-note">{L(m.sub)}</span>
            </div>
            <button className="adm-del" type="button" onClick={() => remove(i)} disabled={busy}>
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
