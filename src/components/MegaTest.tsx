import { useLang } from '../i18n/LangContext'
import { waFor } from '../lib/links'

export default function MegaTest() {
  const { L } = useLang()
  return (
    <section id="tests">
      <div className="w">
        <h2 className="rv">{L(['Mega Test', 'मेगा टेस्ट'])}</h2>
        <p className="sub rv">
          {L([
            'Mega Test for Navodaya Vidyalaya entrance — full details are on the poster.',
            'नवोदय विद्यालय प्रवेश परीक्षा के लिए मेगा टेस्ट — पूरी जानकारी पोस्टर में दी गई है।',
          ])}
        </p>
        <div className="sch rv">
          <img src="/img/megatest-poster.jpg" alt="CLC Barmer Mega Test poster" data-zoom />
          <div>
            <h3>{L(['Mega Test for Navodaya Vidyalaya entrance', 'नवोदय विद्यालय प्रवेश के लिए मेगा टेस्ट'])}</h3>
            <p>
              {L([
                'Exam date, syllabus and scholarship details are on the poster.',
                'परीक्षा की तारीख, पाठ्यक्रम और छात्रवृत्ति की जानकारी पोस्टर में है।',
              ])}
            </p>
            <a className="btn wa icwa" href={waFor('mega', L)} target="_blank" rel="noopener">
              {L(['Ask about the Mega Test', 'मेगा टेस्ट के बारे में पूछें'])}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
