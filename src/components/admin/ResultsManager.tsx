import { useState } from 'react'
import { saveContent, uploadFile } from '../../data/content'
import type { ResultItem } from '../../data/content'
import { useLang } from '../../i18n/LangContext'

export default function ResultsManager({ results }: { results: ResultItem[] }) {
  const { L } = useLang()
  const [name, setName] = useState('')
  const [detail, setDetail] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')

  const add = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return setMsg('Pehle photo chunein.')
    if (!name.trim()) return setMsg('Naam likhein.')
    setBusy(true)
    setMsg('')
    try {
      const url = await uploadFile('results', file)
      const item: ResultItem = { img: url, name: [name.trim(), name.trim()], detail: [detail.trim(), detail.trim()] }
      await saveContent({ results: [...results, item] })
      setName('')
      setDetail('')
      setFile(null)
      setMsg('Add ho gaya ✓')
    } catch (err) {
      setMsg('Save nahi hua: ' + (err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  const remove = async (i: number) => {
    if (!confirm('Ye result hata dein?')) return
    setBusy(true)
    try {
      await saveContent({ results: results.filter((_, k) => k !== i) })
      setMsg('Hata diya ✓')
    } catch (err) {
      setMsg('Nahi hata: ' + (err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="adm-panel">
      <h3>{L(['Results', 'परिणाम व उपलब्धियाँ'])}</h3>
      <p className="admin-note">Photo + naam + number daalein. Ye turant sabke phone par dikh jayega.</p>

      <form className="admin-form" onSubmit={add}>
        <label>
          <span>Photo</span>
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </label>
        {file && <img className="adm-preview" src={URL.createObjectURL(file)} alt="" />}
        <label>
          <span>Naam (student)</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="जैसे: कृष्ण कुमार" />
        </label>
        <label>
          <span>Number / detail</span>
          <input value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="जैसे: 265/300 या नवोदय विद्यालय, कक्षा 6" />
        </label>
        <button className="btn" type="submit" disabled={busy}>
          {busy ? 'Saving…' : 'Naya result add karein'}
        </button>
      </form>

      {msg && <p className="admin-msg">{msg}</p>}

      <div className="adm-list">
        {results.map((r, i) => (
          <div className="adm-row" key={i}>
            <img src={r.img} alt="" />
            <div>
              <b>{L(r.name)}</b>
              <br />
              <span className="admin-note">{L(r.detail)}</span>
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
