import { useEffect } from 'react'

/**
 * Scroll reveal. Elements with `.rv` fade/slide in when they enter the viewport,
 * and re-animate every time they come back into view from below.
 *
 * Content loaded from the database arrives *after* the first paint, so this also
 * watches the DOM and picks up any `.rv` element that appears later - otherwise
 * freshly added results / posters / material would stay invisible.
 */
export function useReveal(dep?: unknown) {
  useEffect(() => {
    const showAll = () =>
      document.querySelectorAll<HTMLElement>('.rv').forEach((e) => e.classList.add('in'))

    if (!('IntersectionObserver' in window)) {
      showAll()
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((x) => {
          const el = x.target as HTMLElement
          if (x.isIntersecting) {
            if (x.boundingClientRect.top > -16) {
              el.classList.add('in')
            } else {
              el.classList.add('noanim', 'in')
              window.setTimeout(() => el.classList.remove('noanim'), 80)
            }
          } else {
            el.classList.remove('in')
          }
        })
      },
      { threshold: 0.12 },
    )

    const watched = new WeakSet<Element>()
    const observeNew = () => {
      document.querySelectorAll<HTMLElement>('.rv').forEach((el) => {
        if (watched.has(el)) return
        watched.add(el)
        io.observe(el)
      })
    }
    observeNew()

    // pick up elements that React adds later (database content)
    let raf = 0
    const mo = new MutationObserver(() => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        observeNew()
      })
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      mo.disconnect()
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [dep])
}
