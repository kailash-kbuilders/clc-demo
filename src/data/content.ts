import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, isFirebaseConfigured, storage } from '../firebase'
import type { Pair } from '../i18n/LangContext'
import { MATERIAL, MEGATEST_DEFAULT, RESULTS, TESTSERIES_DEFAULT } from './site'

export type ResultItem = { img: string; name: Pair; detail: Pair }
export type PosterBlock = { poster: string; title: Pair; description: Pair }
export type MaterialItem = { title: Pair; sub: Pair; file: string }

export type SiteContent = {
  megatest: PosterBlock
  testseries: PosterBlock
  results: ResultItem[]
  materials: MaterialItem[]
}

/** Everything the site shows, when Firebase has nothing saved yet. */
export const defaultContent: SiteContent = {
  megatest: MEGATEST_DEFAULT,
  testseries: TESTSERIES_DEFAULT,
  results: RESULTS.map((r) => ({ img: r.img, name: r.name, detail: r.detail })),
  materials: MATERIAL.map((m) => ({ title: m.t, sub: m.k, file: m.file })),
}

export const CONTENT_DOC = { col: 'site', id: 'content' }

function contentRef() {
  if (!db) throw new Error('Firebase is not configured yet.')
  return doc(db, CONTENT_DOC.col, CONTENT_DOC.id)
}

/** Live subscription - every visitor sees admin changes immediately. */
export function subscribeContent(onData: (c: SiteContent) => void): () => void {
  if (!isFirebaseConfigured || !db) return () => {}
  return onSnapshot(
    contentRef(),
    (snap) => {
      const d = snap.data() as Partial<SiteContent> | undefined
      if (!d) return
      onData({
        megatest: d.megatest ?? defaultContent.megatest,
        testseries: d.testseries ?? defaultContent.testseries,
        results: d.results ?? defaultContent.results,
        materials: d.materials ?? defaultContent.materials,
      })
    },
    (err) => console.warn('Firestore read failed:', err.message),
  )
}

/** Merge-save part of the content (admin only - guarded by Firestore rules). */
export async function saveContent(patch: Partial<SiteContent>): Promise<void> {
  await setDoc(contentRef(), patch, { merge: true })
}

/** Upload a file to Firebase Storage and return its public URL. */
export async function uploadFile(folder: string, file: File): Promise<string> {
  if (!storage) throw new Error('Firebase is not configured yet.')
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '-')
  const path = `${folder}/${Date.now()}-${safe}`
  const snap = await uploadBytes(ref(storage, path), file)
  return await getDownloadURL(snap.ref)
}
