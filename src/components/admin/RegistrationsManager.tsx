import { useEffect, useMemo, useState } from 'react'
import { deleteRegistration, fetchPhoto, fetchRegistrations } from '../../data/content'
import type { PosterBlock, Registration } from '../../data/content'
import AdmitCard from '../AdmitCard'
import { printAdmitCard } from '../../lib/download'

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
  const [openId, setOpenId] = useState<number | null>(null)
  const [cardPhoto, setCardPhoto] = useState('')

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

  const toggle = (r: Registration) => {
    const next = openId === r.id ? null : r.id
    setOpenId(next)
    setCardPhoto('')
    if (next != null) void fetchPhoto(pass, next).then(setCardPhoto)
  }

  const del = async (id: number) => {
    if (!confirm('Ye registration delete kar dein?')) return
    try {
      await deleteRegistration(pass, id)
      setRows((r) => (r ?? []).filter((x) => x.id !== id))
      if (openId === id) setOpenId(null)
    } catch (e) {
      setErr('Delete nahi hua: ' + (e as Error).message)
    }
  }

  const open = openId != null ? (rows ?? []).find((r) => r.id === openId) : null

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
          <div key={r.id}>
            <div className={'reg-line' + (openId === r.id ? ' on' : '')}>
              <button type="button" className="reg-open" onClick={() => toggle(r)}>
                {r.thumb ? (
                  <img className="reg-thumb" src={r.thumb} alt="" />
                ) : (
                  <span className="reg-thumb reg-thumb-empty" />
                )}
                <span className="reg-name">{r.name}</span>
                <span className="reg-meta">
                  {r.roll_no} &middot; {r.class || '-'} &middot; {r.mobile}
                </span>
              </button>
              <button
                className="btn sm ghost danger"
                type="button"
                onClick={() => void del(r.id)}
              >
                Delete
              </button>
            </div>

            {openId === r.id && (
              <div className="reg-body">
                <table>
                  <tbody>
                    {[
                      ['Roll No.', r.roll_no],
                      ['Student', r.name],
                      ["Father's name", r.father],
                      ['Class', r.class],
                      ['Category', r.category],
                      ['Date of birth', r.dob],
                      ['Gender', r.gender],
                      ['Mobile', r.mobile],
                      ['Registered at', new Date(r.created_at).toLocaleString('en-IN')],
                    ]
                      .filter(([, v]) => v)
                      .map(([k, v]) => (
                        <tr key={k as string}>
                          <td>{k}</td>
                          <td>{v}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                <div className="no-print reg-cardbtns">
                  <button
                    className="btn"
                    type="button"
                    onClick={() => printAdmitCard(r.roll_no)}
                  >
                    Download admit card (PDF)
                  </button>
                  <button className="btn ghost" type="button" onClick={() => setOpenId(null)}>
                    Band karein
                  </button>
                </div>

                <div className="acwrap">
                  <AdmitCard reg={{ ...r, photo: cardPhoto }} block={block} />
                </div>
                <p className="acwrap-hint no-print">Preview — poora card dekhne ke liye Download dabayein</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
