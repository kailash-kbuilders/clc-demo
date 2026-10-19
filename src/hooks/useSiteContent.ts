import { useEffect, useState } from 'react'
import { defaultContent, subscribeContent } from '../data/content'
import type { SiteContent } from '../data/content'

/** Site content - defaults first, then live Firestore data when configured. */
export function useSiteContent(): SiteContent {
  const [content, setContent] = useState<SiteContent>(defaultContent)

  useEffect(() => {
    const unsub = subscribeContent(setContent)
    return () => unsub()
  }, [])

  return content
}
