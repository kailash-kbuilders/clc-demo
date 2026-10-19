import { useLang } from '../i18n/LangContext'
import { MARQUEE } from '../data/site'

export default function Marquee() {
  const { L } = useLang()
  const run = MARQUEE.map((m) => L(m))
  return (
    <div className="tagbar">
      <div className="tagbar-in">
        {[0, 1].map((k) => (
          <span key={k}>
            {run.map((t, i) => (
              <span key={i} style={{ margin: '0 26px' }}>
                ★ {t}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}
