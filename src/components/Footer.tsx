import { useLang } from '../i18n/LangContext'
import { CONFIG } from '../data/site'
import { waFor } from '../lib/links'

export default function Footer() {
  const { L } = useLang()
  return (
    <>
      <footer>
        <img
          src="/img/logo.jpg"
          alt="CLC Barmer logo"
          style={{ width: 76, margin: '0 auto 10px', background: '#fff', borderRadius: '50%', padding: 4 }}
        />
        <b>CLC Barmer</b>
        <br />
        Career Launcher Classes · Shastri Nagar, Barmer 344001
        <div className="soc">
          <a className="icwa" href={waFor('general', L)} target="_blank" rel="noopener">
            WhatsApp
          </a>
          <a className="icig" href={CONFIG.social.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a className="icyt" href={CONFIG.social.youtube} target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
          <a className="ictg" href={CONFIG.social.telegram} target="_blank" rel="noopener noreferrer">
            Telegram
          </a>
        </div>
      </footer>
      <a className="fab icwa" href={waFor('general', L)} target="_blank" rel="noopener" aria-label="WhatsApp">
        WhatsApp
      </a>
    </>
  )
}
