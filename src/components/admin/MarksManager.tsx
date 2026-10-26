import { useEffect, useMemo, useState } from 'react'
import {
  adminDeleteResult,
  adminFetchResults,
  adminSaveResults,
  RESULT_CFG_DEFAULT,
  saveContent,
} from '../../data/content'
import type { ResultRow, ResultSubject, ResultsCfg } from '../../data/content'

export default function MarksManager({ pass }: { pass: string }) {
  const [rows, setRows] = useState<ResultRow[] | null>(null)
  const [cfg, setCfg] = useState<ResultsCfg>(RESULT_CFG_DEFAULT)
  const [subjects, setSubjects] = useState<ResultSubject[]>(RESULT_CFG_DEFAULT.subjects)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')
  const [q, setQ] = useState('')
  const [paste, setPaste] = useState('')

  const load = async () => {
    setBusy(true)
    try {
      const d = await adminFetchResults(pass)
      setRows(d.rows)
      setCfg(d.cfg)
      setSubjects(d.cfg.subjects?.length ? d.cfg.subjects : RESULT_CFG_DEFAULT.subjects)
    } catch {
      setMsg('Load nahi hua. Refresh karein.')
    } finally {
      setBusy(false)
    }
  }

  useEffect(() => {
    void load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setOpen = async (open: boolean) => {
    setBusy(true)
    try {
      await saveContent(pass, { resultsCfg: { ...cfg, open, subjects } } as never)
      setCfg((c) => ({ ...c, open }))
      setMsg(open ? 'Result ab sabko dikhega ✓' : 'Result band kar diya ✓')
    } catch {
      setMsg('Save nahi hua.')
    } finally {
      setBusy(false)
    }
  }

  const saveSubjects = async () => {
    setBusy(true)
    try {
      const clean = subjects.filter((s) => s.name.trim() && Number(s.max) > 0)
      await saveContent(pass, { resultsCfg: { ...cfg, subjects: clean } } as never)
      setSubjects(clean)
      setMsg('Subjects save ho gaye ✓')
    } catch {
      setMsg('Save nahi hua.')
    } finally {
      setBusy(false)
    }
  }

  const addFromPaste = async () => {
    const lines = paste.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
    if (!lines.length) return setMsg('Pehle data paste karein.')
    setBusy(true)
    try {
      const maxTotal = subjects.reduce((a, s) => a + Number(s.max), 0)
      const payload = lines.map((line) => {
        const c = line.split(/\t|,|\|/).map((x) => x.trim())
        const marks: Record<string, number> = {}
        subjects.forEach((s, i) => {
          const v = Number(c[4 + i])
          if (!Number.isNaN(v) && c[4 + i] !== undefined && c[4 + i] !== '') marks[s.name] = v
        })
        return {
          roll_no: c[0],
          name: c[1] || '-',
          father: c[2] || null,
          class: c[3] || null,
          marks,
          max_total: maxTotal,
        }
      })
      const n = await adminSaveResults(pass, payload)
      setPaste('')
      setMsg(n + ' students ke marks save ho gaye ✓')
      await load()
    } catch {
      setMsg('Save nahi hua. Format check karein.')
    } finally {
      setBusy(false)
    }
  }

  const del = async (roll: string) => {
    if (!confirm('Roll ' + roll + ' ka result delete karein?')) return
    setBusy(true)
    try {
      await adminDeleteResult(pass, roll)
      await load()
    } finally {
      setBusy(false)
    }
  }

  const list = useMemo(() => {
    const t = q.trim().toLowerCase()
    const all = rows || []
    if (!t) return all
    return all.filter(
      (r) => r.roll_no.includes(t) || (r.name || '').toLowerCase().includes(t),
    )
  }, [rows, q])

  return (
    <div className="adm-panel">
      <h2 className="adm-h">Mega Test ke marks</h2>

      <div className="reg-top">
        <div className="reg-count">
          <b>{rows ? rows.length : '…'}</b>
          <span>students ke marks</span>
        </div>
        <button className="btn sm" type="button" onClick={() => void load()} disabled={busy}>
          Refresh
        </button>
      </div>

      <div className="adm-seg" style={{ marginTop: 12 }}>
        <button
          type="button"
          className={cfg.open ? 'on' : ''}
          onClick={() => void setOpen(true)}
          disabled={busy}
        >
          Result dikhayein
        </button>
        <button
          type="button"
          className={!cfg.open ? 'on' : ''}
          onClick={() => void setOpen(false)}
          disabled={busy}
        >
          Result band karein
        </button>
      </div>
      <p className="adm-note">
        {cfg.open ? 'Ab students result dekh sakte hain.' : 'Abhi students ko result nahi dikhega.'}
      </p>

      <h3 className="adm-sub">Subjects (naam + poore marks)</h3>
      <div className="subj-list">
        {subjects.map((s, i) => (
          <div className="subj-row" key={i}>
            <input
              value={s.name}
              onChange={(e) =>
                setSubjects((p) => p.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))
              }
              placeholder="विषय"
            />
            <input
              value={s.max}
              inputMode="numeric"
              onChange={(e) =>
                setSubjects((p) =>
                  p.map((x, j) => (j === i ? { ...x, max: Number(e.target.value) || 0 } : x)),
                )
              }
              placeholder="50"
            />
            <button
              className="btn sm ghost"
              type="button"
              onClick={() => setSubjects((p) => p.filter((_, j) => j !== i))}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <div className="adm-row2">
        <button
          className="btn sm"
          type="button"
          onClick={() => setSubjects((p) => [...p, { name: '', max: 25 }])}
        >
          + Subject
        </button>
        <button className="btn sm" type="button" onClick={() => void saveSubjects()} disabled={busy}>
          Subjects save karein
        </button>
      </div>

      <h3 className="adm-sub">Marks daalein (paste)</h3>
      <p className="adm-note">
        Ek line me ek student: <b>roll, naam, pita, class, {subjects.map((s) => s.name).join(', ')}</b>
      </p>
      <textarea
        className="adm-paste"
        value={paste}
        onChange={(e) => setPaste(e.target.value)}
        rows={5}
        placeholder={'2021123, Rahul Singh, Mahendra, Class 9, 45, 22, 20'}
      />
      <button className="btn sm" type="button" onClick={() => void addFromPaste()} disabled={busy}>
        Marks save karein
      </button>

      {msg && <p className="adm-note adm-msg">{msg}</p>}

      <h3 className="adm-sub">List</h3>
      <input
        className="reg-search"
        placeholder="Roll / naam se dhoondhein…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="marks-list">
        {list.map((r) => (
          <div className="marks-row" key={r.roll_no}>
            <span className="marks-roll">{r.roll_no}</span>
            <span className="marks-name">{r.name}</span>
            <span className="marks-total">
              {r.total}/{r.max_total}
            </span>
            <button className="btn sm ghost" type="button" onClick={() => void del(r.roll_no)}>
              Delete
            </button>
          </div>
        ))}
        {rows && rows.length === 0 && <p className="adm-note">Abhi koi marks nahi hain.</p>}
      </div>
    </div>
  )
}
