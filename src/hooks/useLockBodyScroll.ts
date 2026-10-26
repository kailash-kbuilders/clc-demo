import { useEffect } from 'react'

/**
 * Locks page scrolling (mobile menu drawer, photo viewer).
 * Both <html> and <body> are locked - on some phones the page scrolls on <html>,
 * so locking only <body> was not enough.
 */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const html = document.documentElement
    const body = document.body
    const prevHtml = html.style.overflow
    const prevBody = body.style.overflow
    const prevOverscroll = body.style.overscrollBehavior

    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    body.style.overscrollBehavior = 'none'

    return () => {
      html.style.overflow = prevHtml
      body.style.overflow = prevBody
      body.style.overscrollBehavior = prevOverscroll
    }
  }, [locked])
}
