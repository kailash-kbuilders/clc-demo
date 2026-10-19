import { useEffect } from 'react'

/**
 * Scroll reveal. Elements with `.rv` fade/slide in from the right when they
 * enter the viewport, and re-animate every time they come back into view from
 * below (scrolling down). Entering from the top shows instantly (no animation).
 */
export function useReveal(dep?: unknown) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.rv'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'))
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
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [dep])
}
