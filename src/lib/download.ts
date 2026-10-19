import type { Pair } from '../i18n/LangContext'

/** Turn any text into a safe file name. */
export function safeName(text: string, fallback: string): string {
  const cleaned = text.replace(/[\\/:*?"<>|]+/g, '-').trim()
  return (cleaned || fallback).slice(0, 80)
}

/**
 * Download a file and tell the user what is happening.
 * Fetches the file first, so "download started" is real and not a guess.
 */
export async function startDownload(
  url: string,
  filename: string,
  L: (v: Pair) => string,
  notify: (message: string) => void,
): Promise<void> {
  notify(L(['Starting download…', 'डाउनलोड शुरू हो रहा है…']))
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error('http ' + res.status)
    const blob = await res.blob()
    const objectUrl = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = objectUrl
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 15000)
    notify(L(['Download started ✓', 'डाउनलोड शुरू हो गया ✓']))
  } catch {
    window.open(url, '_blank', 'noopener')
    notify(L(['Download started ✓', 'डाउनलोड शुरू हो गया ✓']))
  }
}
