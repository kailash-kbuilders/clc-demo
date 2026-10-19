import { useEffect, useRef } from 'react'

/** Drives the thin gold progress bar at the very top of the page. */
export function useScrollProgress() {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const d = document.documentElement
        const max = d.scrollHeight - d.clientHeight || 1
        el.style.transform = `scaleX(${Math.min(1, d.scrollTop / max)})`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return ref
}
