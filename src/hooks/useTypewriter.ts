import { useEffect, useState } from 'react'

/** Types a phrase, deletes it, then moves to the next one - forever. */
export function useTypewriter(phrases: string[], enabled = true): string {
  const [text, setText] = useState('')
  const key = phrases.join('||')

  useEffect(() => {
    if (!enabled || phrases.length === 0) return
    let i = 0
    let c = 0
    let deleting = false
    let timer = 0

    const tick = () => {
      const full = phrases[i]
      setText(full.slice(0, c))
      if (!deleting) {
        if (c < full.length) {
          c++
          timer = window.setTimeout(tick, 80)
        } else {
          deleting = true
          timer = window.setTimeout(tick, 1600)
        }
      } else if (c > 0) {
        c--
        timer = window.setTimeout(tick, 38)
      } else {
        deleting = false
        i = (i + 1) % phrases.length
        timer = window.setTimeout(tick, 420)
      }
    }
    tick()
    return () => window.clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, enabled])

  return text
}
