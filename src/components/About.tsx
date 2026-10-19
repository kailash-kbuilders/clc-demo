import { useLang } from '../i18n/LangContext'

export default function About() {
  const { L } = useLang()
  return (
    <section id="about">
      <div className="w">
        <h2 className="rv">{L(['About us', 'हमारे बारे में'])}</h2>
        <div className="two">
          <img
            className="campus rv"
            src="/img/campus.jpg"
            alt="CLC Barmer students in class"
            data-zoom
            loading="lazy"
          />
          <div className="rv">
            <p>
              {L([
                'CLC Barmer (Career Launcher Classes), Shastri Nagar, Barmer — preparation for Navodaya Vidyalaya, Sainik School and Rashtriya Military School entrance exams, along with foundation batches for Class 3 to 8.',
                'CLC बाड़मेर (Career Launcher Classes), शास्त्री नगर, बाड़मेर में नवोदय विद्यालय, सैनिक स्कूल एवं राष्ट्रीय मिलिट्री स्कूल प्रवेश परीक्षा की तैयारी कराता है — साथ में कक्षा 3 से 8 तक फाउंडेशन बैच।',
              ])}
            </p>
            <p>
              {L([
                'Regular classes, test series, study material and experienced guidance — all in one place.',
                'नियमित कक्षाएँ, टेस्ट सीरीज़, अध्ययन सामग्री और अनुभवी मार्गदर्शन — सब एक ही जगह।',
              ])}
            </p>
            <p className="note">{L(['Mentor: Teja Ram Choudhary', 'मार्गदर्शन: तेजाराम चौधरी'])}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
