import { useLang } from '../i18n/LangContext'
import type { Pair } from '../i18n/LangContext'
import { waFor } from '../lib/links'

const FACILITIES: Pair[] = [
  ['Boys and girls', 'लड़के और लड़कियों के लिए'],
  ['Well furnished, disciplined environment', 'सुसज्जित एवं अनुशासित वातावरण'],
  ['Nutritious and clean food', 'पौष्टिक एवं स्वच्छ भोजन'],
  ['Supervision by a warden, 24x7', '24x7 निगरानी पर हेडरेटर'],
  ['Fixed daily study hours', 'नियमित अध्ययन समय'],
  ['Sports and yoga activities', 'खेल एवं योग गतिविधियाँ'],
  ['A home-like atmosphere', 'घर जैसा माहौल'],
]

export default function Hostel() {
  const { L } = useLang()
  return (
    <section id="hostel">
      <div className="w">
        <h2 className="rv">{L(['Hostel', 'छात्रावास'])}</h2>
        <p className="sub rv">
          {L([
            'CLC Barmer also runs a hostel for boys and girls — a safe, disciplined place to live and study, right next to the coaching.',
            'CLC बाड़मेर में लड़के और लड़कियों के लिए छात्रावास भी है — कोचिंग के साथ ही, सुरक्षित और अनुशासित रहने-पढ़ने की जगह।',
          ])}
        </p>

        <div className="hostel">
          <img
            className="hostel-img rv"
            src="/img/hostel-banner.jpg"
            alt={L(['CLC Barmer hostel', 'CLC बाड़मेर छात्रावास'])}
            data-zoom
            loading="lazy"
          />
          <div className="hostel-side rv">
            <ul className="hostel-list">
              {FACILITIES.map((f, i) => (
                <li key={i}>{L(f)}</li>
              ))}
            </ul>
            <a className="btn wa icwa" href={waFor('general', L)} target="_blank" rel="noopener">
              {L(['Ask about the hostel', 'छात्रावास के बारे में पूछें'])}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
