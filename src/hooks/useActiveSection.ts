import { useEffect, useState } from 'react'

/** Highlights the nav item of the section currently in view. */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [ids.join('|')])

  return active
}
