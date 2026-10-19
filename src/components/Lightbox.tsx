import { useEffect, useState } from 'react'

/** Click any image with `data-zoom` to preview it full screen. */
export default function Lightbox() {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest('[data-zoom]') as HTMLImageElement | null
      if (t && t.src) setSrc(t.src)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSrc(null)
    }
    document.addEventListener('click', onClick)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div
      id="lb"
      className={src ? 'on' : ''}
      role="dialog"
      aria-label="Image preview"
      onClick={(e) => {
        if (e.target === e.currentTarget) setSrc(null)
      }}
    >
      <div className="box">
        <button id="lbx" aria-label="Close" onClick={() => setSrc(null)}>
          ✕
        </button>
        {src && <img alt="" src={src} />}
      </div>
    </div>
  )
}
