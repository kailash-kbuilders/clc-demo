import { useLang } from '../i18n/LangContext'
import { useReveal } from '../hooks/useReveal'
import { useActiveSection } from '../hooks/useActiveSection'
import { useSiteContent } from '../hooks/useSiteContent'
import { CONFIG, NAV } from '../data/site'
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
  const { lang } = useLang()
  const active = useActiveSection(NAV.map((n) => n.id))
  const content = useSiteContent()
  // re-scan the DOM whenever the database content changes
  useReveal(content)

  return (
    <>
      <Seo
        title="CLC Barmer | Navodaya, Sainik School & Rashtriya Military School Coaching, Barmer"
        description="CLC Barmer (Career Launcher Classes), Shastri Nagar, Barmer, Rajasthan. Coaching for Navodaya Vidyalaya (JNVST), Sainik School (AISSEE) and Rashtriya Military School (RMS) entrance - Class 6 & 9, plus foundation batches Class 3 to 8. Since 2021."
        canonical={`${CONFIG.siteUrl}/`}
        image={`${CONFIG.siteUrl}/img/logo.jpg`}
      />
      <ScrollProgress />
      <Header active={active} />
      <Marquee />
      <main>
        <Hero />
        <Exams />
        <MegaTest content={content} />
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
