import { useState } from 'react'

/**
 * Simple password gate - no accounts, no login system.
 * The password is checked right here in the code (as a SHA-256 hash, so the
 * plain password never appears anywhere).
 *
 *   password = 2026
 */
const ADMIN_PASSWORD_HASH = '158a323a7ba44870f23d96f1516dd70aa48e9a72db4ebb026b0a89e212a208ab'

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export default function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr('')
    setBusy(true)
    try {
      const ok = (await sha256(pass)) === ADMIN_PASSWORD_HASH
      if (ok) {
        onSuccess()
      } else {
        setErr('Galat password. Dobara koshish karein.')
        setPass('')
      }
    } catch {
      setErr('Kuch gadbad ho gayi. Dobara koshish karein.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="admin">
      <div className="admin-card">
        <img src="/img/logo.jpg" alt="CLC Barmer" width={72} height={72} />
        <h1>Admin</h1>
        <p className="admin-sub">CLC Barmer — Career Launcher Classes</p>

        <form className="admin-form" onSubmit={submit}>
          <label>
            <span>Password</span>
            <input
              type="password"
              inputMode="numeric"
              autoComplete="off"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              autoFocus
            />
          </label>
          {err && <p className="admin-err">{err}</p>}
          <button className="btn" type="submit" disabled={busy || pass.length === 0}>
            {busy ? 'Checking…' : 'Open admin'}
          </button>
        </form>

        <a className="admin-back" href="/">
          ← Website
        </a>
      </div>
    </div>
  )
}
