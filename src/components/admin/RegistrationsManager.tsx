import { useEffect, useMemo, useState } from 'react'
import { deleteRegistration, fetchRegistrations } from '../../data/content'
import type { Registration } from '../../data/content'

function csvCell(v: string | null | undefined) {
  const s = (v ?? '').toString().replace(/"/g, '""')
  return `"${s}"`
}

function downloadCsv(rows: Registration[]) {
  const head = [
    'Roll No',
    'Name',
    "Father's Name",
    'Class',
    'School',
    'Category',
    'DOB',
    'Gender',
    'Mobile',
    'Address',
    'Registered at',
  ]
  const body = rows.map((r) =>
    [
      r.roll_no,
      r.name,
      r.father,
      r.class,
      r.school,
      r.category,
      r.dob,
      r.gender,
      r.mobile,
      r.address,
      new Date(r.created_at).toLocaleString('en-IN'),
    ]
      .map(csvCell)
      .join(','),
  )
  const csv = '\uFEFF' + [head.map(csvCell).join(','), ...body].join('\r\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
  const a = document.createElement('a')
  a.href = url
  a.download = 'clc-mega-test-registrations.csv'
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 15000)
}

export default function RegistrationsManager({ pass }: { pass: string }) {
  const [rows, setRows] = useState<Registration[] | null>(null)
  const [err, setErr] = useState('')
  const [q, setQ] = useState('')
  const [openId, setOpenId] = useState<number | null>(null)

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
    } catch (e) {
      setErr('Delete nahi hua: ' + (e as Error).message)
    }
  }

  return (
    <div className="adm-panel">
      <h3>Mega Test registrations</h3>

      <div className="reg-top">
        <div className="reg-count">
          <b>{rows ? rows.length : '…'}</b>
          <span>ab tak register</span>
        </div>
        <div className="reg-actions">
          <button className="btn sm" type="button" onClick={() => void load()}>
            Refresh
          </button>
          <button
            className="btn sm ghost"
            type="button"
            disabled={!rows || rows.length === 0}
            onClick={() => downloadCsv(filtered)}
          >
            Excel (CSV) download
          </button>
        </div>
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
          <div className="reg-row" key={r.id}>
            <button
              type="button"
              className="reg-head"
              onClick={() => setOpenId(openId === r.id ? null : r.id)}
            >
              <b className="reg-roll">{r.roll_no}</b>
              <span className="reg-name">{r.name}</span>
              <span className="reg-meta">
                {r.class || '-'} &middot; {r.mobile}
              </span>
            </button>
            {openId === r.id && (
              <div className="reg-body">
                <table>
                  <tbody>
                    {[
                      ['Roll No.', r.roll_no],
                      ['Student', r.name],
                      ["Father's name", r.father],
                      ['Class', r.class],
                      ['School', r.school],
                      ['Category', r.category],
                      ['Date of birth', r.dob],
                      ['Gender', r.gender],
                      ['Mobile', r.mobile],
                      ['Address', r.address],
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
                <button className="btn sm ghost danger" type="button" onClick={() => void del(r.id)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
