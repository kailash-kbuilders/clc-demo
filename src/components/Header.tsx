import { useState } from 'react'
import { useLang } from '../i18n/LangContext'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import { NAV } from '../data/site'

type Props = { active: string | null }

export default function Header({ active }: Props) {
  const { lang, toggle, L } = useLang()
  const [open, setOpen] = useState(false)
  useLockBodyScroll(open)

  const close = () => setOpen(false)

  return (
    <>
      <header>
        <div className="w bar">
          <img src="/img/logo.jpg" alt="CLC Barmer logo" width={44} height={44} />
          <b>
            CLC Barmer
            <br />
            <small style={{ fontWeight: 600, fontSize: '.7rem', color: 'var(--mut)' }}>
              Career Launcher Classes
            </small>
          </b>

          <nav id="nav" className={open ? 'open' : ''}>
            {NAV.map((n) => (
              <a
                key={n.id}
                href={n.href}
                className={active === n.id ? 'active' : undefined}
                onClick={close}
              >
                {L(n.label)}
              </a>
            ))}
          </nav>

          <button id="lg" className="btn sm ghost" aria-label="Change language" onClick={toggle}>
            {lang === 'en' ? 'हिं' : 'EN'}
          </button>
          <button
            id="mb"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            ☰
          </button>
        </div>
      </header>
      <div id="navbd" className={open ? 'on' : ''} aria-hidden="true" onClick={close} />
    </>
  )
}
