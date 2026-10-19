import { useEffect, useRef } from 'react'
import { useLang } from '../i18n/LangContext'
import { RESULTS } from '../data/site'

const CONFETTI_COLORS = ['#f0c25a', '#fff', '#e8891a', '#d3302f', '#8d97ff']

export default function Results() {
  const { L } = useLang()
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cleanup: number | undefined
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        io.disconnect()
        const frag = document.createDocumentFragment()
        for (let i = 0; i < 36; i++) {
          const s = document.createElement('i')
          s.className = 'cf'
          s.style.cssText = `left:${Math.random() * 100}%;background:${
            CONFETTI_COLORS[i % 5]
          };animation-delay:${Math.random()}s;animation-duration:${2.2 + Math.random() * 1.6}s`
          frag.appendChild(s)
        }
        el.appendChild(frag)
        cleanup = window.setTimeout(
          () => el.querySelectorAll('.cf').forEach((s) => s.remove()),
          5200,
        )
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      if (cleanup) window.clearTimeout(cleanup)
    }
  }, [])

  return (
    <section id="results" ref={ref}>
      <div className="w">
        <h2 className="rv">{L(['Results & achievements', 'परिणाम व उपलब्धियाँ'])}</h2>
        <p className="sub rv">
          {L([
            'Congratulations to our students who qualified the Navodaya Vidyalaya, Sainik School and Rashtriya Military School entrance exams.',
            'हमारे विद्यार्थियों को नवोदय विद्यालय, सैनिक स्कूल एवं राष्ट्रीय मिलिट्री स्कूल प्रवेश परीक्षा में सफलता की बधाई।',
          ])}
        </p>
        <div className="res">
          {RESULTS.map((r, i) => (
            <div className="card glow rv" key={i}>
              <img src={r.img} alt={r.alt} data-zoom loading="lazy" />
              <p>
                <b>{L(r.name)}</b> – {L(r.detail)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
