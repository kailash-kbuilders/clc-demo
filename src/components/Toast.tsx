import { useEffect, useState } from 'react'

const EVT = 'clc-toast'

/** Show a short message at the bottom of the screen. */
export function toast(message: string) {
  window.dispatchEvent(new CustomEvent<string>(EVT, { detail: message }))
}

export default function ToastHost() {
  const [msg, setMsg] = useState<string | null>(null)

  useEffect(() => {
    let timer = 0
    const onToast = (e: Event) => {
      setMsg((e as CustomEvent<string>).detail)
      window.clearTimeout(timer)
      timer = window.setTimeout(() => setMsg(null), 3200)
    }
    window.addEventListener(EVT, onToast)
    return () => {
      window.removeEventListener(EVT, onToast)
      window.clearTimeout(timer)
    }
  }, [])

  if (!msg) return null
  return (
    <div className="toast" role="status" aria-live="polite">
      {msg}
    </div>
  )
}
