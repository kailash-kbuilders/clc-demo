import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { ADMIN_EMAIL, auth, isFirebaseConfigured } from '../../firebase'

export default function AdminLogin() {
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!auth) return
    setErr('')
    setBusy(true)
    try {
      await signInWithEmailAndPassword(auth, ADMIN_EMAIL, pass)
    } catch {
      setErr('Galat password. Dobara koshish karein.')
      setPass('')
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

        {!isFirebaseConfigured ? (
          <div className="admin-box">
            <p>
              <b>Firebase abhi joda nahi gaya hai.</b>
            </p>
            <p className="admin-note">
              README me diye steps follow karke Firebase config <code>src/firebase.ts</code> me
              daalein, phir admin panel chal jayega.
            </p>
          </div>
        ) : (
          <form className="admin-form" onSubmit={submit}>
            <label>
              <span>Password</span>
              <input
                type="password"
                autoComplete="current-password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                autoFocus
              />
            </label>
            {err && <p className="admin-err">{err}</p>}
            <button className="btn" type="submit" disabled={busy || pass.length === 0}>
              {busy ? 'Checking…' : 'Login'}
            </button>
          </form>
        )}

        <a className="admin-back" href="/">
          ← Website
        </a>
      </div>
    </div>
  )
}
