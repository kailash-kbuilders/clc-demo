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
