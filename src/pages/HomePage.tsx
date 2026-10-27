import { useLang } from '../i18n/LangContext'
import { useReveal } from '../hooks/useReveal'
import { useActiveSection } from '../hooks/useActiveSection'
import { useSiteContent } from '../hooks/useSiteContent'
import { CONFIG, FAQ, NAV } from '../data/site'
import Seo from '../components/Seo'
import ScrollProgress from '../components/ScrollProgress'
import Header from '../components/Header'
import Marquee from '../components/Marquee'
import Hero from '../components/Hero'
import Exams from '../components/Exams'
import Results from '../components/Results'
import MegaTest from '../components/MegaTest'
import About from '../components/About'
import Hostel from '../components/Hostel'
import AdmissionForm from '../components/AdmissionForm'
import StudyMaterial from '../components/StudyMaterial'
import Faq from '../components/Faq'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Lightbox from '../components/Lightbox'
import ToastHost from '../components/Toast'

export default function HomePage() {
  const { lang, L } = useLang()
  const active = useActiveSection(NAV.map((n) => n.id))
  const content = useSiteContent()
  // re-scan the DOM whenever the database content changes
  useReveal(content)

  return (
    <>
      <Seo
        title="CLC Barmer | Navodaya, Sainik School & Rashtriya Military School Coaching, Barmer"
        description="CLC Barmer (Career Launcher Classes), Shastri Nagar, Barmer, Rajasthan. Coaching for Navodaya Vidyalaya (JNVST), Sainik School (AISSEE) and Rashtriya Military School (RMS) entrance - Class 6 & 9, plus foundation batches Class 3 to 8."
        canonical={`${CONFIG.siteUrl}/`}
        image={`${CONFIG.siteUrl}/img/logo.jpg`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': ['EducationalOrganization', 'LocalBusiness'],
              '@id': `${CONFIG.siteUrl}/#org`,
              name: 'CLC Barmer',
              alternateName: ['Career Launcher Classes', 'CLC संस्थान, बाड़मेर'],
              url: CONFIG.siteUrl,
              logo: `${CONFIG.siteUrl}/img/logo.jpg`,
              image: `${CONFIG.siteUrl}/img/campus.jpg`,
              description:
                'CLC Barmer (Career Launcher Classes) - coaching for Navodaya Vidyalaya (JNVST), Sainik School (AISSEE) and Rashtriya Military School (RMS) entrance exams, Class 6 and 9, plus foundation batches Class 3 to 8, in Barmer, Rajasthan.',
              telephone: '+91-9571949387',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Shastri Nagar, near Sadar Thana',
                addressLocality: 'Barmer',
                addressRegion: 'Rajasthan',
                postalCode: '344001',
                addressCountry: 'IN',
              },
              geo: { '@type': 'GeoCoordinates', latitude: 25.737621, longitude: 71.403307 },
              areaServed: [
                { '@type': 'City', name: 'Barmer' },
                { '@type': 'AdministrativeArea', name: 'Marwar' },
              ],
              sameAs: [
                'https://www.instagram.com/clcbarmer',
                'https://youtube.com/@clcbarmer',
                'https://t.me/Clcbme',
              ],
            },
            {
              '@type': 'WebSite',
              '@id': `${CONFIG.siteUrl}/#site`,
              url: CONFIG.siteUrl,
              name: 'CLC Barmer',
              inLanguage: 'hi-IN',
              publisher: { '@id': `${CONFIG.siteUrl}/#org` },
            },
            {
              '@type': 'FAQPage',
              mainEntity: FAQ.map((f) => ({
                '@type': 'Question',
                name: f.q[1],
                acceptedAnswer: { '@type': 'Answer', text: f.a[1] },
              })),
            },
          ],
        }}
      />
      <ScrollProgress />
      <Header active={active} resultOpen={Boolean(content.resultsCfg?.open)} />
      <Marquee />
      <main>
        {content.resultsCfg?.open && (
          <a className="result-strip" href="/result">
            {L([
              'Mega Test result is out — check it with your roll number',
              'मेगा टेस्ट का परिणाम जारी — अपना रोल नंबर डालकर देखें',
            ])}{' '}
            &rarr;
          </a>
        )}
        <Hero />
        <MegaTest content={content} />
        <Exams />
        <Results content={content} />
        <About />
        <Hostel />
        <AdmissionForm />
        <StudyMaterial content={content} />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <Lightbox />
      <ToastHost />
    </>
  )
}
