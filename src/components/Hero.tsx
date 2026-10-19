import { useLang } from '../i18n/LangContext'
import { useTypewriter } from '../hooks/useTypewriter'
import { CONFIG, HERO } from '../data/site'
import { waFor, telLink } from '../lib/links'

export default function Hero() {
  const { lang, L } = useLang()
  const text = useTypewriter(HERO.map((h) => L(h)), true)

  return (
    <section className="hero" id="home">
      <div className="stars" id="stars" aria-hidden="true" />
      <div className="w g">
        <div>
          <h1 className="up mot">
            <span id="tw">{text}</span>
          </h1>
          <p className="up d1 tagsub">
            {L([
              'Dedicated institute for Navodaya Vidyalaya · Sainik School · Rashtriya Military School',
              'नवोदय विद्यालय · सैनिक स्कूल · राष्ट्रीय मिलिट्री स्कूल को समर्पित संस्थान',
            ])}
            <br />
            {L([
              'The only dedicated institute in the Marwar region',
              'मारवाड़ क्षेत्र का एकमात्र समर्पित संस्थान',
            ])}
          </p>
        </div>
        <div className="sealw">
          <img className="seal" src="/img/logo.jpg" alt="CLC Barmer logo" />
        </div>
      </div>

      <div className="w">
        <div className="row up d2">
          <a className="btn ghost tel ictel" href={telLink()} data-hi="अभी कॉल करें">
            {L(['Call now', 'अभी कॉल करें'])}
          </a>
          <a className="btn reg icreg shine" href="#admission">
            {L(['Register online', 'ऑनलाइन रजिस्ट्रेशन'])}
          </a>
          <a className="btn wa icwa" href={waFor('admission', L)} target="_blank" rel="noopener">
            {L(['Ask on WhatsApp', 'WhatsApp पर पूछें'])}
          </a>
          <a
            className="btn yt icyt"
            href={CONFIG.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
          >
            {L(['View on YouTube', 'YouTube पर देखें'])}
          </a>
        </div>
      </div>
    </section>
  )
}
