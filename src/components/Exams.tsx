import { useLang } from '../i18n/LangContext'
import { EXAMS } from '../data/site'
import { waFor } from '../lib/links'

export default function Exams() {
  const { L } = useLang()
  return (
    <section id="exams">
      <div className="w">
        <h2 className="rv">{L(['Entrance exams', 'प्रवेश परीक्षाएँ'])}</h2>
        <div className="grid" id="examGrid">
          {EXAMS.map((e, i) => (
            <div className="card rv" key={i}>
              <h3>{L(e.t)}</h3>
              <p>{L(e.d)}</p>
              <a className="btn wa icwa sm" href={waFor('general', L)} target="_blank" rel="noopener">
                {L(['Get details', 'जानकारी लें'])}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
