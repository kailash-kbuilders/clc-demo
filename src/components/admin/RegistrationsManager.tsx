import { useEffect, useMemo, useState } from 'react'
import { deleteRegistration, fetchRegistrations } from '../../data/content'
import type { PosterBlock, Registration } from '../../data/content'
import AdmitCard from '../AdmitCard'

export default function RegistrationsManager({
  pass,
  block,
}: {
  pass: string
  block: PosterBlock
}) {
  const [rows, setRows] = useState<Registration[] | null>(null)
  const [err, setErr] = useState('')
  const [q, setQ] = useState('')
  const [cardId, setCardId] = useState<number | null>(null)

  const load = async () => {
    setErr('')
    try {
      setRows(await fetchRegistrations(pass))
    } catch (e) {
      setErr('List nahi aayi: ' + (e as Error).message)
      setRows([])
    }
  }

  useEffect(() => {
    void load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filtered = useMemo(() => {
    const list = rows ?? []
    const s = q.trim().toLowerCase()
    if (!s) return list
    return list.filter(
      (r) =>
        r.name.toLowerCase().includes(s) ||
        r.mobile.includes(s) ||
        r.roll_no.toLowerCase().includes(s),
    )
  }, [rows, q])

  const del = async (id: number) => {
    if (!confirm('Ye registration delete kar dein?')) return
    try {
      await deleteRegistration(pass, id)
      setRows((r) => (r ?? []).filter((x) => x.id !== id))
      if (cardId === id) setCardId(null)
    } catch (e) {
      setErr('Delete nahi hua: ' + (e as Error).message)
    }
  }

  const card = cardId != null ? (rows ?? []).find((r) => r.id === cardId) : null

  return (
    <div className="adm-panel">
      <h3>Mega Test registrations</h3>

      <div className="reg-top">
        <div className="reg-count">
          <b>{rows ? rows.length : '…'}</b>
          <span>ab tak register</span>
        </div>
        <button className="btn sm" type="button" onClick={() => void load()}>
          Refresh
        </button>
      </div>

      <input
        className="reg-search"
        placeholder="Naam / mobile / roll number se dhoondhein…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      {err && <p className="admin-msg err">{err}</p>}
      {rows && rows.length === 0 && !err && (
        <p className="admin-note">Abhi koi registration nahi hua hai.</p>
      )}

      <div className="reg-list">
        {filtered.map((r) => (
          <div className="reg-line" key={r.id}>
            <b className="reg-roll">{r.roll_no}</b>
            <span className="reg-name">{r.name}</span>
            <span className="reg-meta">{r.class || '-'}</span>
            <span className="reg-meta">{r.mobile}</span>
            <button
              className="btn sm"
              type="button"
              onClick={() => setCardId(cardId === r.id ? null : r.id)}
            >
              Admit card
            </button>
            <button className="btn sm ghost danger" type="button" onClick={() => void del(r.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {card && (
        <div className="reg-cardwrap">
          <div className="no-print reg-cardbtns">
            <button className="btn" type="button" onClick={() => window.print()}>
              Print / Save as PDF
            </button>
            <button className="btn ghost" type="button" onClick={() => setCardId(null)}>
              Band karein
            </button>
          </div>
          <AdmitCard reg={card} block={block} />
        </div>
      )}
    </div>
  )
}
