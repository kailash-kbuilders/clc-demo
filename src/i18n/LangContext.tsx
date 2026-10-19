import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type Lang = 'en' | 'hi'
export type Pair = [string, string]

type Ctx = {
  lang: Lang
  toggle: () => void
  L: (v: Pair) => string
}

const LangCtx = createContext<Ctx | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      return (localStorage.getItem('clcLang') as Lang) || 'hi'
    } catch {
      return 'hi'
    }
  })

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('clcLang', lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  const toggle = useCallback(() => setLang((l) => (l === 'en' ? 'hi' : 'en')), [])
  const L = useCallback((v: Pair) => (lang === 'hi' ? v[1] : v[0]), [lang])

  const value = useMemo(() => ({ lang, toggle, L }), [lang, toggle, L])
  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>
}

export function useLang(): Ctx {
  const ctx = useContext(LangCtx)
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>')
  return ctx
}
