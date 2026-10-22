import { useState } from 'react'
import { useSiteContent } from '../hooks/useSiteContent'
import { useLang } from '../i18n/LangContext'
import Seo from '../components/Seo'
import AdminLogin from '../components/admin/AdminLogin'
import ResultsManager from '../components/admin/ResultsManager'
import PosterManager from '../components/admin/PosterManager'
import MaterialManager from '../components/admin/MaterialManager'
import RegistrationsManager from '../components/admin/RegistrationsManager'

type Tab = 'results' | 'megatest' | 'registrations' | 'testseries' | 'material'

/**
 * Admin panel - only reachable at /admin.
 * Nothing on the public site links here, robots.txt disallows it, and the page
 * is noindex. No login system - just the password gate.
 */
export default function AdminPage() {
  const { L } = useLang()
  const [pass, setPass] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem('clcAdminPass')
    } catch {
      return null
    }
  })
  const [tab, setTab] = useState<Tab>('results')
  const content = useSiteContent()

  const seo = <Seo title="Admin — CLC Barmer" description="CLC Barmer admin panel." noindex />

  const unlock = (p: string) => {
    try {
      sessionStorage.setItem('clcAdminPass', p)
    } catch {
      /* ignore */
    }
    setPass(p)
  }

  const lock = () => {
    try {
      sessionStorage.removeItem('clcAdminPass')
    } catch {
      /* ignore */
    }
    setPass(null)
  }

  if (!pass) {
    return (
      <>
        {seo}
        <AdminLogin onSuccess={unlock} />
      </>
    )
  }

  const tabs: { id: Tab; label: [string, string] }[] = [
    { id: 'results', label: ['Results', 'परिणाम'] },
    { id: 'megatest', label: ['Mega Test', 'मेगा टेस्ट'] },
    { id: 'registrations', label: ['Registrations', 'रजिस्ट्रेशन'] },
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
              <small className="admin-note">Career Launcher Classes</small>
            </div>
            <button className="btn sm ghost" type="button" onClick={lock}>
              Logout
            </button>
          </header>

          <div className="adm-tabs">
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
          </div>

          {tab === 'results' && <ResultsManager pass={pass} results={content.results} />}
          {tab === 'megatest' && (
            <PosterManager
              key={'mega' + content.megatest.poster + content.megatest.title[0]}
              which="megatest"
              pass={pass}
              block={content.megatest}
            />
          )}
          {tab === 'registrations' && (
            <RegistrationsManager pass={pass} block={content.megatest} />
          )}
          {tab === 'testseries' && (
            <PosterManager
              key={'series' + content.testseries.poster + content.testseries.title[0]}
              which="testseries"
              pass={pass}
              block={content.testseries}
            />
          )}
          {tab === 'material' && <MaterialManager pass={pass} materials={content.materials} />}

          <a className="admin-back" href="/">
            ← Website
          </a>
        </div>
      </div>
    </>
  )
}
