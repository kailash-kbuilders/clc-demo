import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth, isFirebaseConfigured } from '../firebase'
import { useSiteContent } from '../hooks/useSiteContent'
import { useLang } from '../i18n/LangContext'
import Seo from '../components/Seo'
import AdminLogin from '../components/admin/AdminLogin'
import ResultsManager from '../components/admin/ResultsManager'
import PosterManager from '../components/admin/PosterManager'
import MaterialManager from '../components/admin/MaterialManager'

type Tab = 'results' | 'megatest' | 'testseries' | 'material'

/**
 * Admin panel - only reachable at /admin.
 * Nothing on the public site links here. Firebase Authentication guards it.
 */
export default function AdminPage() {
  const { L } = useLang()
  const [user, setUser] = useState<User | null>(null)
  const [ready, setReady] = useState(false)
  const [tab, setTab] = useState<Tab>('results')
  const content = useSiteContent()

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setReady(true)
      return
    }
    return onAuthStateChanged(auth, (u) => {
      setUser(u)
      setReady(true)
    })
  }, [])

  const seo = <Seo title="Admin — CLC Barmer" description="CLC Barmer admin panel." noindex />

  if (!ready) {
    return (
      <>
        {seo}
        <div className="admin">
          <div className="admin-card">Loading…</div>
        </div>
      </>
    )
  }

  if (!user) {
    return (
      <>
        {seo}
        <AdminLogin />
      </>
    )
  }

  const tabs: { id: Tab; label: [string, string] }[] = [
    { id: 'results', label: ['Results', 'परिणाम'] },
    { id: 'megatest', label: ['Mega Test', 'मेगा टेस्ट'] },
    { id: 'testseries', label: ['Test Series', 'टेस्ट सीरीज़'] },
    { id: 'material', label: ['Study material', 'अध्ययन सामग्री'] },
  ]

  return (
    <>
      {seo}
      <div className="admin admin-wide">
        <div className="admin-card admin-panelcard">
          <header className="adm-top">
            <img src="/img/logo.jpg" alt="CLC Barmer" />
            <div>
              <b>Admin — CLC Barmer</b>
              <br />
              <small className="admin-note">{user.email}</small>
            </div>
            <button className="btn sm ghost" type="button" onClick={() => auth && signOut(auth)}>
              Logout
            </button>
          </header>

          <nav className="adm-tabs">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                className={tab === t.id ? 'on' : ''}
                onClick={() => setTab(t.id)}
              >
                {L(t.label)}
              </button>
            ))}
          </nav>

          {tab === 'results' && <ResultsManager results={content.results} />}
          {tab === 'megatest' && (
            <PosterManager
              key={'mega' + content.megatest.poster + content.megatest.title[0]}
              which="megatest"
              block={content.megatest}
            />
          )}
          {tab === 'testseries' && (
            <PosterManager
              key={'series' + content.testseries.poster + content.testseries.title[0]}
              which="testseries"
              block={content.testseries}
            />
          )}
          {tab === 'material' && <MaterialManager materials={content.materials} />}

          <a className="admin-back" href="/">
            ← Website
          </a>
        </div>
      </div>
    </>
  )
}
