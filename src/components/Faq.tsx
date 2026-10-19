import { useLang } from '../i18n/LangContext'
import { FAQ } from '../data/site'

export default function Faq() {
  const { L } = useLang()
  return (
    <section id="faq">
      <div className="w">
        <h2 className="rv">{L(['Frequently asked questions', 'अक्सर पूछे जाने वाले प्रश्न'])}</h2>
        <div id="faqBox">
          {FAQ.map((f, i) => (
            <details key={i}>
              <summary>{L(f.q)}</summary>
              <p>{L(f.a)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
